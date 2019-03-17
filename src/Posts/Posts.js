import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export class Posts extends Component {
  render() {
    return (
      <ul>
        <Query query={POSTS_QUERY}>
          {({ loading, data }) => {
            if (loading) return 'Loading...';
            const { posts } = data;
            return posts.map(post => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>
                  <h3>{post.title}</h3>
                </Link>
              </li>
            ));
          }}
        </Query>
      </ul>
    );
  }
}

export default Posts;

const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      body
    }
  }
`;
