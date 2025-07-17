import { Fragment } from "react/jsx-runtime";
import Button from "../../base/button/Button";
import '../../../styles/partsStyles/header.scss';
import { Input } from "../../base/input/Input";
import { DropdownMenu } from "../../base/dropDownMenu/DropDownMenu";
import { useState } from "react";
import { HELP_IMAGES } from "../../../utils/constants/headerConstants/helpConstants";

import GridIcon from "../../../assets/img/icon/GridMenu";
import BarChartIcon from "../../../assets/img/icon/BarChartIcon";
import HelpIcon from "../../../assets/img/icon/HelpIcon";

import Avatar from "../../../assets/img/icon/Avatar";
import MainMenuDropdown from "./HeaderComponents/MainMenuDropdown";
import HelpMenuDropdown from "./HeaderComponents/HelpMenuDropdown";
import ProfileMenuDropdown from "./HeaderComponents/ProfileMenuDropdown";



const Header = () => {
  const [currentHelpImage, setCurrentHelpImage] = useState(HELP_IMAGES[0]);

  const handleHelpMenuOpen = () => {
    setCurrentHelpImage(HELP_IMAGES[Math.floor(Math.random() * HELP_IMAGES.length)]);
  };

  return (
    <Fragment>
      <div className="header-container">
        <div className="header-buttons">
          <div className="left-button-container">
            <DropdownMenu
              triggerIcon={<GridIcon />}
              panelContent={<MainMenuDropdown />}
              triggerClassName="grid-icon-trigger" 
              anchor="bottom start"
              menuType="header"
            />
            
            <div className="main-trello">
              <Button buttonStyle="icon" type="button" isActive={true} icon={<BarChartIcon />}>
                <div className="trello">Trello</div>
              </Button>
            </div>
          </div>
          
          <div className="middle-button-container">
            <div className="search-wrapper">
              <div className="search-composite">
                <Input 
                  type="text" 
                  placeholder="Search..." 
                  className="header-input"
                  withSearchIcon
                />
                <Button buttonStyle="search" type="button">Создать</Button>
              </div>
            </div>
          </div>
          
          <div className="right-button-container">
            <DropdownMenu
              triggerIcon={<HelpIcon />}
              panelContent={<HelpMenuDropdown currentImage={currentHelpImage} />}
              triggerClassName="help-icon-trigger" 
              anchor="bottom end"
              onOpen={handleHelpMenuOpen}
              menuType="header"
            />

            <DropdownMenu
              triggerIcon={<Avatar />}
              panelContent={<ProfileMenuDropdown />}
              triggerClassName="avatar-icon-trigger" 
              anchor="bottom end"
              menuType="header"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;