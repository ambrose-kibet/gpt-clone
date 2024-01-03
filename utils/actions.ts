'use server';
import { Destination } from '@/app/components/NewTour';
import OpenAI from 'openai';
import { Chat, ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const key = process.env.OPEN_AI_KEY;
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

export const generateTour = async (
  destination: Destination
): Promise<string | null> => {
  return null;
};

export const fetchTour = async (
  destination: Destination
): Promise<string | null> => {
  return null;
};

export const fetchOrGenerateTour = async (destination: Destination) => {
  return null;
};
