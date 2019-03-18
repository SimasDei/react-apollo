import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';

export class EditMode extends Component {
  render() {
    const { isEditMode } = this.props;
    return (
      <ApolloConsumer>
        {client => (
          <button
            onClick={() =>
              client.writeData({ data: { isEditMode: !isEditMode } })
            }
            className="button"
          >
            Toggle Edit Mode
          </button>
        )}
      </ApolloConsumer>
    );
  }
}

export default EditMode;
