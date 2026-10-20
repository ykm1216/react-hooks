/**
 * Pure validation helpers kept outside the component tree so they can be
 * unit-tested and re-read without React in the picture.
 */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_MIN_LENGTH = 8;

/** The order in which the first invalid field should receive focus. */
export const FIELD_ORDER = ['name', 'email', 'password'];

export function validate({ name, email, password }) {
  const errors = {};

  if (!name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Enter a valid email address, e.g. name@example.com.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters (currently ${password.length}).`;
  }

  return errors;
}
