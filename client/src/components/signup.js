import React from 'react'
import './values.css';

class Value extends React.Component{
    constructor(){
      super();
      this.state = {
        UserId: '',
        Password: '',
        SignedUp: false
      }
      this.handleUser = this.handleUser.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUser(event){
        this.setState({
            UserId: event.target.value
        })
    }
    handlePassword(event){
        this.setState({
            Password: event.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault();
        fetch('/api/users/add',{
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((result) => result.json())
        .then(info=>{console.log(info)});
    }
    render(){
        const notDone=<h1>Not Submitted</h1>;
        const done = <h1>Submitted</h1>;
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label for="UserId">UserId</label>
                    <input type="text" name="UserId" value={this.state.UserId} onChange={this.handleUser}/>
                    <label for="Password">Password</label>
                    <input type="password" name="Password" value={this.state.Password} onChange={this.handlePassword}/>
                    <button type="submit">Register</button>
                </form>
                {this.state.SignedUp?done:notDone}
            </div>
        );
    }
};

export default Value;
