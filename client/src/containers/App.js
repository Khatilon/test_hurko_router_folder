import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, HashRouter, Switch, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Users from '../components/users/Users';
import User from '../components/users/User';
import Search from '../components/users/Search';
import Alert from '../components/layout/Alert';
import About from '../components/pages/About';
import axios from 'axios';
import './App.css'

class App extends Component {

  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
    checkAPI: null
  }
  // https://docs.github.com/en/rest/overview/endpoints-available-for-github-apps

  // search github user
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.GITHUB_CLIENT_ID}&client_secret=
    ${process.env.GITHUB_CLIENT_SECRET}`);

    if (res) {
      // console.log(res);
      this.setState({
        loading: false,
        users: res.data.items
      });
    }
    const res2 = await axios.get(`/testroute/${text}`);

    console.log('res2', res2);
    this.setState({checkAPI: res2.data});
  }

  // Get single Github user

  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
    ${process.env.GITHUB_CLIENT_ID}&client_secret=
    ${process.env.GITHUB_CLIENT_SECRET}`);

    if (res) {
      // console.log(res);
      this.setState({
        loading: false,
        user: res.data
      });
    }
  };

  // Get user repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.GITHUB_CLIENT_ID}&client_secret=
    ${process.env.GITHUB_CLIENT_SECRET}`);

    if (res) {
      // console.log(res);
      this.setState({
        loading: false,
        repos: res.data
      });
    }
  };
  // clear user 
  clearUsers = () => this.setState({ users: [], loading: false });

  // set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({alert: null});
    }, 2000);
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
    this.setState({checkAPI: res2.data});
  }
  
  render() {
      const { users, loading, alert, user, repos, checkAPI } = this.state;

      return (
          <>
            {/* router?????????ep.21 */}
            <HashRouter>
              {/* 
                ??????create-app??????????????????BrowserRouter?????????(???????????????????????????), ????????????????????????BrowserRouter
                ????????????link?????????route???????????????????????????, ??????link????????????history??????, ??????????????????...

                ???react router??????????????????????????????????????????<a href="/">?????????<Link to="/">????????? 
                ???????????????????????????render?????????(???????????????????????????, ?????????????????????????????????????????????????????????, ?????????link???????????????????????????)

                ??????user.js????????? ?????????????????????????????? ?????????HashRouter?????????
              */}
              <div className="app">
                <Navbar />
                <div className="container">
                    {checkAPI && checkAPI.name}
                    <Alert alert={alert}/>
                    <Switch>
                      <Route exact path='/' render={(props) => (
                        <Fragment>
                          <Search
                            searchUsers={this.searchUsers}
                            clearUsers={this.clearUsers}
                            showClear={users.length > 0}
                            setAlert={this.setAlert}
                          />
                          <Users
                            loading={loading}
                            users={users}
                          />
                        </Fragment>
                      )} />
                    </Switch>
                    <Route path='/about' component={About} />
                    {/* ????????????props user state???getUser???function, ...props??????history??????????????? */}
                    <Route path="/user" render={(props) => (
                      <User
                        {...props}
                        getUser={this.getUser}
                        getUserRepos={this.getUserRepos}
                        user={user}
                        repos={repos}
                        loading={loading}
                      />
                    )}/>
                </div>
              </div>
            </HashRouter>
          </>
      )
  }
}

export default App;