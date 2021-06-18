import React, { Component } from 'react';
import {HashRouter, BrowserRouter, Route, Switch} from 'react-router-dom';    
import Mainpage from './Mainpage';
import Navbar from '../components/layout/Navbar';
import Users from '../components/users/Users';
import axios from 'axios';
import './App.css'

class App extends Component {

  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {

    this.setState({
      loading: true
    });

    const res = await axios.get(`https://api.github.com/users?client_id=
    ${process.env.GITHUB_CLIENT_ID}&client_secret=
    ${process.env.GITHUB_CLIENT_SECRET}`);

    if (res) {
      this.setState({
        loading: false,
        users: res.data
      });
    }

    const res2 = await axios.get('/hello');

    console.log('res2', res2);
  }
  
  render() {
      const name = 'Ray';
      const sampleFunction = () => "Yo";

      return (
          <>
            {/* 以目前後端的設定這邊可以使用 BrowserRouter, 但要打包後, 開啟server.js才會有作用 */}
            <HashRouter>
              <Switch>
                <Route path='/about' component={Mainpage} />
                <Route exact path='/' component={() => (
                  <div className="app">
                    <Navbar />
                    <div className="container">
                      <Users
                        loading={this.state.loading}
                        users={this.state.users}
                      />
                    </div>   
                </div>
                )} />
              </Switch>
            </HashRouter>
          </>
      )
  }
}

export default App;