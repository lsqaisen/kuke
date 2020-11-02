import React from 'https://dev.jspm.io/react';
import ReactDOM from 'https://dev.jspm.io/react-dom';
import htm from 'https://dev.jspm.io/htm';

const e = React.createElement;
const html = htm.bind(e);

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return html`
      <div
        style=${{
          height: '32px',
          padding: '0 16px',
          cursor: 'pointer',
          color: 'red',
        }}
      >
        testsss
      </div>
    `;
  }
}

export default Child;

console.log(43345);
