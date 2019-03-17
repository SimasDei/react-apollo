import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    post: PropTypes.object
  };
  static defaultProps = {
    post: {}
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
    const { onSubmit } = this.props;
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
              this.setState({
                title: '',
                body: '',
                id: ''
              });
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
