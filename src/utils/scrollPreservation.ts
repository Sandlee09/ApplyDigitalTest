export const preserveScrollPosition = () => {
  const scrollPosition = window.scrollY;
  return () => {
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 100);
  };
};
