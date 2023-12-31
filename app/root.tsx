import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ReactNode } from 'react';
import globalStylesUrl from '~/styles/global.css'

export const links: LinksFunction = () => [{ rel: "stylesheet", href: globalStylesUrl }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function Layout({ children }: { children?: ReactNode }) {
  return (<>
    <nav className="navbar">
      <Link to='/'>
        Cost Per Wear
      </Link>
      <ul>
        <li>
          <Link to='/clothing-items'>Wardrobe</Link>
        </li>
      </ul>
    </nav>
    <main>{children}</main>
  </>)
}
