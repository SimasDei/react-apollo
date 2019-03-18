import React from 'react';
import ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const defaultState = {
  isEditMode: false
};

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage
}).then(() => {
  const client = new ApolloClient({
    cache,
    uri: 'https://api-euwest.graphcms.com/v1/cjtclucvu6cui01dnn66iwu4y/master',
    clientState: {
      defaults: defaultState,
      resolvers: {}
    }
  });

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});
