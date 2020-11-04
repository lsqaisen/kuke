// import './src/index.js';
const ws = new WebSocket(`ws://0.0.0.0:8080`);

ws.addEventListener('open', function() {
  console.log(1, 'ws connected!');
});
ws.addEventListener('message', function(message) {
  console.log(3, 'ws connected!');
  fetch(message.data);
  // var script = document.createElement('script');
  // script.onload = function() {
  //   console.log('Script loaded!');
  //   document.head.remove(script);
  // };
  // script.innerHTML = `
  //   Babel.disableScriptTags();
  //   var script = document.createElement('script');
  //   script.type = 'text/babel';
  //   script.setAttribute('data-plugins', 'transform-modules-umd');
  //   script.setAttribute('data-presets', 'react');
  //   script.src = './src/react/child/react-child.jsx';
  //   document.querySelector('head').appendChild(script);

  //   // transform when you want to
  //   var script2 = document.createElement('script');
  //   script2.type = 'text/babel';
  //   script2.setAttribute('data-plugins', 'transform-modules-umd');
  //   script2.setAttribute('data-presets', 'react');
  //   script2.src = './src/react/child/index.jsx';
  //   document.querySelector('head').appendChild(script2);

  //   // transform when you want to
  //   var script3 = document.createElement('script');
  //   script3.type = 'text/babel';
  //   script3.setAttribute('data-plugins', "transform-modules-umd")
  //   script3.setAttribute('data-presets', "react")
  //   script3.src = "./src/react/react.jsx";
  //   document.querySelector('head').appendChild(script3)

  //   // transform when you want to

  //   Babel.transformScriptTags()
  // `;

  // document.body.appendChild(script);
});
console.log(3333);
