'use client';

import { createChat, decrementTokens, fetchUserTokens } from '@/utils/actions';
import { useMutation } from '@tanstack/react-query';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { FormEvent, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import ChatLoading from '@/app/components/ChatLoading';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';

const Chat = () => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [message, setMessage] = useState('');
  const { userId } = useAuth();
  const { mutate, isPending, data } = useMutation({
    mutationFn: async (query: string) => {
      const tokens = await fetchUserTokens(userId as string);
      if ((tokens?.token as number) < 100) {
        toast.error('You have no tokens left. ');
        return;
      }
      const response = await createChat([
        ...messages,
        { role: 'user', content: query },
      ]);
      if (!response) return toast.error('Something went wrong...');
      setMessages((prev) => [
        ...prev,
        response.message as ChatCompletionMessageParam,
      ]);
      const newTokens = await decrementTokens(
        userId as string,
        response.tokens as number
      );
      toast.success(`You have ${newTokens} tokens left.`);
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(message);
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setMessage('');
  };

  if (isPending) return <ChatLoading />;
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-grow ">
        {messages.map(({ role, content }, i) => {
          return (
            <div className="flex gap-4 items-center mb-4" key={i}>
              <div
                className={`${
                  role === 'user' ? 'bg-base-200' : 'bg-base-300'
                } w-16 h-16 rounded-full shrink-0 flex items-center justify-center text-2xl`}
              >
                {role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="flex flex-col gap-4 w-full">
                <div
                  className={`${
                    role === 'user'
                      ? 'bg-base-200 text-base-content'
                      : 'bg-base-300 text-base-content'
                  } p-4 rounded-xl w-full`}
                >
                  {content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <form className="form join mt-auto min-w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input input-primary input-bordered join-item w-full"
          placeholder="Ask GPT a question"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          className="btn btn-primary join-item text-2xl "
          type="submit"
          disabled={isPending}
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
};
export default Chat;
