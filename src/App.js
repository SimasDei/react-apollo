import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './App.css';
import Post from './Posts/Post';
import Posts from './Posts/Posts';
import NewPost from './Posts/NewPost';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to={'/'}>
              <h4>Home</h4>
            </Link>
          </header>

          <main>
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route exact path="/post/new" component={NewPost} />
              <Route path="/post/:id" component={Post} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
