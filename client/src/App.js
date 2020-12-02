import React from 'react'
import './App.css';
import SignUp from './components/signup';

class App extends React.Component{
  constructor(){
    super();
  }
  render(){
    return(
      <SignUp />
    )
  }
};

export default App;
