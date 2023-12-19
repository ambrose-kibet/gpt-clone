import { SiOpenaigym } from 'react-icons/si';
import ToggleButton from './ToggleButton';
const SideBarHeader = () => {
  return (
    <div className="flex px-4 gap-4 items-center ">
      <SiOpenaigym className="w-10 h-10" />

      <h1 className="text-2xl font-extrabold text-primary">Gpt Clone</h1>
      <ToggleButton />
    </div>
  );
};
export default SideBarHeader;
