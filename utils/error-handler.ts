export const handle403Error = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/error-403';
  }
};

export const handle401Error = () => {
  // Clear any auth related storage
  localStorage.clear();
  sessionStorage.clear();
  
  // Redirect to home page
  window.location.href = '/';
  
  // You might want to show a toast/notification here
  // If you have a toast system, use it here
  alert('Session expired. Please login again.');
};