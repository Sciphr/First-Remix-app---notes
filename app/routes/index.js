import { Link } from '@remix-run/react';

import homeStyles from '../styles/home.css';

export default function Index() {
  return (
    <main id="content">
      <h1>A better way to keep track of notes</h1>
      <p>Try our early beta and never loose track of notes again!</p>
      <p id="cta">
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  );
}

export const links = () => [{ rel: 'stylesheet', href: homeStyles }];
