import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import MainUseHooks from './components/Main/MainUseHooks';

export default function App() {
  return (
    <Provider store={store}>
      <MainUseHooks />
    </Provider>
  )
}
