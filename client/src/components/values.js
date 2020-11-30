import React from 'react'
import './values.css';

class Value extends React.Component{
    constructor(){
      super();
      this.state = {
        values: []
      }
    }
    componentDidMount(){
      fetch('/api/values')
        .then(data => data.json())
        .then(values => this.setState({values}));
    }
    render(){
        return(
            <div>
                <h2>Values</h2>
                <ul>
                    {this.state.values.map(value =>
                        <li key={value.id}>{value.name}</li>
                    )}
                </ul>
            </div>
            
        );
    }
};

export default Value;
