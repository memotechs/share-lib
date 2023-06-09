import { generateKey, generateDigitCode } from './generator.util';

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
});
