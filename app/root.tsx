import { Outlet, Scripts, Links, Meta } from "react-router";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./app.css";

export default function App() {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
