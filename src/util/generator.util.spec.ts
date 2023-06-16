import * as bcrypt from 'bcrypt';
import {
  generateKey,
  generateDigitCode,
  generatePassword,
} from './generator.util';

describe('Utils', () => {
  describe('generateKey', () => {
    it('should generate a key of the specified length', () => {
      const keyLength = 10;
      const key = generateKey(keyLength);
      expect(key).toHaveLength(keyLength);
    });

    it('should generate a key with default length if not specified', () => {
      const defaultKeyLength = 36;
      const key = generateKey();
      expect(key).toHaveLength(defaultKeyLength);
    });
  });

  describe('generateDigitCode', () => {
    it('should generate a digit code of the specified length', () => {
      const codeLength = 6;
      const code = generateDigitCode(codeLength);
      expect(code).toHaveLength(codeLength);
      expect(Number(code)).toBeGreaterThanOrEqual(100000);
      expect(Number(code)).toBeLessThanOrEqual(999999);
    });

    it('should generate a digit code with default length if not specified', () => {
      const defaultCodeLength = 4;
      const code = generateDigitCode();
      expect(code).toHaveLength(defaultCodeLength);
      expect(Number(code)).toBeGreaterThanOrEqual(1000);
      expect(Number(code)).toBeLessThanOrEqual(9999);
    });
  });

  describe('Utility Functions', () => {
    test('generatePassword should return a hashed password with the specified salt rounds', async () => {
      // Arrange
      const password = 'password123';
      const saltRounds = 12;

      // Act
      const hashedPassword = await generatePassword(password, saltRounds);

      // Assert
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword).not.toBe(password);
      expect(await bcrypt.compare(password, hashedPassword)).toBeTruthy();
    });

    test('generatePassword should use the default salt rounds when no value is provided', async () => {
      // Arrange
      const password = 'password123';
      const defaultSaltRounds = 10;

      // Act
      const hashedPassword = await generatePassword(password);

      // Assert
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword).not.toBe(password);
      expect(await bcrypt.compare(password, hashedPassword)).toBeTruthy();
      expect(bcrypt.getRounds(hashedPassword)).toBe(defaultSaltRounds);
    });

    test('generatePassword should throw an error when an invalid password is provided', async () => {
      // Arrange
      const invalidPassword = '';

      // Act and Assert
      await expect(generatePassword(invalidPassword)).rejects.toThrow();
    });
  });
});
