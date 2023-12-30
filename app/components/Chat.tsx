'use client';

import { createChat } from '@/utils/actions';
import { useMutation } from '@tanstack/react-query';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { FormEvent, useState } from 'react';
import { IoSend } from 'react-icons/io5';

const Chat = () => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [message, setMessage] = useState('');
  const { mutate, isPending, data } = useMutation({
    mutationFn: (query: string) =>
      createChat([...messages, { role: 'user', content: query }]),
    onSuccess: (data) => {
      setMessages([...messages, data as ChatCompletionMessageParam]);
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(message);
  };
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-grow">messages</div>
      <form className="form join mt-auto min-w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input input-primary input-bordered join-item w-full"
          placeholder="Ask GPT a question"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-primary join-item text-2xl" type="submit">
          <IoSend />
        </button>
      </form>
    </div>
  );
};
export default Chat;
