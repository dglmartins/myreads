import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Search from './Search';
import MyBooksList from './MyBooksList';

/**
* @description App component. Uses Route to call Search and MyBooksList components depending on path. App gets called in index.js to display App in root div.
*/

class App extends Component {

  render() {
    return (
      <div className="App">
        <Route exact path="/search" render={() => (
          <Search />
        )}/>
        <Route exact path="/" render={() => (
          <MyBooksList />
        )}/>
      </div>
    );
  }
}

export default App;
