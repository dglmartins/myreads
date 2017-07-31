import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Search from './Search';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Route exact path="/search" render={() => (
          <Search />
        )}
      />
      </div>
    );
  }
}

export default App;
