import Head from "next/head";
import styles from "./Homepage.module.scss";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
export default function HomePage() {
  const [summarizedText, setSummarizedText] = useState("");
  const [longText, setLongText] = useState("");
  const [summarizedTextStore, setSummarizedTextStore] = useState("");
  const [buttonText, setButtonText] = useState("Summarize");
  const summarizeText = useDebouncedCallback(async () => {
    const res = await fetch("/api/summarize", {
      method: "POST",
      body: {
        text: summarizedText,
      },
    });
    setButtonText("Summarize");
    console.log(res);

    if (res.status == 200) {
      setSummarizedText(longText);
      setSummarizedTextStore(longText);
      return;
    } else {
      console.error("Failed to summarize text");
      setSummarizedText(`Failed to summarize text. Status Code: ${res.status}`);
      setTimeout(() => {
        setSummarizedText("Old Text: " + summarizedTextStore);
      }, 2000);
    }
  }, 300);
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

            <div
              onClick={() => {
                summarizeText();
                setButtonText("Summarizing...");
              }}
              className={styles.convertButton}
            >
              {buttonText}
            </div>

            <textarea
              className={styles.textBox}
              name=""
              id=""
              readOnly
              value={summarizedText}
            ></textarea>
          </div>
        </div>
      </main>
    </>
  );
}
