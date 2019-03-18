import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
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
                  <Mutation
                    mutation={UPDATE_POST}
                    variables={{
                      id: post.id,
                      check: !post.check
                    }}
                    optimisticResponse={{
                      __typename: 'Mutation',
                      updatePost: {
                        __typename: 'Post',
                        check: !post.check
                      }
                    }}
                    update={(cache, { data: { updatePost } }) => {
                      const data = cache.readQuery({
                        query: POST_QUERY,
                        variables: {
                          id: post.id
                        }
                      });
                      data.post.check = updatePost.check;
                      cache.writeQuery({
                        query: POST_QUERY,
                        data: {
                          ...data,
                          post: data.post
                        }
                      });
                    }}
                  >
                    {updatePost => (
                      <input
                        onChange={updatePost}
                        type="checkbox"
                        checked={post.check}
                      />
                    )}
                  </Mutation>
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
      check
    }
    isEditMode @client
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($check: Boolean, $id: ID!) {
    updatePost(where: { id: $id }, data: { check: $check }) {
      check
    }
  }
`;
