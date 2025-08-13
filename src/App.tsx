import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { Provider } from 'react-redux';
import { store } from './store/storage/store';
import Header from './components/parts/Header/Header';
import './index.css'
import MainPage from './pages/mainPage/MainPage';
import { DashBoard } from './pages/dashBoardPage/DashBoard';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Fragment>
          <Header /> 
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/Dashboard/:boardId" element={<DashBoard />} />
          </Routes>
        </Fragment>
      </Provider>
    </Router>
  );
}

export default App;