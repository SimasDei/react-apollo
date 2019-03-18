import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import UpdatePost from './UpdatePost';
import EditMode from './EditMode';

export class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query
        query={POST_QUERY}
        variables={{
          id: match.params.id
        }}
      >
        {({ data, loading }) => {
          if (loading) return 'Loading...';
          const { post, isEditMode } = data;
          return (
            <div>
              <EditMode isEditMode={isEditMode} />
              {!isEditMode ? (
                <section>
                  <h1>{post.title}</h1>
                  <p>{post.body}</p>
                </section>
              ) : (
                <section>
                  <h1>Edit Post</h1>
                  <UpdatePost post={post} />
                </section>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Post;

const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      body
    }
    isEditMode @client
  }
`;
