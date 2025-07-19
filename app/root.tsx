import { Links, Meta, Outlet, Scripts } from 'react-router';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { Providers } from './providers';
import './app.css';

export default function App() {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <Providers>
          <Header />
          <Outlet />
          <Footer />
        </Providers>
        <Scripts />
      </body>
    </html>
  );
}
