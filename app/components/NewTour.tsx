'use client';
import {
  createTour,
  fetchExistingTour,
  generateTourResponse,
} from '@/utils/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import TourInfo from './TourInfo';
import { Destination, Tour } from '@/utils/types';

const NewTours = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, data } = useMutation({
    mutationFn: async (tour: Destination) => {
      const result = await fetchExistingTour(tour);
      if (result) {
        return { ...result, stops: JSON.parse(result.stops as string) };
      }
      const newTour = await generateTourResponse(tour);
      if (newTour) {
        await createTour(newTour);
        await queryClient.invalidateQueries({ queryKey: ['tours'] });
        return newTour;
      }
      toast.error('No matching city found...');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const destinationForm = new FormData(e.currentTarget);
    const destination = Object.fromEntries(destinationForm.entries());
    // Object.fromEntries() method transforms a list of key-value pairs into an object.
    mutate(destination as unknown as Destination);
    e.currentTarget.reset();
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
      <TourInfo {...(data as Tour)} />
    </div>
  );
};
export default NewTours;
