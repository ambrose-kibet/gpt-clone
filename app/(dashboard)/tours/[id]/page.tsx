import SingleTour from '@/app/components/SingleTour';
import { getSingleTour } from '@/utils/actions';
import { Tour } from '@/utils/types';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&query=`;

const SingleTourPage = async ({ params }: { params: any }) => {
  const { id } = params;
  const tour = await getSingleTour(id);
  const { data } = await axios(`${url}${tour?.city}`);
  const tourImage = data?.results[0]?.urls?.raw;
  if (!tour) return redirect('/tours');

  return (
    <div>
      <div className="text-sm breadcrumbs mb-12">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/tours">Tours</Link>
          </li>
        </ul>
      </div>
      <Image
        src={tourImage}
        width={300}
        height={300}
        alt={tour.city}
        className="rounded-lg w-96 h-96 shadow-xl object-cover "
        priority
      />

      <SingleTour tour={tour as unknown as Tour} />
    </div>
  );
};
export default SingleTourPage;
