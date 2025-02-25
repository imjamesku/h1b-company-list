import React, { ReactNode } from "react";
import Drawer from "./Drawer";
import Head from "next/head";
import { makeStyles } from "@material-ui/core";

type Props = {
  children?: ReactNode;
  title?: string;
};

const useStyles = makeStyles({
  main: {
    maxWidth: "960px",
    margin: "100px auto",
  },
});

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{" "}
          |{" "}
          <Link href="/about">
            <a>About</a>
          </Link>{" "}
          |{" "}
          <Link href="/users">
            <a>Users List</a>
          </Link>{" "}
          | <a href="/api/users">Users API</a>
        </nav>
      </header> */}
      <Drawer />
      <main className={classes.main}>{children}</main>
      {/* <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer> */}
    </div>
  );
};

export default Layout;
