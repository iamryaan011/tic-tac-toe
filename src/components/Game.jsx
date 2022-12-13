//styles
import styles from "../styles/sass/Game.module.scss";

//hooks
import { useEffect, useState } from "react";

export default function Game() {
  const emptyArray = Array(9).fill("");

  const [board, setBoard] = useState(emptyArray);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    checkWinner();
  }, [board]);

  function handleClick(id) {
    if (board[id] != "") {
      return null;
    }

    setBoard(board.map((item, index) => (id === index ? player : item)));

    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }

  function checkWinner() {
    const waysToWinner = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[6], board[4], board[2]],
    ];

    waysToWinner.map((cells) => {
      if (cells.every((cell) => cell === "X")) {
        setWinner("X");

        setTimeout(() => {
          setBoard(emptyArray);

          window.location.reload();
        }, 1000);
      }

      if (cells.every((cell) => cell === "O")) {
        setWinner("O");
        
        setTimeout(() => {
          setBoard(emptyArray);

          window.location.reload();
        }, 1000);
      }
    });

    checkDraw();
  }

  function checkDraw() {
    if (board.every((item) => item != "")) {
      setTimeout(() => {
        setBoard(emptyArray);

        window.location.reload();
      }, 1000);

      setDraw(true);
    }
  }

  return (
    <section className={styles.Game}>
      <h1>Tic Tac Toe</h1>

      <article>
        {board.map((value, id) => (
          <button key={id} onClick={() => handleClick(id)}>
            {value}
          </button>
        ))}
      </article>

      <section>
        <span
          style={winner === null ? { display: "none" } : { display: "block" }}
        >
          {winner} venceu!
        </span>

        <p
          style={
            draw === true && winner === null
              ? { display: "block" }
              : { display: "none" }
          }
        >
          Draw!
        </p>
      </section>
    </section>
  );
}
