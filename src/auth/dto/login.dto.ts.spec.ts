import { LoginDto } from './login.dto.ts';

describe('LoginDtoTs', () => {
  it('should be defined', () => {
    expect(new LoginDto()).toBeDefined();
  });
});
