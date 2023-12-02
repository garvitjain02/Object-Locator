// import logo from './logo.svg';
import './App.css';
// import Home from "./MyComponents/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProfile from './MyComponents/profile/MyProfile';
// import MainPage from './MyComponents/landingPage/MainPage';

function App() {
  let st = {
    margin: '1%'
  };

  return (
    <div style={st}>
    <MyProfile/>
    </div>
  );
}

export default App;
