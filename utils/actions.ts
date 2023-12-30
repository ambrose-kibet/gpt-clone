'use server';
import OpenAI from 'openai';
import { Chat, ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const key = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: key,
});

export const createChat = async (
  messages: ChatCompletionMessageParam[]
): Promise<Chat.Completions.ChatCompletionMessage | null> => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...messages,
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0,
    });
    return completion?.choices[0]?.message;
  } catch (error) {
    return null;
  }
};
