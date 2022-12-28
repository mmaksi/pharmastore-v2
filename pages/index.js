import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

import { useEffect } from "react";
import axios from "axios";
import colors from "colors/safe";

export default function Home() {
  // Hooks
  useEffect(() => {
    async function getPostsOnLoad(params) {
      try {
        const response = await axios.get("/api/posts");
        console.log(colors.green(response));
      } catch (error) {
        console.error(
          colors.red("Error fetching data from pharmastore"),
          colors.red(error)
        );
      }
    }
    getPostsOnLoad();
  });

  return (
    <>
      <Head>
        <title>PHARMASTORE</title>
        <meta
          name="description"
          content="Online store to order drugs without the need of sales representatives."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>Hello world!</div>
      </main>
    </>
  );
}
