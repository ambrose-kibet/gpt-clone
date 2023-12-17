import { Toaster } from 'react-hot-toast';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  );
};
export default Provider;
