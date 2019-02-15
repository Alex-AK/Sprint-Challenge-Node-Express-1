import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    projects: []
  };
  componentDidMount = () => {
    axios
      .get('http://localhost:4000/api/projects/')
      .then(res => this.setState({ projects: res.data.projects }))
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state.projects);
    const mapped = this.state.projects.map(project => (
      <div>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
      </div>
    ));

    return <div className="App">{mapped}</div>;
  }
}

export default App;
