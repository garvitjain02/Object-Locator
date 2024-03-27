// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './MyComponents/landingPage/MainPage';
import MyProfile from './MyComponents/profile/MyProfile';
import Details from './MyComponents/landingPage/Details';
import Add from './MyComponents/Add';
import Search from './MyComponents/SearchItem';

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route, Navigate
} from "react-router-dom";
import Home from './MyComponents/Home';
import Register from './MyComponents/Register';
import EditProfile from './MyComponents/profile/EditProfile';
import EditDetails from './MyComponents/landingPage/EditDetails';
import Category from './MyComponents/Category';

function App() {
  let st = {
    margin: '1%'
  };

  console.log (sessionStorage.getItem('token'));
  if (sessionStorage.getItem('token') === null)
  { 
    return (
      <>
      <Router>
        <Switch>
          <Route path='/' element={<Home />} />
          <Route exact path='/signup' element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Switch>
      </Router>
      </>
    )
  }

  return (
    <div style={st}>
    <Router>
      <Switch>
        <Route exact path="/Details" element={<Details />} />
        <Route exact path="/MyProfile" element={<MyProfile />} />
        <Route exact path="/" element={<MainPage />} />
        <Route exact path='/Add' element={<Add />} />
        <Route exact path='/EditProfile' element={<EditProfile />} />
        <Route exact path='/UpdateItem' element={<EditDetails />} />
        <Route exact path='/Category' element={<Category />} />
        <Route exact path="/SearchItem" element={<Search />} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
