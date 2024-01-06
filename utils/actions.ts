'use server';
import OpenAI from 'openai';
import { Chat, ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import prisma from './db';
import { Destination, Tour, searchTerm } from './types';
import { revalidatePath } from 'next/cache';
const key = process.env.OPEN_AI_KEY;
const openai = new OpenAI({
  apiKey: key,
});

export const createChat = async (messages: ChatCompletionMessageParam[]) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...messages,
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0,
      max_tokens: 150,
    });
    return {
      message: completion?.choices[0]?.message,
      tokens: completion?.usage?.total_tokens,
    };
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
    "stops": [" stop name", "stop name","stop name"]
  }
}
"stops" property should include only three stops.
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'you are a tour guide' },
        {
          role: 'user',
          content: query,
        },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0,
    });

    const tourData = JSON.parse(response.choices[0].message.content as string);
    if (!tourData.tour) {
      return null;
    }
    return { tour: tourData.tour, tokens: response.usage?.total_tokens };
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

export const fetchAllTours = async (searchTerm: searchTerm) => {
  if (searchTerm) {
    return prisma.tour.findMany({
      where: {
        OR: [
          {
            city: {
              contains: searchTerm.toLowerCase(),
            },
          },
          {
            country: {
              contains: searchTerm.toLowerCase(),
            },
          },
        ],
      },
      orderBy: {
        city: 'asc',
      },
    });
  }
  return prisma.tour.findMany({
    orderBy: {
      city: 'asc',
    },
  });
};
export const getSingleTour = async (id: string) => {
  return prisma.tour.findUnique({
    where: {
      id,
    },
  });
};

export const fetchUserTokens = async (clerkId: string) => {
  const token = await prisma.token.findUnique({
    where: {
      clerkId,
    },
    select: {
      token: true,
    },
  });
  return token;
};

export const generateTokensForId = async (clerkId: string) => {
  return prisma.token.create({
    data: {
      clerkId,
    },
    select: {
      token: true,
    },
  });
};

export const fetchOrGenerateTokens = async (clerkId: string) => {
  const tokens = await fetchUserTokens(clerkId);
  if (tokens) {
    return tokens.token;
  }
  return (await generateTokensForId(clerkId)).token;
};

export const decrementTokens = async (clerkId: string, value: number) => {
  const results = await prisma.token.update({
    where: {
      clerkId,
    },
    data: {
      token: {
        decrement: value,
      },
    },
    select: {
      token: true,
    },
  });
  revalidatePath('/profile');
  return results.token;
};
