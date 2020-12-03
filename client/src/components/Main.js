import axios from 'axios';
import React from 'react';
import Todo from './Todos/todoElement';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            UserId: '',
            todos: [],
            inputValue: ''
        }
    }

    onChange = event =>{
        this.setState({
            inputValue: event.target.value
        });
    }

    onSubmit = event =>{
        event.preventDefault();
        const todoData = {
            UserId: this.state.UserId,
            Title: this.state.inputValue
        };
        axios.post('/api/todos/add',todoData)
        .then(res=>{
            console.log(res);
            let todoItems = this.state.todos;
            todoItems.push({TodoId: res.data.results.insertId, Title:todoData.Title, Status: 0});
            this.setState({
                inputValue:'',
                todos: todoItems
            });
            this.render();
        })
    }

    componentDidMount(){
        if(typeof this.props.location.state === 'undefined'){
            this.props.history.push('/');
        }else{
            let name = this.props.location.state.UserId;
            axios.get('/api/todos/'+name)
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
        <h4>Welcome, {this.state.UserId}</h4>
        <form noValidate onSubmit={this.onSubmit}>
        <div className = "input-field col s12">
            <input onChange={this.onChange} value={this.state.inputValue} type="text" id="Title" />
            <label htmlFor="todoTitle">Enter Todo Title</label>
        </div>
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
        <button style={{width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem" }} type="submit" className="btn btn-large waves-effect waves-light hoverable blue accent-3">
        Enter
        </button>
        </div>
        </form>
        <div>
            <h5>Current Tasks: </h5>
        </div>
        { tasks }
        </div>
        );
    }
};

export default Main;