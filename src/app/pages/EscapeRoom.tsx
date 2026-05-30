import { Toaster } from 'sonner';
import { EscapeRoom as EscapeRoomGame } from '../components/EscapeRoom';

export function EscapeRoom() {
  return (
    <div>
      <Toaster position="top-right" richColors />
      <EscapeRoomGame />
    </div>
  );
}
