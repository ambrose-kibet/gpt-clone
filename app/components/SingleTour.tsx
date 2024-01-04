import { Tour } from '../../utils/types';

const SingleTour = ({ tour }: { tour: Partial<Tour> }) => {
  const { stops, city } = tour;
  const stopsArray = JSON.parse(stops as unknown as string);
  return (
    <div className="bg-base-200 max-w-lg">
      <h1 className="text-4xl font-semibold text-center my-4 capitalize">
        Family fun day-{city}
      </h1>
      <p className="text-center leading-loose">{tour.description}</p>
      <ul className="list-none list-inside">
        {stopsArray.map((stop: string, index: number) => (
          <li key={index} className="bg-base-100 rounded-xl">
            <p>{stop}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SingleTour;
