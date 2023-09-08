"use client";

import React from "react";
import "./globals.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Layout = (props) => {
  const router = useRouter();

  const logout = async () => {
    await fetch("http://localhost:8000/api/logout/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    router.push("/login");
  };

  let menu;

  if (!props.auth) {
    menu = (
      <>
        <div className="navbar-end">
          <a href="/login" className="btn">
            Login
          </a>
          <a href="/register" className="btn">
            Register
          </a>
        </div>
      </>
    );
  } else {
    menu = (
      <>
        <div className="navbar-end">
          <a href="/addplant" className="btn">
            Add Plant
          </a>
          <a href="/" className="btn" onClick={logout}>
            Logout
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <html>
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
            crossOrigin="anonymous"
          />
          <script src="https://cdn.jsdelivr.net/npm/chart.js" async></script>
        </Head>
        <body className="bg-blue-50 w-full">
          <div className="navbar bg-base-100 w-full bg-gray-200">
            <div className="navbar-start">
              <a href="/" className="btn btn-ghost normal-case text-xl">
                Home
              </a>
            </div>
            {menu}
          </div>

          <main>{props.children}</main>
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
            async
          ></script>
        </body>
      </html>
    </>
  );
};

export default Layout;
