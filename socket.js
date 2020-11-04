// import './src/index.js';
const ws = new WebSocket(`ws://0.0.0.0:8080`);

ws.addEventListener('open', function() {
  console.log(1, 'ws connected!');
});
ws.addEventListener('message', function(message) {
  console.log(3, message.data);
  [...document.head.getElementsByTagName('script')].forEach((v) => {
    console.log(v.src, v.type);
    if (!v.type || v.src.includes(message.data.replace(/^\.\//, '/'))) {
      v.remove();
    }
  });
  Babel.disableScriptTags();
  var script = document.createElement('script');
  script.type = 'text/babel';
  script.setAttribute('data-plugins', 'transform-modules-umd');
  script.setAttribute('data-presets', 'react');
  script.src = message.data;
  document.querySelector('head').appendChild(script);
  // var script = document.createElement('script');
  // script.type = 'text/babel';
  // script.setAttribute('data-plugins', 'transform-modules-umd');
  // script.setAttribute('data-presets', 'react');
  // script.src = './index.js';
  // document.querySelector('head').appendChild(script);
  Babel.transformScriptTags();
});
