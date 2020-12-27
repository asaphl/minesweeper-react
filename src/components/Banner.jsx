import React from "react";
import STATUS from "../constants/GameStatus";

function Banner(props) {
  const { status } = props;
  const gameStatus =
    status === STATUS.PLAY ? (
      <React.Fragment />
    ) : status === STATUS.WIN ? (
      <h1>Congratualtions! You Won!</h1>
    ) : (
      <h1>Game Over :(</h1>
    );
  return <div class="banner-status">{gameStatus}</div>;
}

export default Banner;
