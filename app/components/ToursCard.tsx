import { Tour } from '@prisma/client';
import Link from 'next/link';

const ToursCard = ({ tour }: { tour: Tour }) => {
  return (
    <Link
      href={`/tours/${tour.id}`}
      className="w-full bg-base-200 h-16 flex items-center card justify-center rounded-full"
    >
      <p className="text-lg text-center capitalize font-semibold">
        {tour.city} - {tour.country}
      </p>
    </Link>
  );
};
export default ToursCard;
