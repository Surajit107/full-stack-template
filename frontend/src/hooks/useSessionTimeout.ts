import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/stores/authStore';

export const useSessionTimeout = (timeoutMinutes: number = 30) => {
  const { logout, isAuthenticated } = useAuthStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (isAuthenticated) {
      timeoutRef.current = setTimeout(() => {
        console.log('Session timeout - logging out due to inactivity');
        logout();
      }, timeoutMinutes * 60 * 1000);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }

    // Reset timeout on user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleUserActivity = () => {
      resetTimeout();
    };

    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    // Initial timeout setup
    resetTimeout();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isAuthenticated, logout, timeoutMinutes]);

  return { resetTimeout };
}; 