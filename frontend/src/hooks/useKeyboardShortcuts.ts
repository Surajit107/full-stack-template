import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export const useKeyboardShortcuts = () => {
  const { logout, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Logout shortcut: Ctrl/Cmd + Shift + L
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'L') {
        event.preventDefault();
        if (isAuthenticated) {
          logout();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [logout, isAuthenticated]);
}; 