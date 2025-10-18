import "./styles.css";
import { React, useState, useEffect } from "react";
//TO-DO:
// ADD count that counts no of times user correctly
//submits the captcha
//if he fails, make the high score as current count
// reset the count
// save high score in local storage.

function CaptchaBox({ captcha }) {
  function generateStyle() {
    const colors = ["red", "blue", "green", "gray", "pink", "orange"];
    const rotation = Math.floor(Math.random() * (Math.random() * 31) - 15);
    const skew = Math.floor(Math.random() * (Math.random() * 31) - 5);
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
      display: "inline-block",
      color: color,
      transform: `rotate(${rotation}deg) skew(${skew}deg)`,
      fontSize: "24px",
      fontWeight: "bold",
    };
  }

  return (
    <div className="captcha-box">
      {captcha.split("").map((char, idx) => {
        return (
          <span key={idx} style={generateStyle()}>
            {char}
          </span>
        );
      })}
    </div>
  );
}

export default function App() {
  const [input, setInput] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  function generateCaptcha(length = 5) {
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const captcha = [];
    for (let i = 0; i < length; i++) {
      captcha.push(chars[Math.floor(Math.random() * chars.length)]);
    }
    return captcha.join("");
  }

  function reset() {
    setInput("");
    setMessage("");
    setCaptcha(generateCaptcha());
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsDisabled(true);
    setInput(e.target.value);
    if (!input) return;

    if (input === captcha) {
      setMessage("correct");
      setScore((prev) => prev + 1);
    } else {
      setMessage("Game Over!");
      setScore(0);
    }
    const timeoutId = setTimeout(() => {
      reset();
      setIsDisabled(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  return (
    <div className="App">
      <h2>Captcha Mania</h2>
      <h4>
        Score: <span>{score}</span>
      </h4>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <CaptchaBox captcha={captcha} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div>
            <button type="submit" disabled={isDisabled}>
              {isDisabled ? "please wait..." : "Submit"}
            </button>
            {/* <button onClick={reset}>Generate New</button> */}
          </div>
          {message &&
            (message === "correct" ? (
              <p className="message" style={{ background: "green" }}>
                {message}
              </p>
            ) : (
              <p className="message" style={{ background: "red" }}>
                {message}
              </p>
            ))}
        </form>
      </div>
    </div>
  );
}
