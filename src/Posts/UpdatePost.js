import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PostForm from './PostForm';

export class UpdatePost extends Component {
  render() {
    const { post } = this.props;
    return (
      <Mutation mutation={UPDATE_POST}>
        {updatePost => <PostForm onSubmit={updatePost} post={post} />}
      </Mutation>
    );
  }
}

export default UpdatePost;

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(
      where: { id: $id }
      data: { status: PUBLISHED, title: $title, body: $body }
    ) {
      title
      body
      id
    }
  }
`;
