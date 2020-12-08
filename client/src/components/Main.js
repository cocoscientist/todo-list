import axios from 'axios';
import React from 'react';
import Todo from './Todos/todoElement';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            UserId: '',
            todos: [],
            inputValue: '',
            priority: 1,
            lth: false
        }
    }

    onChange = event =>{
        this.setState({
            inputValue: event.target.value
        });
    }

    onPriority = event=>{
        this.setState({
            priority: parseInt(event.target.value,10)
        });
    }

    
    onSubmit = event =>{
        event.preventDefault();
        const todoData = {
            UserId: this.state.UserId,
            Title: this.state.inputValue,
            Priority: this.state.priority
        };
        console.log(todoData);
        axios.post('/api/todos/add',todoData)
        .then(res=>{
            
            let todoItems = this.state.todos;
            todoItems.push({TodoId: res.data.results.insertId, Title:todoData.Title, Status: 0, Priority:todoData.Priority});
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
            
            let currentTodos = this.state.todos;
            let index = currentTodos.findIndex(x => x.TodoId===id);
            currentTodos[index].Status = 1;
            this.setState({
                todos: currentTodos
            });
        })
    }

    deletionFunc = id =>{
        const deleteData = {
            TodoId: id
        };
        axios.delete('/api/todos/delete/'+deleteData.TodoId)
        .then(res=>{
            
            let currentTodos = this.state.todos;
            let index = currentTodos.findIndex(x => x.TodoId===id);
            currentTodos.splice(index,1);
            this.setState({
                todos: currentTodos
            });
        })
    }

    componentDidMount(){
        if(typeof this.props.location.state === 'undefined'){
            this.props.history.push('/');
        }else{
            let name = this.props.location.state.UserId;
            axios.get('/api/todos/'+name)
            .then(res=>{
                
                this.setState({
                    UserId: name,
                    todos: res.data.results
                });
            });
        }
    }

    render(){
        const tasksDone = this.state.todos.filter(task=> task.Status===1);
        const tasksComplete = tasksDone.map(task=>(<li key={task.TodoId} style={{listStyleType:"none"}}><button className="waves-effect waves-light btn" onClick={()=>this.deletionFunc(task.TodoId)}>DELETE</button><Todo todoId={task.TodoId} title={task.Title} status={task.Status} priority={task.Priority} /></li>));
        const tasksLeftHigh = this.state.todos.filter(task=> task.Status===0 && task.Priority===3);
        const tasksLeftMid = this.state.todos.filter(task=> task.Status===0 && task.Priority===2);
        const tasksLeftLow = this.state.todos.filter(task=> task.Status===0 && task.Priority===1);
        const tasksRemainHigh = tasksLeftHigh.map(task=>(<li key={task.TodoId} style={{listStyleType:"none"}}><button className="waves-effect waves-light btn" onClick={()=>this.makeChange(task.TodoId)}>MARK AS COMPLETE</button><Todo todoId={task.TodoId} title={task.Title} status={task.Status} priority={task.Priority} /></li>));
        const tasksRemainMid = tasksLeftMid.map(task=>(<li key={task.TodoId} style={{listStyleType:"none"}}><button className="waves-effect waves-light btn" onClick={()=>this.makeChange(task.TodoId)}>MARK AS COMPLETE</button><Todo todoId={task.TodoId} title={task.Title} status={task.Status} priority={task.Priority} /></li>));
        const tasksRemainLow = tasksLeftLow.map(task=>(<li key={task.TodoId} style={{listStyleType:"none"}}><button className="waves-effect waves-light btn" onClick={()=>this.makeChange(task.TodoId)}>MARK AS COMPLETE</button><Todo todoId={task.TodoId} title={task.Title} status={task.Status} priority={task.Priority} /></li>));
        return(
        <div>
        <h4>Welcome, {this.state.UserId}</h4>
        <form noValidate onSubmit={this.onSubmit}>
        <div class="row">
        <div className = "input-field col s6">
            <input onChange={this.onChange} value={this.state.inputValue} type="text" name="inputValue" id="Title" />
            <label htmlFor="todoTitle">Enter Todo Title</label>
        </div>
        <div className="input-field col s6">
            <select value={this.state.priority} onChange={this.onPriority} className="browser-default">
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
            </select>
        </div>
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
                { tasksRemainHigh }
                { tasksRemainMid }
                { tasksRemainLow }
            </div>
        </div>
        </div>
        );
    }
};

export default Main;