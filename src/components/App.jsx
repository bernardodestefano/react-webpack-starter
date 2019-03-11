import React from 'react';
import { hot } from 'react-hot-loader';
import logo from '../assets/images/react_logo.svg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <img src={logo} alt="react" />
        <h1>A simple webpack react boilerplate</h1>
        <h4>
          <span role="img" aria-label="made">
            👨‍💻
          </span>
          with
          <span role="img" aria-label="love">
            ❤️
          </span>
          by
          <a href="https://github.com/bernardodestefano">Bernardo de Stefano</a>
        </h4>
      </div>
    );
  }
}

export default hot(module)(App);
