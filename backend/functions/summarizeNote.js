import { SummarizerManager } from "node-summarizer";

export const handler = async (event) => {
  const { text } = JSON.parse(event.body);
  const summarizer = new SummarizerManager(text, 3);
  const summary = await summarizer.getSummaryByFrequency();

  return {
    statusCode: 200,
    body: JSON.stringify({ summary: summary.summary }),
  };
};
