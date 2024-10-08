import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const streamAIResponse = async (prompt, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Transfer-Encoding': 'chunked'
  });

  try {
    const stream = await openai.beta.chat.completions.stream({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an AI assistant specialized in generating engaging and professional comments for LinkedIn posts. Your responses should be tailored to the user's persona, maintaining authenticity and relevance. Always strive to add value to the conversation, show genuine interest, and foster meaningful interactions while adhering to LinkedIn etiquette." },
        { role: "user", content: prompt },
      ],
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(content);
      }
    }

    res.end();

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.write('Error during OpenAI API call');
    res.end();
  }
};