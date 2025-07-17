import React from "react";
import { DropdownMenu } from "../../../base/dropDownMenu/DropDownMenu";
import MenuGroup from "../../../base/menuItemGroup/MenuGroup";
import BoardsIcon from "../../../../assets/img/icon/BordsIcon";
import UserGroupIcon from "../../../../assets/img/icon/UserGroupIcon";
import SettingsIcon from "../../../../assets/img/icon/SettingsIcon";
import '../../../../styles/baseComponentsStyles/dropDowns/workspaceMenuDropdown.scss'

interface WorkspaceMenuDropdownProps {
  triggerText: string;
  title?: string;
  defaultIcon: React.ReactNode; 
  activeIcon: React.ReactNode; 
}

const WorkspaceMenuDropdown: React.FC<WorkspaceMenuDropdownProps> = ({ 
  triggerText,
  title,
  defaultIcon,
  activeIcon
}) => {
  const menuGroups = [
    {
      items: [
        { 
          text: "Доски",
          icon: <BoardsIcon/>
        },
        { 
          text: "Участники",
          icon: <UserGroupIcon />
        },
        { 
          text: "Настройки",
          icon: <SettingsIcon />
        }
      ]
    }
  ];

  const triggerContent = (icon: React.ReactNode) => (
    <div className="workspace-menu-dropdown__trigger menu-item">
      <div className="PIconTitle">
        <div className="PIcon">P</div>
        <span>{triggerText}</span>
      </div>
      {icon}
    </div>
  );

  return (
    <div className="workspace-menu-dropdown">
      {title && <h2 className="workspace-title">{title}</h2>}
      <DropdownMenu
        triggerIcon={triggerContent(defaultIcon)}
        activeTriggerIcon={triggerContent(activeIcon)}
        panelContent={
          <div className="dropdown-menu-content">
            {menuGroups.map((group, index) => (
              <MenuGroup 
                key={index} 
                items={group.items} 
              />
            ))}
          </div>
        }
        anchor="bottom end"
        asButton={false}
        withIconSwap={true}
        menuType="workspace"
        panelClassName="workspace-menu-dropdown__popover"
      />
    </div>
  );
};

export default WorkspaceMenuDropdown;