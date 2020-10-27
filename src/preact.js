//
import {
  html,
  render,
} from 'https://dev.jspm.io/htm/preact/standalone.module.js';

// Initialize htm with Preact

function App(props) {
  return html`
    <h1>Hellosdfasddd ${props.name}!</h1>
  `;
}

render(
  html`
    <${App} name="Woddsdfadfasdd" />
  `,
  document.querySelector('#preact-root')
);
