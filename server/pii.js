/**
 * PII masking utility.
 *
 * Reliably masks patterns that have a fixed, detectable structure:
 * - Email addresses
 * - Phone numbers (various common formats)
 * - LinkedIn/GitHub profile URLs
 *
 * NOTE on names/locations: these have no fixed pattern, so reliably
 * detecting them requires proper NLP/NER (Named Entity Recognition),
 * not simple regex. Attempting a naive heuristic (e.g. "first line is
 * the name") is unreliable and can either mask the wrong text or miss
 * real names entirely, which would be misleading to claim as "solved".
 * This is intentionally left out rather than faked.
 */

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Matches common phone formats: +91 98765 43210, (123) 456-7890, 123-456-7890, 9876543210, etc.
const PHONE_REGEX = /(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}\b/g;

const LINKEDIN_REGEX = /(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?/g;
const GITHUB_REGEX = /(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/?/g;

/**
 * Masks detectable PII in the given text.
 * Returns { maskedText, map } where map lets you reverse the masking later
 * (e.g. to restore real contact info in the AI's rewritten output).
 */
function maskPII(text) {
  const map = {};
  let counter = { email: 0, phone: 0, linkedin: 0, github: 0 };
  let maskedText = text;

  maskedText = maskedText.replace(LINKEDIN_REGEX, (match) => {
    counter.linkedin += 1;
    const placeholder = `[LINKEDIN_${counter.linkedin}]`;
    map[placeholder] = match;
    return placeholder;
  });

  maskedText = maskedText.replace(GITHUB_REGEX, (match) => {
    counter.github += 1;
    const placeholder = `[GITHUB_${counter.github}]`;
    map[placeholder] = match;
    return placeholder;
  });

  maskedText = maskedText.replace(EMAIL_REGEX, (match) => {
    counter.email += 1;
    const placeholder = `[EMAIL_${counter.email}]`;
    map[placeholder] = match;
    return placeholder;
  });

  maskedText = maskedText.replace(PHONE_REGEX, (match) => {
    // Skip short numeric matches that are likely not phone numbers (e.g. years, scores)
    const digitsOnly = match.replace(/\D/g, "");
    if (digitsOnly.length < 7) return match;
    counter.phone += 1;
    const placeholder = `[PHONE_${counter.phone}]`;
    map[placeholder] = match;
    return placeholder;
  });

  return { maskedText, map };
}

/**
 * Recursively walks any JS value (string, array, object) and replaces
 * placeholder tokens with their original values from the map.
 * Used to restore real contact info in the AI's response before
 * sending it back to the user.
 */
function unmaskPII(value, map) {
  if (typeof value === "string") {
    let result = value;
    for (const [placeholder, original] of Object.entries(map)) {
      result = result.split(placeholder).join(original);
    }
    return result;
  }

  if (Array.isArray(value)) {
    return value.map((item) => unmaskPII(item, map));
  }

  if (value && typeof value === "object") {
    const result = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = unmaskPII(val, map);
    }
    return result;
  }

  return value;
}

module.exports = { maskPII, unmaskPII };