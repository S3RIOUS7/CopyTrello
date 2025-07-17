import { Fragment } from "react/jsx-runtime";
import MainPageMenu from "../../components/parts/MainPage/MainPageComponents/MainPageMenu";
import '../../styles/pagesStyles/MainPage/mainPage.scss'
import MainPageDashboardCreateDelete from "../../components/parts/MainPage/MainPageComponents/MainPageDashboardCreateDelete";

const MainPage = () => {
  return (
   <Fragment>
    <div className="start-dashboar-main-container">

      <div className="dashboard-menu-main">

        <div className="dashboard-start-menu">
             <MainPageMenu />
         </div>

    <div className="create-delete-main-dashboard">
              <MainPageDashboardCreateDelete/>
    </div>

    </div>
    
    </div>

   </Fragment>
  );
};

export default MainPage;