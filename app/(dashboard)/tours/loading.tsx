const loading = () => {
  return (
    <div className="min-w-full flex flex-col py-16  items-center">
      <div className="h-16 rounded-full w-72 skeleton mb-16"></div>
      <div className="flex gap-4 w-full flex-wrap">
        <div className="w-1/4">
          <div className="h-16 rounded-lg skeleton w-full"></div>
        </div>
        <div className="w-1/4">
          <div className="h-16 rounded-lg skeleton w-full"></div>
        </div>
        <div className="w-1/4">
          <div className="h-16 rounded-lg skeleton w-full"></div>
        </div>
        <div className="w-1/4">
          <div className="h-16 rounded-lg skeleton w-full"></div>
        </div>
      </div>
    </div>
  );
};
export default loading;
