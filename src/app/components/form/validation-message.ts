/*Created this Validation Messages since it's a Generic form
*/
export const VALIDATION_MESSAGES = {
  required: (label: string) => `${label} is required.`,
  email: (label: string) => `Enter a valid email address.`,
  minlength: (label: string, requiredLength: number) => `${label} must be at least ${requiredLength} characters.`,
  maxlength: (label: string, requiredLength: number) => `${label} cannot exceed ${requiredLength} characters.`,
  pattern: (label: string) => `${label} format is invalid.`,
};
export type ValidationMessageMap = typeof VALIDATION_MESSAGES;