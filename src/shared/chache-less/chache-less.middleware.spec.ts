import { CacheLessMiddleware } from './cache-less-middleware.service';

describe('ChacheLessMiddleware', () => {
  it('should be defined', () => {
    expect(new CacheLessMiddleware()).toBeDefined();
  });
});
