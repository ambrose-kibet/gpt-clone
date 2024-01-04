import SingleTour from '@/app/components/SingleTour';
import { getSingleTour } from '@/utils/actions';
import { Tour } from '@/utils/types';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const SingleTourPage = async ({ params }: { params: any }) => {
  const { id } = params;
  const tour = await getSingleTour(id);
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

      <SingleTour tour={tour as unknown as Tour} />
    </div>
  );
};
export default SingleTourPage;
