import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import logo from './logo.svg';
import './App.css';
import Post from './Posts/Post';
import Posts from './Posts/Posts';
import NewPost from './Posts/NewPost';

const client = new ApolloClient({
  uri: 'https://api-euwest.graphcms.com/v1/cjtclucvu6cui01dnn66iwu4y/master'
});

// client
//   .query({
//     query: testQuery
//   })
//   .then(res => console.log(res));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <Link to={'/'}>
                <h4>Home</h4>
              </Link>
              <Link to={'/post/new'}>New Post</Link>
              <Switch>
                <Route exact path="/" component={Posts} />
                <Route exact path="/post/new" component={NewPost} />
                <Route path="/post/:id" component={Post} />
              </Switch>
            </header>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
