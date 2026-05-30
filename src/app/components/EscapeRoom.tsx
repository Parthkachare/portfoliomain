import { useState } from 'react';
import { EscapeRoomLanding } from './EscapeRoomLanding';
import { LockedPortfolio } from './LockedPortfolio';
import { FindHiddenElement } from './puzzles/FindHiddenElement';
import { FixTheCode } from './puzzles/FixTheCode';
import { LogicRiddle } from './puzzles/LogicRiddle';
import { PasswordDecoder } from './puzzles/PasswordDecoder';
import { AccessGranted } from './AccessGranted';
import { ScoreResult } from './ScoreResult';
import { RewardScreen } from './RewardScreen';
import { RewardClaimForm } from './RewardClaimForm';
import { ShareScreen } from './ShareScreen';
import { X } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

type Screen = 
  | 'landing'
  | 'locked'
  | 'puzzle1'
  | 'puzzle2'
  | 'puzzle3'
  | 'puzzle4'
  | 'success'
  | 'score'
  | 'reward'
  | 'claim'
  | 'share';

interface PuzzleState {
  completed: boolean;
  timeSpent: number;
}

export function EscapeRoom() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [puzzles, setPuzzles] = useState<Record<string, PuzzleState>>({
    puzzle1: { completed: false, timeSpent: 0 },
    puzzle2: { completed: false, timeSpent: 0 },
    puzzle3: { completed: false, timeSpent: 0 },
    puzzle4: { completed: false, timeSpent: 0 },
  });
  const [startTime, setStartTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>('');
  const [playerRank, setPlayerRank] = useState<number>(3);

  const handleStart = () => {
    setStartTime(Date.now());
    setCurrentScreen('locked');
  };

  const handlePuzzleComplete = (puzzleKey: string) => {
    const timeSpent = Date.now() - startTime;
    setPuzzles(prev => ({
      ...prev,
      [puzzleKey]: { completed: true, timeSpent }
    }));

    // Move to next screen
    if (puzzleKey === 'puzzle1') setCurrentScreen('puzzle2');
    else if (puzzleKey === 'puzzle2') setCurrentScreen('puzzle3');
    else if (puzzleKey === 'puzzle3') setCurrentScreen('puzzle4');
    else if (puzzleKey === 'puzzle4') {
      setTotalTime(Math.floor((Date.now() - startTime) / 1000));
      setCurrentScreen('success');
    }
  };

  const calculateScore = () => {
    // Score based on time: max 100 points
    const maxTime = 600; // 10 minutes
    const timeBonus = Math.max(0, 100 - (totalTime / maxTime) * 50);
    const completionBonus = 50; // For completing all puzzles
    return Math.round(timeBonus + completionBonus);
  };

  const calculateRank = async () => {
    try {
      const score = calculateScore();
      const sessionId = `escape_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Save score to server
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-15ed28e0/escape-scores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          sessionId,
          score,
          time: totalTime,
          timestamp: Date.now(),
        }),
      });

      if (!response.ok) {
        // Server error - handled gracefully
        toast.error('Unable to save score. Server is temporarily unavailable.');
        return 3; // Default rank
      }

      const data = await response.json();
      return data.rank || 3;
    } catch (error) {
      // Network or server error - handled gracefully
      toast.error('Unable to save score. Server is temporarily unavailable.');
      return 3; // Default rank if error
    }
  };

  const handleContinueToReward = async () => {
    const rank = await calculateRank();
    setPlayerRank(rank);
    setCurrentScreen('reward');
  };

  const handleExit = () => {
    // Return to main portfolio
    window.location.href = '/';
  };

  return (
    <div className="relative">
      {/* Exit button */}
      {currentScreen !== 'landing' && (
        <button
          onClick={handleExit}
          className="fixed top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors group"
          title="Exit to Portfolio"
        >
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>
      )}

      {/* Render current screen */}
      {currentScreen === 'landing' && (
        <EscapeRoomLanding onStart={handleStart} />
      )}

      {currentScreen === 'locked' && (
        <LockedPortfolio onStartPuzzle={() => setCurrentScreen('puzzle1')} />
      )}

      {currentScreen === 'puzzle1' && (
        <FindHiddenElement onComplete={() => handlePuzzleComplete('puzzle1')} />
      )}

      {currentScreen === 'puzzle2' && (
        <FixTheCode onComplete={() => handlePuzzleComplete('puzzle2')} />
      )}

      {currentScreen === 'puzzle3' && (
        <LogicRiddle onComplete={() => handlePuzzleComplete('puzzle3')} />
      )}

      {currentScreen === 'puzzle4' && (
        <PasswordDecoder onComplete={() => handlePuzzleComplete('puzzle4')} />
      )}

      {currentScreen === 'success' && (
        <AccessGranted onContinue={() => setCurrentScreen('score')} />
      )}

      {currentScreen === 'score' && (
        <ScoreResult
          score={calculateScore()}
          time={totalTime}
          onContinue={handleContinueToReward}
        />
      )}

      {currentScreen === 'reward' && (
        <RewardScreen
          rank={playerRank} // This would come from leaderboard
          onClaimReward={() => setCurrentScreen('claim')}
          onShare={() => setCurrentScreen('share')}
        />
      )}

      {currentScreen === 'claim' && (
        <RewardClaimForm
          onSubmit={() => setCurrentScreen('share')}
          onSkip={() => setCurrentScreen('share')}
        />
      )}

      {currentScreen === 'share' && (
        <ShareScreen
          score={calculateScore()}
          time={totalTime}
        />
      )}
    </div>
  );
}