import React from 'react'
import './App.css';
import SignUp from './components/signup';
import Login from './components/login';

class App extends React.Component{
  constructor(){
    super();
  }
  render(){
    return(
      <Login />
    )
  }
};

export default App;
