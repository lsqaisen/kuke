//
import {
  html,
  render,
} from 'https://dev.jspm.io/htm/preact/standalone.module.js';

// Initialize htm with Preact

function App(props) {
  return html`
    <h1>Hello ${props.name}!</h1>
  `;
}

render(
  html`
    <${App} name="Wolrd" />
  `,
  document.querySelector('#preact-root')
);
