// import React from 'https://unpkg.com/react@16/umd/react.development.js';
// import ReactDOM from 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

import Child from './child/index.jsx';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return this.state.liked ? (
      <div
        onClick={() => this.setState({ liked: false })}
        style={{
          height: '32px',
          padding: '0 16px',
          cursor: 'pointer',
          color: 'red',
        }}
      >
        You liked this.sd
      </div>
    ) : (
      <button
        onClick={() => this.setState({ liked: true })}
        style={{
          height: '32px',
          padding: '0 16px',
          cursor: 'pointer',
          color: 'red',
        }}
      >
        <Child />
        <div>xxdsdsdfdfssf</div>
      </button>
    );
  }
}

ReactDOM.render(<LikeButton />, document.querySelector('#react-root'));
export default LikeButton;

// console.log(234);
