import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    post: PropTypes.object
  };
  static defaultProps = {
    post: {},
    onSuccess: () => null
  };
  state = {
    id: this.props.post.id || '',
    title: this.props.post.title || '',
    body: this.props.post.body || ''
  };
  handleInput = e => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({ ...formData });
  };
  render() {
    const { onSubmit, onSuccess } = this.props;
    const { title, body, id } = this.state;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit({
            variables: {
              title,
              body,
              id
            }
          })
            .then(() => {
              onSuccess();
            })
            .catch(err => console.log(err));
        }}
      >
        <input
          onChange={this.handleInput}
          type="text"
          placeholder="title"
          value={title}
          name="title"
        />
        <textarea
          onChange={this.handleInput}
          name="body"
          cols="30"
          rows="10"
          placeholder="Body"
          value={body}
        />
        <button className="button">Submit</button>
      </form>
    );
  }
}

export default PostForm;
