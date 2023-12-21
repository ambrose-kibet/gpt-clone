import { IoSend } from 'react-icons/io5';
const ChatPage = () => {
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-grow">messages</div>
      <form className="form join mt-auto min-w-full">
        <input
          type="text"
          className="input input-primary input-bordered join-item w-full"
          placeholder="Ask GPT a question"
        />
        <button className="btn btn-primary join-item text-2xl">
          <IoSend />
        </button>
      </form>
    </div>
  );
};
export default ChatPage;
