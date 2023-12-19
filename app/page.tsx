import Link from 'next/link';

const Home = () => {
  return (
    <main className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-primary">GPT Clone</h1>
          <p className="py-6 leading-loose">
            Welcome to GPT Clone. A Chat GPT clone built using Next.js. Explore
            the world of Conversational AI as. Join me in crafting intelligent
            conversations with AI.
          </p>
          <Link href={'/chat'} className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
