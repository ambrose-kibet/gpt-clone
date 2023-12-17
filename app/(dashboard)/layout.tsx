import { FaBars } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button fixed top-0 right-2 text-primary bg-transparent text-3xl p-0 z-50 border-none lg:hidden "
        >
          <FaBars />
        </label>
        <div className="to-base-200 px-8 py-10 min-h-screen ">{children}</div>
      </div>
      <Sidebar />
    </div>
  );
}
