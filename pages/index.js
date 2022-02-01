import Head from "next/head";
import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";
import { Colors } from "./Colors.js";

export default function Home({ articles }) {
  const [color, setColor] = useState("#16a085");
  const [quote, setQuote] = useState(
    "I don't act, I don't direct, I don't design."
  );
  const [author, setAuthor] = useState("Tom Stoppard");

  const changeColor = () => {
    const randomNum = Math.floor(Math.random() * articles.length);
    const randomQuote = articles[randomNum].text;
    const randomAuthor = articles[randomNum].author;
    const randomColor = Math.floor(Math.random() * 12);
    setColor(Colors[randomColor]);
    setQuote(randomQuote);
    setAuthor(randomAuthor);
  };

  return (
    <main>
      <Head>
        <title>Random Quotes</title>
      </Head>
      <article className={styles.container} id="qoute-box">
        <div className={styles.textBox}>
          <h3 id="text">{quote}</h3>
          <div className={styles.author}>
            <p id="author">- {author}</p>
          </div>
        </div>
        <div>
          <button className={styles.btn} id="new-quote" onClick={changeColor}>
            New Quotes
          </button>
        </div>
      </article>

      <style jsx global>
        {`
          html,
          body {
            background-color: ${color};
          }
          #qoute-box {
            color: ${color};
          }
          #new-quote {
            color: white;
            background-color: ${color};
          }
        `}
      </style>
    </main>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    "https://famous-quotes4.p.rapidapi.com/random?category=all&count=50",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "famous-quotes4.p.rapidapi.com",
        "x-rapidapi-key": "b725d5c668msh14de3bd1514c35ap191153jsn99807a3e0d38",
      },
    }
  );
  const articles = await res.json();
  return {
    props: {
      articles,
    },
  };
};
