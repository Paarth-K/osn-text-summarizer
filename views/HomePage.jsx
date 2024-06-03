import Head from "next/head";
import styles from "./Homepage.module.scss";
import { useState } from "react";

export default function HomePage() {
  const [summarizedText, setSummarizeText] = useState("");
  const [longText, setLongText] = useState("");
  const [summarizedTextStore, setSummarizedTextStore] = useState("");
  async function summarizeText() {
    const res = fetch("/api/summarize", {
      method: "POST",
      body: {
        text: summarizedText,
      },
    });
    return "";
  }
  return (
    <>
      <Head>
        <title>Text Summarizer</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.mainFlexBox}>
          <p className={styles.title}>Text Summarizer</p>
          <div className={styles.textBoxCont}>
            <textarea
              onChange={(e) => {
                setLongText(e.target.value);
              }}
              className={styles.textBox}
              value={longText}
              name=""
              id=""
            ></textarea>

            <div className={styles.convertButton}>Summarize</div>

            <textarea className={styles.textBox} name="" id=""></textarea>
          </div>
        </div>
      </main>
    </>
  );
}
