// base64Utils.js

/**
 * Robust, Unicode-safe Base64 encoding/decoding utility.
 * Works in browser and Node.js.
 */

const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

const base64Utils = {
  /**
   * Encode a string (Unicode-safe) to Base64.
   * @param {string} str - The input string.
   * @returns {string} Base64-encoded string.
   */
  encode(str) {
    if (isNode) {
      // Node.js: use Buffer
      return Buffer.from(str, "utf-8").toString("base64");
    } else {
      // Browser: handle Unicode properly
      const utf8Bytes = new TextEncoder().encode(str);
      const binaryStr = Array.from(utf8Bytes)
        .map((b) => String.fromCharCode(b))
        .join("");
      return btoa(binaryStr);
    }
  },

  /**
   * Decode a Base64 string (Unicode-safe) back to string.
   * @param {string} b64Str - The Base64 string.
   * @returns {string} Decoded string.
   */
  decode(b64Str) {
    if (isNode) {
      // Node.js: use Buffer
      return Buffer.from(b64Str, "base64").toString("utf-8");
    } else {
      // Browser: handle Unicode properly
      const binaryStr = atob(b64Str);
      const bytes = Uint8Array.from(binaryStr, (c) => c.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    }
  },
};

export default base64Utils;
