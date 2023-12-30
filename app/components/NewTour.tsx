'use client';
import { useMutation } from '@tanstack/react-query';

const NewTours = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: async () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const destinationForm = new FormData(e.currentTarget);
    const destination = Object.fromEntries(destinationForm.entries());
    // Object.fromEntries() method transforms a list of key-value pairs into an object.
    mutate();
  };
  return (
    <div className="w-full flex flex-col">
      <h5 className="mb-4 "> Select your dream destination</h5>
      <form className="max-w-md" onSubmit={handleSubmit}>
        <div className="join w-full">
          <input
            type="text"
            placeholder="city"
            name="city"
            required
            className="w-full join-item input input-bordered input-primary"
          />
          <input
            type="text"
            placeholder="country"
            name="country"
            required
            className="w-full join-item input input-bordered input-primary"
          />
          <button
            type="submit"
            className="btn btn-primary join-item capitalize"
            disabled={isPending}
          >
            {isPending ? 'please wait...' : 'generate Tour'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewTours;
