import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';

import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'https://api-euwest.graphcms.com/v1/cjtclucvu6cui01dnn66iwu4y/master'
});

const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      body
    }
  }
`;

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
                <Route>
                  <Query query={POSTS_QUERY}>
                    {({ loading, data }) => {
                      if (loading) return 'Loading...';
                      const { posts } = data;
                      return posts.map(post => (
                        <h1 key={post.id}>{post.title}</h1>
                      ));
                    }}
                  </Query>
                </Route>
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
