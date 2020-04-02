import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Help = props => (
  <tr>
    <td>{props.help.username}</td>
    <td>{props.help.description}</td>
    <td>{props.help.subject}</td>
    <td>
      <Link to={"/edit/"+props.help._id}>edit</Link> | <a href="#" onClick={() => { props.deleteHelp(props.help._id) }}>delete</a>
    </td>
  </tr>
)

export default class HelpsList extends Component {
  constructor(props) {
    super(props);

    this.deleteHelp = this.deleteHelp.bind(this)

    this.state = {helps: []};
  }

  componentDidMount() {
    axios.get('helps/')
      .then(response => {
        this.setState({ helps: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteHelp(id) {
    axios.delete('helps/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      helps: this.state.helps.filter(el => el._id !== id)
    })
  }

  helpList() {
    return this.state.helps.map(currenthelp => {
      return <Help help={currenthelp} deleteHelp={this.deleteHelp} key={currenthelp._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Helps Request List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Full Name</th>
              <th>Description</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.helpList() }
          </tbody>
        </table>
      </div>
    )
  }
}