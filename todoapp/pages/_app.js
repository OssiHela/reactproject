import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import Link from "next/link";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <div className="header">
        <h1>To-Do List</h1>
      </div>
      <div className="nav">
        <div className="navLink" id={router.pathname == "/" ? "active" : ""}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        <div
          className="navLink"
          id={router.pathname == "/info" ? "active" : ""}
        >
          <Link href="/info">
            <a>Info</a>
          </Link>
        </div>
        <div
          className="navLink"
          id={router.pathname == "/extra" ? "active" : ""}
        >
          <Link href="/extra">
            <a>Extra</a>
          </Link>
        </div>
      </div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
