'use server';

import OpenAI from 'openai';
import { Chat, ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import prisma from './db';
import { Destination, Tour } from './types';

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

export const generateTourResponse = async ({ city, country }: Destination) => {
  const query = `Find a exact ${city} in this exact ${country}.
If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
  }
}
"stops" property should include only three stops.
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;
  try {
    const tourData = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a tour guide.',
        },
        {
          role: 'user',
          content: query,
        },
      ],
      temperature: 0,
    });

    const tour = JSON.parse(tourData?.choices[0]?.message.content as string);

    if (!tour.tour) {
      return null;
    }
    return tour.tour;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchExistingTour = async (destination: Destination) => {
  const { city, country } = destination;
  const tour = await prisma.tour.findUnique({
    where: {
      city_country: {
        city: city.toLowerCase(),
        country: country.toLowerCase(),
      },
    },
  });

  return tour;
};
export const createTour = async (destination: Tour) => {
  const { city, country, description, stops } = destination;
  const newStops = JSON.stringify(stops);
  try {
    const tour = await prisma.tour.create({
      data: {
        city: city.toLowerCase(),
        country: country.toLowerCase(),
        description,
        stops: newStops,
      },
    });
    return tour;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchOrGenerateTour = async (destination: Destination) => {
  return null;
};
