import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import Main from './components/Main/Main';
import MainUseHooks from './components/Main/MainUseHooks';

export default function App() {
  /* return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  ); */

  return (
    <Provider store={store}>
      {/* <Main /> */}
      <MainUseHooks />
    </Provider>
  )
}
