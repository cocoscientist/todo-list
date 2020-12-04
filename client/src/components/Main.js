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
        })
    }

    makeChange = id =>{
        const updateData = {
            TodoId: id
        };
        axios.put('/api/todos/change',updateData)
        .then(res=>{
            console.log(res);
        })
    }

    deletionFunc = id =>{
        const deleteData = {
            TodoId: id
        };
        axios.delete('/api/todos/delete/'+deleteData.TodoId)
        .then(res=>{
            console.log(res);
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
        const tasksDone = this.state.todos.filter(task=> task.Status===1);
        const tasksComplete = tasksDone.map(task=>(<li key={task.TodoId} style={{listStyleType:"none"}}><button className="waves-effect waves-light btn" onClick={()=>this.deletionFunc(task.TodoId)}>DELETE</button><Todo todoId={task.TodoId} title={task.Title} status={task.Status} /></li>));
        const tasksLeft = this.state.todos.filter(task=> task.Status===0);
        //const tasksRemain = tasksLeft.map(task=>(<Todo todoId={task.TodoId} title={task.Title} status={task.Status} />));
        const tasksRemain = tasksLeft.map(task=>(<li key={task.TodoId} style={{listStyleType:"none"}}><button className="waves-effect waves-light btn" onClick={()=>this.makeChange(task.TodoId)}>MARK AS COMPLETE</button><Todo todoId={task.TodoId} title={task.Title} status={task.Status} /></li>));
        return(
        <div>
        <h4>Welcome, {this.state.UserId}</h4>
        <form noValidate onSubmit={this.onSubmit}>
        <div className = "input-field col s6">
            <input onChange={this.onChange} value={this.state.inputValue} type="text" id="Title" />
            <label htmlFor="todoTitle">Enter Todo Title</label>
        </div>
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
        <button style={{width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem" }} type="submit" className="btn waves-effect waves-light hoverable blue accent-3">
        Enter
        </button>
        </div>
        </form>
        <div className="divider"></div>
        <div className="row">
            <div className="col s6">
                <h5>Completed Tasks:</h5>
                { tasksComplete }
            </div>
            <div className = "col s6">
                <h5>Tasks Left:</h5>
                { tasksRemain }
            </div>
        </div>
        </div>
        );
    }
};

export default Main;