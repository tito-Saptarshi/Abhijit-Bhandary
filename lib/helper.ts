export const userLoginId = "kp_aa9f07db3b5541638fa62688c25bd504";

export const userDbName = "madara";

export function extractWords(input: string): string[] {
  // Use a regular expression to match all words (sequences of characters separated by spaces or commas)
  const words = input.split(/[\,]+/);

  // Return the array of words
  return words;
}
