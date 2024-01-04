import { Tour } from '@prisma/client';
import ToursCard from './ToursCard';

const ToursList = ({ tours }: { tours: Tour[] }) => {
  if (!tours.length)
    return <h1 className="text-lg text-center">No tours found..</h1>;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {tours.map((tour) => {
        return <ToursCard key={tour.id} tour={tour} />;
      })}
    </div>
  );
};
export default ToursList;
