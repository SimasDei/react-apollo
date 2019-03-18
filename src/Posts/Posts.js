import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export class Posts extends Component {
  render() {
    return (
      <div>
        <Link to={'/post/new'} className="button">
          New Post
        </Link>
        <ul className="posts-list">
          <Query query={POSTS_QUERY}>
            {({ loading, data, fetchMore }) => {
              if (loading) return 'Loading...';
              const { posts } = data;
              return (
                <React.Fragment>
                  {posts.map(post => (
                    <li key={post.id}>
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() =>
                        fetchMore({
                          variables: {
                            skip: posts.length
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              posts: [...prev.posts, ...fetchMoreResult.posts]
                            });
                          }
                        })
                      }
                      className="button"
                    >
                      Load More
                    </button>
                  </li>
                </React.Fragment>
              );
            }}
          </Query>
        </ul>
      </div>
    );
  }
}

export default Posts;

const POSTS_QUERY = gql`
  query allPosts($skip: Int) {
    posts(orderBy: createdAt_DESC, first: 5, skip: $skip) {
      id
      title
      body
    }
  }
`;
