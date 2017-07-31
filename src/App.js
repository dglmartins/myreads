import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import SearchBooks from './SearchBooks';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Route exact path="/search" render={() => (
          <SearchBooks />
        )}
      />
      </div>
    );
  }
}

export default App;
