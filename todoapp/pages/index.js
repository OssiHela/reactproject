//import Head from "next/head";
//import styles from "../styles/Home.module.css";
//import { useEffect, useState } from "react";
//import Spinner from "react-bootstrap/Spinner";
import TodoList from "../components/TodoList";

function Home() {
  return (
    <div className="content">
      <TodoList />
    </div>
  );
}

export default Home;
