const loading = () => {
  return (
    <div className="min-w-full flex flex-col ">
      <div className="h-16 rounded-full w-72 skeleton mb-16 mx-auto"></div>
      <div className="flex gap-4 w-full ">
        <div className="w-1/4">
          <div className="h-16 skeleton w-full  rounded-full"></div>
        </div>
        <div className="w-1/4">
          <div className="h-16  skeleton w-full rounded-full"></div>
        </div>
        <div className="w-1/4">
          <div className="h-16  skeleton w-full rounded-full"></div>
        </div>
        <div className="w-1/4">
          <div className="h-16 skeleton w-full rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
export default loading;
