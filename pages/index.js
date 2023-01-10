import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
require("colors");

export default function Home() {
  const router = useRouter();
  const userId = router.query.userId;
  console.log(userId);

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
