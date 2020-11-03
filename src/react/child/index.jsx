import React from 'https://dev.jspm.io/react';
import C from './react-child.jsx';
class Child_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return (
      <div
        style={{
          height: '32px',
          padding: '0 16px',
          cursor: 'pointer',
          color: 'red',
        }}
      >
        <C />
      </div>
    );
  }
}

export default Child_;

// console.log(43345);

export default () => 'sdfsdfsdfsf';
