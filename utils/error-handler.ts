import { signOut } from 'next-auth/react'
import { toast } from 'sonner';

export const handle403Error = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/error-403';
  }
};

export const handle401Error = () => {
  // Clear any auth related storage
  toast.error('Session Expired', {
    description: 'Please Sign in again.',
  });

  localStorage.clear();
  sessionStorage.clear();
  
  // Redirect to home page
  signOut({ redirect: true, callbackUrl: '/' })
};