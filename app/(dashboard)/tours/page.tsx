import Tours from '@/app/components/Tours';
import { fetchAllTours } from '@/utils/actions';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
const ToursPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['tours'],
    queryFn: () => fetchAllTours(undefined),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Tours />
    </HydrationBoundary>
  );
};
export default ToursPage;
