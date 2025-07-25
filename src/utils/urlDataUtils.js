/**
 * Encode a JS object into a URL-safe string.
 * @param {Object} data - The data to encode.
 * @returns {string} Encoded string.
 */
export function encodeUrlData(data) {
  const json = JSON.stringify(data);
  return encodeURIComponent(json);
}

/**
 * Decode a URL-safe string back into a JS object.
 * @param {string} encodedStr - The encoded string.
 * @returns {Object} Decoded data.
 */
export function decodeUrlData(encodedStr) {
  const json = decodeURIComponent(encodedStr);
  return JSON.parse(json);
}
