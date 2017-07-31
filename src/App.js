import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Search from './Search';
import MyBooksList from './MyBooksList';

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
