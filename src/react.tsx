import React from 'react';
import ReactDOM from 'react-dom';

const LikeButton = () => {
  const [liked, setState] = React.useState(false);
  return liked ? (
    <div
      onClick={() => setState({ liked: false })}
      style={{
        height: '32px',
        padding: '0 16px',
        cursor: 'pointer',
        color: 'red',
      }}
    >
      You likesdfsdfsdfd this.
    </div>
  ) : (
    <button
      onClick={() => setState({ liked: true })}
      style={{
        height: '32px',
        padding: '0 16px',
        cursor: 'pointer',
        color: 'red',
      }}
    >
      Likfssssds
    </button>
  );
};

ReactDOM.render(<LikeButton />, document.querySelector('#react-root'));
