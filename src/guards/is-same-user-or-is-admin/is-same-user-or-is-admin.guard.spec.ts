import { IsSameUserOrIsAdminGuard } from './is-same-user-or-is-admin.guard';

describe('IsSameUserOrIsAdminGuard', () => {
  it('should be defined', () => {
    expect(new IsSameUserOrIsAdminGuard()).toBeDefined();
  });
});
