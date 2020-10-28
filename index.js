import './src/index.js';
const ws = new WebSocket(`ws://0.0.0.0:8080`);

ws.addEventListener('open', function() {
  console.log(1, 'ws connected!');
});
ws.addEventListener('message', function(message) {
  var script = document.createElement('script');
  script.type = 'module';
  //Firefox, Opera, Chrome, Safari 3+
  script.onload = function() {
    console.log('Script loaded!');
  };
  // script.innerHTML = message.data;
  // script.src = `${message.data}?${new Date().getTime()}`;

  // script.innerHTML = message.data;
  script.innerHTML = `
    System.import('${
      message.data
    }?${new Date().getTime()}').then(v=>console.log(v))
  `;
  document.head.appendChild(script);
});
console.log(3333);
