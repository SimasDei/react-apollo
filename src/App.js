import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import logo from './logo.svg';
import './App.css';
import Post from './Posts/Post';
import Posts from './Posts/Posts';

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
              <Switch>
                <Route path="/post/:id" component={Post} />
                <Route path="/posts" component={Posts} />
              </Switch>

              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
