import C from './react-child.jsx';
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
        sdfsd
        <C />
      </div>
    );
  }
}

export default Child;

// console.log(43345);
