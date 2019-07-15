import React, { Component } from "react";
import "./App.css";
import axios from "axios";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";

class App extends Component {
  state = {
    users: [],
    loading: false
  };
  async componentDidMount() {
    try {
      this.setState({
        loading: true
      });
      const response = await axios.get(
        `https://api.github.com/users?client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({
        loading: false,
        users: response.data
      });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
