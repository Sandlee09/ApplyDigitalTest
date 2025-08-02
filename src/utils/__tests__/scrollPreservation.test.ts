import { preserveScrollPosition } from "../scrollPreservation";

describe("Scroll Preservation", () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });

    // Mock window.scrollTo
    window.scrollTo = jest.fn();
  });

  it("preserves scroll position and restores it", () => {
    jest.useFakeTimers();

    // Set a mock scroll position
    Object.defineProperty(window, "scrollY", {
      value: 500,
      writable: true,
    });

    const restoreScroll = preserveScrollPosition();

    // Verify the restore function was created
    expect(typeof restoreScroll).toBe("function");

    // Call the restore function
    restoreScroll();

    // Wait for setTimeout to execute
    jest.advanceTimersByTime(100);

    // Verify scrollTo was called with the preserved position
    expect(window.scrollTo).toHaveBeenCalledWith(0, 500);

    jest.useRealTimers();
  });

  it("uses setTimeout for restoration", () => {
    jest.useFakeTimers();

    Object.defineProperty(window, "scrollY", {
      value: 300,
      writable: true,
    });

    const restoreScroll = preserveScrollPosition();

    // Call restore function
    restoreScroll();

    // Initially scrollTo should not be called
    expect(window.scrollTo).not.toHaveBeenCalled();

    // Fast-forward time by 100ms
    jest.advanceTimersByTime(100);

    // Now scrollTo should be called
    expect(window.scrollTo).toHaveBeenCalledWith(0, 300);

    jest.useRealTimers();
  });

  it("preserves different scroll positions correctly", () => {
    jest.useFakeTimers();

    const positions = [0, 100, 500, 1000];

    positions.forEach((position) => {
      Object.defineProperty(window, "scrollY", {
        value: position,
        writable: true,
      });

      const restoreScroll = preserveScrollPosition();
      restoreScroll();

      jest.advanceTimersByTime(100);

      expect(window.scrollTo).toHaveBeenCalledWith(0, position);
    });

    jest.useRealTimers();
  });
});
