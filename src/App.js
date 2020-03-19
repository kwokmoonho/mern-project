import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import HelpsList from "./components/helps-list.component";
import EditHelp from "./components/edit-help.component";
import CreateHelp from "./components/create-help.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={HelpsList} />
      <Route path="/edit/:id" component={EditHelp} />
      <Route path="/create" component={CreateHelp} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
