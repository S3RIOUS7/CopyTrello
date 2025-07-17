import { Fragment } from "react/jsx-runtime";
import '../../../../styles/pagesStyles/MainPage/MainPageParts/mainMenu.scss'

import HomeIcon from "../../../../assets/img/icon/HomeIcon";
import BoardsIcon from "../../../../assets/img/icon/BordsIcon";
import TemplatesIcon from "../../../../assets/img/icon/Templates";

import WorkspaceMenuDropdown from "../WorkspaceMenuDropdown/WorkspaceMenuDropdown";
import ArrowDownIcon from "../../../../assets/img/icon/ArrowDownIcon";
import ArrowUpIcon from "../../../../assets/img/icon/ArrowUpIcon";



const MainPageMenu = () => {
  return (
    <Fragment>
      <div className="dashboard-menu">
        <div className="first-group">
          <div className="title-list">
            <BoardsIcon/><span>Доски</span>
          </div>
          <div className="title-list">
            <TemplatesIcon/><span>Шаблоны</span>
          </div>
          <div className="title-list">
            <HomeIcon/><span>Главная станица</span>
          </div>
        </div>
      <div className="second-group">
          <WorkspaceMenuDropdown 
            title="Рабочие пространства"
            triggerText="Рабочее пространство Trello" defaultIcon={<ArrowDownIcon/>} activeIcon={<ArrowUpIcon/>} />
        </div>
      </div> 
      
    </Fragment>
  );
};

export default MainPageMenu;