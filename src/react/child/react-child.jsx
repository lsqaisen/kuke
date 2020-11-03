import React from 'https://dev.jspm.io/react';
class Child extends React.Component {
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
        test
      </div>
    );
  }
}

export default Child;

console.log(43345);
