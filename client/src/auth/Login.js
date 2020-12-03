import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import Calls from '../commons';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            UserId:'',
            Password:'',
            errors:''
        };
    }

    onChange = event =>{
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    onSubmit = event =>{
        event.preventDefault();
        const userData = {
            UserId: this.state.UserId,
            Password: this.state.Password
        };
        axios.post('/api/users/login',userData)
        .then(res=>{
            if(res.success){
                console.log("Success");
                this.props.history.push('/main');
            }else{
                this.props.history.push('/login');
            }
        })
    }

    render(){
        const { errors } = this.state;
        return(
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                            <b>Login</b> below
                            </h4>
                            <p className="grey-text text-darken-1">Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className = "input-field col s12">
                                <input onChange={this.onChange} value={this.state.UserId} error={errors.UserId} type="text" id="UserId" />
                                <label htmlFor="UserId">Enter UserId</label>
                            </div>
                            <div className = "input-field col s12">
                                <input onChange={this.onChange} value={this.state.Password} error={errors.Password} type="password" id="Password" />
                                <label htmlFor="UserId">Enter Password</label>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button style={{width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem" }} type="submit" className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

};  
export default Login;