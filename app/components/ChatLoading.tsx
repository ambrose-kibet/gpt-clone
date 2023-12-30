const ChatLoading = () => {
  return (
    <div className="flex flex-col min-h-full min-w-full">
      <div className="flex-grow">
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <div className="flex gap-4 items-center mb-4" key={i}>
              <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
              <div className="flex flex-col gap-4 w-full">
                <div className="skeleton h-40 w-full"></div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div className="skeleton min-w-full h-14 rounded-full skeleton"></div>
      </div>
    </div>
  );
};
export default ChatLoading;
