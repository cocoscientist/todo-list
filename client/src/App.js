import React, { Component } from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import "./App.css";
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Register from './auth/Register';
import Login from './auth/Login';
import Main from './components/Main'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/main" component={Main} />
        </div>
      </Router>
    );
  }
}
export default App;