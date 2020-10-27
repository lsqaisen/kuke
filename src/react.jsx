import React from 'https://dev.jspm.io/react';
import ReactDOM from 'https://dev.jspm.io/react-dom';
import htm from 'https://dev.jspm.io/htm';

const e = React.createElement;
const html = htm.bind(e);

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return html`
        <div
          onClick=${() => this.setState({ liked: false })}
          style=${{
            height: '32px',
            padding: '0 16px',
            cursor: 'pointer',
            color: 'red',
          }}
        >
          You liked this.
        </div>
      `;
    }

    return html`
      <button
        onClick=${() => this.setState({ liked: true })}
        style=${{
          height: '32px',
          padding: '0 16px',
          cursor: 'pointer',
          color: 'red',
        }}
      >
        Likedsdfsdfsdfsdf
      </button>
    `;
  }
}

ReactDOM.render(e(LikeButton), document.querySelector('#react-root'));
