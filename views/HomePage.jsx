import Head from "next/head";
import styles from "./Homepage.module.scss";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
export default function HomePage() {
  const [summarizedText, setSummarizedText] = useState("");
  const [longText, setLongText] = useState("");
  const [summarizedTextStore, setSummarizedTextStore] = useState("");
  const [buttonText, setButtonText] = useState("Summarize");

  const [charLength, setCharLength] = useState(0);
  const [charLengthSelected, setCharLengthSelected] = useState(1);

  useEffect(() => {
    switch (charLengthSelected) {
      case 1:
        setCharLength(100);
        break;
      case 2:
        setCharLength(250);
        break;
      case 3:
        setCharLength(500);
        break;
    }
  }, [charLengthSelected]);

  const summarizeText = useDebouncedCallback(async () => {
    const res = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({
        charCount: charLength,
        longText: longText,
      }),
    });
    setButtonText("Summarize");
    // console.log(await res.json());
    const data = await res.json();
    if (res.status == 200) {
      setSummarizedText(data.summarizedText);
      setSummarizedTextStore(data.summarizedText);
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
        <title>Media Description Summarizer</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.mainFlexBox}>
          <p className={styles.title}>Media Description Summarizer</p>
          <div className={styles.lengthSelectorCont}>
            <div
              className={`${styles.stickyButton} ${
                charLengthSelected == 1 ? styles.pushedButton : ""
              }`}
              onClick={() => {
                setCharLengthSelected(1);
              }}
            >
              Short
            </div>
            <div
              className={`${styles.stickyButton} ${
                charLengthSelected == 2 ? styles.pushedButton : ""
              }`}
              onClick={() => {
                setCharLengthSelected(2);
              }}
            >
              Medium
            </div>

            <div
              className={`${styles.stickyButton} ${
                charLengthSelected == 3 ? styles.pushedButton : ""
              }`}
              onClick={() => {
                setCharLengthSelected(3);
              }}
            >
              Long
            </div>
          </div>

          <div className={styles.textBoxCont}>
            <textarea
              onChange={(e) => {
                setLongText(e.target.value);
              }}
              className={styles.textBox}
              value={longText}
              name=""
              id=""
              autoFocus={true}
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
