export default {
  loadAnimation: jest.fn(() => ({
    play: jest.fn(),
    stop: jest.fn(),
    destroy: jest.fn(),
  })),
};
