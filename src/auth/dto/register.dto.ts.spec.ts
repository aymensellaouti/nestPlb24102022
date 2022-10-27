import { RegisterDto } from './register.dto.ts';

describe('RegisterDtoTs', () => {
  it('should be defined', () => {
    expect(new RegisterDto()).toBeDefined();
  });
});
