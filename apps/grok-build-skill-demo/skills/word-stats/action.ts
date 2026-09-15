export interface WordStatsResult {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  readingTimeSeconds: number;
  topWords: { word: string; count: number }[];
}

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "of", "to", "in", "on", "at", "is",
  "are", "was", "were", "be", "it", "its", "this", "that", "with", "for",
  "as", "by", "not", "from", "have", "has", "had", "i", "you", "he", "she",
  "we", "they", "my", "your", "so", "do", "does", "did", "will", "just",
]);

const WORDS_PER_MINUTE = 200;

export function run(input: { text: string }): WordStatsResult {
  const text = input.text ?? "";
  const words = text.toLowerCase().match(/[\p{L}\p{N}''-]+/gu) ?? [];
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  const frequency = new Map<string, number>();
  for (const word of words) {
    if (STOP_WORDS.has(word)) continue;
    frequency.set(word, (frequency.get(word) ?? 0) + 1);
  }
  const topWords = [...frequency.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));

  return {
    words: words.length,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    sentences: sentences.length,
    readingTimeSeconds: Math.ceil((words.length / WORDS_PER_MINUTE) * 60),
    topWords,
  };
}
