import { IsAdminGuard } from './admin.guard';

describe('IsAdminGuard', () => {
  it('should be defined', () => {
    expect(new IsAdminGuard()).toBeDefined();
  });
});
