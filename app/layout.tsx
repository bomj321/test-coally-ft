"use client";

import { PrimeReactProvider } from "primereact/api";
import Providers from "@components/Providers";
import { Provider } from "react-redux";
import { store } from "@store/store";

import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

import "primereact/resources/themes/tailwind-light/theme.css";

import "./custom.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrimeReactProvider>
      <Provider store={store}>
        <Providers>
          <html lang="en">
            <body>{children}</body>
          </html>
        </Providers>
      </Provider>
    </PrimeReactProvider>
  );
}
