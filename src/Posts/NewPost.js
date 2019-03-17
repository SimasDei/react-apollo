import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PostForm from './PostForm';

export class NewPost extends Component {
  render() {
    return (
      <div>
        <h3>Add New Post</h3>
        <Mutation mutation={NEW_POST}>
          {createPost => <PostForm onSubmit={createPost} />}
        </Mutation>
      </div>
    );
  }
}

export default NewPost;

const NEW_POST = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(data: { status: PUBLISHED, title: $title, body: $body }) {
      title
      body
      id
    }
  }
`;
