import MemberProfile from './MemeberProfile';
import NavLinks from './NavLinks';
import SideBarHeader from './SideBarHeader';

const Sidebar = () => {
  return (
    <div className="drawer-side ">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay "
      ></label>
      <div className="py-12 grid grid-rows-[auto,1fr,auto] p-4 w-80 min-h-screen bg-base-200 text-base-content">
        <SideBarHeader />
        <NavLinks />
        <MemberProfile />
      </div>
    </div>
  );
};
export default Sidebar;
