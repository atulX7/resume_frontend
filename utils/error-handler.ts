export const handle403Error = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/error-403';
  }
};