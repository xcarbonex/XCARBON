/**
 * Encode a JS object into a URL-safe string.
 * @param data - The data to encode.
 * @returns Encoded string.
 */
export function encodeUrlData(data: unknown): string {
  const json = JSON.stringify(data);
  return encodeURIComponent(json);
}

/**
 * Decode a URL-safe string back into a JS object.
 * @param encodedStr - The encoded string.
 * @returns Decoded data.
 */
export function decodeUrlData<T = unknown>(encodedStr: string): T {
  const json = decodeURIComponent(encodedStr);
  return JSON.parse(json) as T;
}
