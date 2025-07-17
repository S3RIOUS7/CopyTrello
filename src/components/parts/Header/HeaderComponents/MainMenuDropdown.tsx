import BarChartIcon from "../../../../assets/img/icon/BarChartIcon";
import HomeIcon from "../../../../assets/img/icon/HomeIcon";
import MenuItem from "../../../base/menuItemGroup/MenuItem";


const MainMenuDropdown = () => (
  <div className="drop-menu">
    <MenuItem icon={<HomeIcon />} text="Главная" />
    <MenuItem icon={<BarChartIcon className="static" />} text="Trello" />
  </div>
);

export default MainMenuDropdown;