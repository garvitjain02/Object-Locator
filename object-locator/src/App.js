// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './MyComponents/landingPage/MainPage';
import MyProfile from './MyComponents/profile/MyProfile';
import Details from './MyComponents/landingPage/Details';
import Add from './MyComponents/Add';
import Home from './MyComponents/Home';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

function App() {
  let st = {
    margin: '1%'
  };

  console.log (sessionStorage.getItem('token'));
  if (sessionStorage.getItem('token') === null)
  {
    return <Home />
  }

  return (
    <div style={st}>
    <Router>
      <Switch>
        <Route exact path="/Details" element={<Details />} />
        <Route exact path="/MyProfile" element={<MyProfile />} />
        <Route exact path="/" element={<MainPage />} />
        <Route exact path='/Add' element={<Add />} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
