//
import { html, render } from 'preact';

// Initialize htm with Preact

function App(props) {
  return html`
    <h1>Helossdsddsd ${props.name}!</h1>
  `;
}

render(
  html`
    <${App} name="Wolrd" />
  `,
  document.querySelector('#preact-root')
);
