import Axios from 'axios';
import React from 'react';
import Todo from './Todos/todoElement';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            UserId: '',
            todos: []
        }
    }

    componentDidMount(){
        if(typeof this.props.location.state === 'undefined'){
            this.props.history.push('/');
        }else{
            let name = this.props.location.state.UserId;
            Axios.get('/api/todos/'+name)
            .then(res=>{
                console.log(res.data.results);
                this.setState({
                    UserId: name,
                    todos: res.data.results
                });
            });
        }
    }

    render(){
        const tasks = this.state.todos.map(task=>(<Todo todoId={task.TodoId} title={task.Title} status={task.Status} />))
        return(
        <div>
        <h2>Welcome, {this.state.UserId}</h2>
        { tasks }
        </div>
        );
    }
};

export default Main;