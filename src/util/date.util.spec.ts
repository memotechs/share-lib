import dayjs from 'dayjs';
import { addSecond, isExpired } from './date.util';

describe('Utility Functions', () => {
  test('addSecond should return a Date object with the specified duration added', () => {
    // Arrange
    const duration = 10;

    // Act
    const result = addSecond(duration);

    // Assert
    const expectedDate = dayjs().add(duration, 'seconds').toDate();
    expect(result).toEqual(expectedDate);
  });

  test('isExpired should return true for a past date', () => {
    // Arrange
    const pastDate = dayjs().subtract(1, 'day').toDate();

    // Act
    const result = isExpired(pastDate);

    // Assert
    expect(result).toBe(true);
  });

  test('isExpired should return false for a future date', () => {
    // Arrange
    const futureDate = dayjs().add(1, 'day').toDate();

    // Act
    const result = isExpired(futureDate);

    // Assert
    expect(result).toBe(false);
  });

  test('isExpired should return false for the current date', () => {
    // Arrange
    const currentDate = dayjs().toDate();

    // Act
    const result = isExpired(currentDate);

    // Assert
    expect(result).toBe(false);
  });
});
