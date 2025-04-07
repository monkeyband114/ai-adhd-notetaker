const { SummarizerManager } = require("node-summarizer"); // Use require instead of import

const handler = async (event) => {
  // Parse the incoming event body
  const { text } = JSON.parse(event.body);

  // Initialize the SummarizerManager and get the summary
  const summarizer = new SummarizerManager(text, 3);
  const summary = await summarizer.getSummaryByFrequency();

  return {
    statusCode: 200,
    body: JSON.stringify({ summary: summary.summary }),
  };
};

module.exports = { handler };
