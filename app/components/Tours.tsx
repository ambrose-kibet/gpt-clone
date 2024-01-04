'use client';

import { fetchAllTours } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import ToursList from './ToursList';
import { Tour } from '@prisma/client';
import { useState } from 'react';

const Tours = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isPending } = useQuery({
    queryKey: ['tours', searchTerm],
    queryFn: () => fetchAllTours(searchTerm),
  });
  return (
    <div className="w-full  flex flex-col">
      <form className="mb-12 max-w-lg mx-auto">
        <div className="join w-full rounded-full">
          <input
            type="text"
            name="search"
            className="join-item w-full input input-bordered"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary join-item"
            disabled={isPending}
            onClick={() => setSearchTerm('')}
          >
            {isPending ? 'Please wait ...' : 'Clear'}
          </button>
        </div>
      </form>
      {isPending ? (
        <div className="min-w-full flex flex-col py-16  items-center">
          <div className="flex gap-4 w-full flex-wrap">
            <div className="w-1/4">
              <div className="h-16 rounded-full skeleton w-full"></div>
            </div>
            <div className="w-1/4">
              <div className="h-16 rounded-full skeleton w-full"></div>
            </div>
            <div className="w-1/4">
              <div className="h-16 rounded-full skeleton w-full"></div>
            </div>
            <div className="w-1/4">
              <div className="h-16 rounded-full skeleton w-full"></div>
            </div>
          </div>
        </div>
      ) : (
        <ToursList tours={data as Tour[]} />
      )}
    </div>
  );
};
export default Tours;
