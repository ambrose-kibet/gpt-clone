import NewTours from '@/app/components/NewTour';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
const NewTourPage = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewTours />
    </HydrationBoundary>
  );
};
export default NewTourPage;
