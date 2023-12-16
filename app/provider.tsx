import { Toaster } from 'react-hot-toast';

const Provider = ({ children }: { children: any }) => {
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  );
};
export default Provider;
