import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Code2, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface FixTheCodeProps {
  onComplete: () => void;
}

const codeProblems = [
  {
    code: `function add(a, b) {\n  return a - b;\n}`,
    error: 'Expected: add(5, 3) → 8\nActual: add(5, 3) → 2',
    options: [
      { id: 'A', text: 'return a + b;', correct: true },
      { id: 'B', text: 'return a * b;', correct: false },
      { id: 'C', text: 'return a / b;', correct: false },
      { id: 'D', text: 'return a - b;', correct: false },
    ],
    buggedLine: 'a - b',
  },
  {
    code: `const isEven = (num) => {\n  return num % 2 === 1;\n}`,
    error: 'Expected: isEven(4) → true\nActual: isEven(4) → false',
    options: [
      { id: 'A', text: 'return num % 2 === 0;', correct: true },
      { id: 'B', text: 'return num / 2 === 0;', correct: false },
      { id: 'C', text: 'return num % 2 === 1;', correct: false },
      { id: 'D', text: 'return num * 2 === 0;', correct: false },
    ],
    buggedLine: 'num % 2 === 1',
  },
  {
    code: `function multiply(x, y) {\n  return x + y;\n}`,
    error: 'Expected: multiply(3, 4) → 12\nActual: multiply(3, 4) → 7',
    options: [
      { id: 'A', text: 'return x * y;', correct: true },
      { id: 'B', text: 'return x / y;', correct: false },
      { id: 'C', text: 'return x - y;', correct: false },
      { id: 'D', text: 'return x + y;', correct: false },
    ],
    buggedLine: 'x + y',
  },
  {
    code: `const getMax = (arr) => {\n  return Math.min(...arr);\n}`,
    error: 'Expected: getMax([1,5,3]) → 5\nActual: getMax([1,5,3]) → 1',
    options: [
      { id: 'A', text: 'return Math.max(...arr);', correct: true },
      { id: 'B', text: 'return Math.min(...arr);', correct: false },
      { id: 'C', text: 'return arr.length;', correct: false },
      { id: 'D', text: 'return arr[0];', correct: false },
    ],
    buggedLine: 'Math.min(...arr)',
  },
  {
    code: `function greet(name) {\n  return 'Goodbye ' + name;\n}`,
    error: 'Expected: greet("Alice") → "Hello Alice"\nActual: greet("Alice") → "Goodbye Alice"',
    options: [
      { id: 'A', text: "return 'Hello ' + name;", correct: true },
      { id: 'B', text: "return 'Goodbye ' + name;", correct: false },
      { id: 'C', text: "return 'Hi ' + name;", correct: false },
      { id: 'D', text: "return name + ' Hello';", correct: false },
    ],
    buggedLine: "'Goodbye ' + name",
  },
];

export function FixTheCode({ onComplete }: FixTheCodeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [currentProblem, setCurrentProblem] = useState(codeProblems[0]);

  useEffect(() => {
    const randomProblem = codeProblems[Math.floor(Math.random() * codeProblems.length)];
    setCurrentProblem(randomProblem);
  }, []);

  const handleSelect = (option: typeof currentProblem.options[0]) => {
    setSelected(option.id);
    
    if (option.correct) {
      toast.success('Code fixed! ✅');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      toast.error('That\'s not quite right. Try again!');
      setTimeout(() => {
        setSelected(null);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950 to-black" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl md:text-5xl font-bold">Puzzle 2</h2>
          </div>
          <p className="text-xl text-gray-400 font-mono">Fix the Code</p>
        </motion.div>

        {/* Code Editor Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl w-full backdrop-blur-md bg-white/5 border border-purple-500/20 rounded-3xl overflow-hidden"
        >
          {/* Editor header */}
          <div className="bg-purple-500/10 border-b border-purple-500/20 px-6 py-4 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="font-mono text-sm text-gray-400">buggy-code.js</span>
          </div>

          {/* Code content */}
          <div className="p-8 font-mono text-sm md:text-base">
            <div className="bg-black/50 rounded-xl p-6 border border-red-500/30">
              <div className="flex gap-4">
                <div className="text-gray-600 select-none">
                  {currentProblem.code.split('\n').map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <pre className="flex-1 text-gray-300 whitespace-pre-wrap">
                  {currentProblem.code.split('\n').map((line, i) => (
                    <div key={i}>
                      {line.includes(currentProblem.buggedLine) ? (
                        <>
                          {line.substring(0, line.indexOf(currentProblem.buggedLine))}
                          <span className="bg-red-500/20 border-b-2 border-red-500">
                            {currentProblem.buggedLine}
                          </span>
                          {line.substring(line.indexOf(currentProblem.buggedLine) + currentProblem.buggedLine.length)}
                        </>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                </pre>
              </div>
            </div>

            {/* Error message */}
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="text-red-400 font-semibold mb-1">Error: Function returns incorrect result</div>
                  {currentProblem.error.split('\n').map((line, i) => (
                    <div key={i} className="text-gray-400">{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="px-8 pb-4">
            <p className="text-lg font-semibold mb-4 text-purple-400">What is the correct fix?</p>
          </div>

          {/* Options */}
          <div className="px-8 pb-8 space-y-3">
            {currentProblem.options.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onClick={() => handleSelect(option)}
                disabled={selected !== null}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selected === option.id
                    ? option.correct
                      ? 'bg-green-500/20 border-green-500'
                      : 'bg-red-500/20 border-red-500'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50'
                } ${selected && selected !== option.id ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center font-bold text-purple-400">
                    {option.id}
                  </div>
                  <code className="flex-1 text-gray-300">{option.text}</code>
                  {selected === option.id && (
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      option.correct ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {option.correct ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <X className="w-4 h-4 text-white" />
                      )}
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}