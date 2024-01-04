import { Tour } from '@/utils/types';

const TourInfo = (data: Tour) => {
  const { city, country, description, stops, title } = data;
  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-semibold text-center my-4">{title}</h1>
      <p className="leading-loose mb-4">{description}</p>
      <ul className="list-none list-inside">
        {stops?.map((stop, index) => (
          <li key={index} className="bg-base-100 rounded-xl">
            <p>{stop}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TourInfo;
