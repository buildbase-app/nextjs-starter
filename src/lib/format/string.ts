/**
 * String Formatting Utilities
 *
 * Common string manipulation and formatting functions.
 *
 * @example
 * import { slugify, truncate, capitalize } from '@/lib/format';
 *
 * slugify("Hello World!")       // "hello-world"
 * truncate("Long text...", 10)  // "Long te..."
 * capitalize("hello")           // "Hello"
 */

/**
 * Convert a string to URL-friendly slug
 *
 * @param str - String to slugify
 * @returns URL-friendly slug
 *
 * @example
 * slugify("Hello World!")           // "hello-world"
 * slugify("  Multiple   Spaces  ")  // "multiple-spaces"
 * slugify("Über Café")              // "uber-cafe"
 * slugify("日本語")                 // "" (non-latin removed)
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Truncate a string to specified length with ellipsis
 *
 * @param str - String to truncate
 * @param length - Maximum length (including ellipsis)
 * @param suffix - Suffix to add (default: "...")
 * @returns Truncated string
 *
 * @example
 * truncate("Hello World", 8)        // "Hello..."
 * truncate("Short", 10)             // "Short"
 * truncate("Hello World", 8, "…")   // "Hello W…"
 */
export function truncate(
  str: string,
  length: number,
  suffix: string = '...'
): string {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length).trimEnd() + suffix;
}

/**
 * Truncate string in the middle, preserving start and end
 *
 * @param str - String to truncate
 * @param length - Maximum length (including ellipsis)
 * @param separator - Separator in middle (default: "...")
 * @returns Truncated string
 *
 * @example
 * truncateMiddle("verylongfilename.pdf", 15)  // "verylo...me.pdf"
 */
export function truncateMiddle(
  str: string,
  length: number,
  separator: string = '...'
): string {
  if (str.length <= length) return str;

  const charsToShow = length - separator.length;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return str.slice(0, frontChars) + separator + str.slice(-backChars);
}

/**
 * Capitalize first letter of a string
 *
 * @param str - String to capitalize
 * @returns String with first letter capitalized
 *
 * @example
 * capitalize("hello")        // "Hello"
 * capitalize("HELLO")        // "Hello" (lowercases rest)
 * capitalize("")             // ""
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert string to Title Case
 *
 * @param str - String to convert
 * @returns Title-cased string
 *
 * @example
 * titleCase("hello world")       // "Hello World"
 * titleCase("the quick BROWN")   // "The Quick Brown"
 */
export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Convert string to camelCase
 *
 * @param str - String to convert
 * @returns camelCased string
 *
 * @example
 * camelCase("hello world")       // "helloWorld"
 * camelCase("Hello-World")       // "helloWorld"
 * camelCase("hello_world")       // "helloWorld"
 */
export function camelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

/**
 * Convert string to kebab-case
 *
 * @param str - String to convert
 * @returns kebab-cased string
 *
 * @example
 * kebabCase("Hello World")       // "hello-world"
 * kebabCase("helloWorld")        // "hello-world"
 * kebabCase("HelloWorld")        // "hello-world"
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert string to snake_case
 *
 * @param str - String to convert
 * @returns snake_cased string
 *
 * @example
 * snakeCase("Hello World")       // "hello_world"
 * snakeCase("helloWorld")        // "hello_world"
 */
export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Remove HTML tags from a string
 *
 * @param html - String containing HTML
 * @returns Plain text string
 *
 * @example
 * stripHtml("<p>Hello <b>World</b></p>")  // "Hello World"
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Escape HTML special characters
 *
 * @param str - String to escape
 * @returns Escaped string safe for HTML
 *
 * @example
 * escapeHtml("<script>alert('xss')</script>")
 * // "&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;"
 */
export function escapeHtml(str: string): string {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return str.replace(/[&<>"']/g, (char) => escapeMap[char]);
}

/**
 * Generate initials from a name
 *
 * @param name - Full name
 * @param count - Number of initials (default: 2)
 * @returns Uppercase initials
 *
 * @example
 * initials("John Doe")           // "JD"
 * initials("John Michael Doe")   // "JM"
 * initials("John Michael Doe", 3) // "JMD"
 * initials("John")               // "JO"
 */
export function initials(name: string, count: number = 2): string {
  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, count).toUpperCase();
  }

  return words
    .slice(0, count)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
}

/**
 * Pluralize a word based on count
 *
 * @param singular - Singular form
 * @param count - Number to check
 * @param plural - Plural form (default: singular + 's')
 * @returns Appropriate form with count
 *
 * @example
 * pluralize("item", 1)           // "1 item"
 * pluralize("item", 5)           // "5 items"
 * pluralize("child", 3, "children") // "3 children"
 */
export function pluralize(
  singular: string,
  count: number,
  plural?: string
): string {
  const form = count === 1 ? singular : (plural ?? `${singular}s`);
  return `${count} ${form}`;
}

/**
 * Check if string is empty or whitespace only
 */
export function isBlank(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0;
}

/**
 * Check if string is not empty
 */
export function isNotBlank(str: string | null | undefined): str is string {
  return !isBlank(str);
}

/**
 * Mask sensitive data (e.g., email, phone)
 *
 * @param str - String to mask
 * @param visibleStart - Characters to show at start
 * @param visibleEnd - Characters to show at end
 * @param maskChar - Character to use for masking
 * @returns Masked string
 *
 * @example
 * mask("john@example.com", 3, 4)      // "joh*****.com"
 * mask("1234567890", 2, 2)            // "12******90"
 */
export function mask(
  str: string,
  visibleStart: number = 3,
  visibleEnd: number = 4,
  maskChar: string = '*'
): string {
  if (str.length <= visibleStart + visibleEnd) {
    return str;
  }

  const start = str.slice(0, visibleStart);
  const end = str.slice(-visibleEnd);
  const maskLength = str.length - visibleStart - visibleEnd;

  return start + maskChar.repeat(maskLength) + end;
}
