import React, { Component } from 'react';
import axios from 'axios';

export default class EditHelp extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      subject: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('/helps/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          subject: response.data.subject
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeSubject(e) {
    this.setState({
      subject: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const help = {
      username: this.state.username,
      description: this.state.description,
      subject: this.state.subject
    }

    console.log(help);

    axios.post('/helps/update/' + this.props.match.params.id, help)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Request</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Full Name: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Class (e.g ENG101): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.subject}
              onChange={this.onChangeSubject}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Help Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}