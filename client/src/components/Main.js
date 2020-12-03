import React from 'react';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            UserId: '',
            todos: ''
        }
    }

    componentDidMount(){
        if(typeof this.props.location.state === 'undefined'){
            this.props.history.push('/');
        }else{
            this.setState({
                UserId: this.props.location.state.UserId
            });
        }
    }

    render(){
        return(
        <h1>{this.state.UserId}</h1>
        );
    }
};

export default Main;