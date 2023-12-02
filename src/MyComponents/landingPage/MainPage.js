import React from 'react'
import Header from '../Header';
import LeftNav from '../LeftNav';
import ItemList from './ItemList';
import '../style.css';

const MainPage = () => {
    let st = {
        margin: '1%'
    };
  return (
    <div style={st}>
    <Header/>
    <LeftNav/>
    <ItemList/>
    </div>
  )
}

export default MainPage
