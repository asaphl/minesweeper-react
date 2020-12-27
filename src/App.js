import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board";
import Timer from "./components/Timer";
import Counter from "./components/Counter";
import LevelSetter from "./components/LevelSetter";
import Banner from "./components/Banner";
import BackgroundDecorations from "./components/BackgroundDecorations";
import BOARD_SETTINGS from './constants/BoardSettings';
import STATUS from './constants/GameStatus';
import ResetButton from "./components/ResetButton";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: STATUS.PLAY,
      boardSettings: BOARD_SETTINGS.EASY,
      flagCounter: BOARD_SETTINGS.EASY.bombs,
      gameCounter: 1
    }
    this.updateFlagCounter = this.updateFlagCounter.bind(this);
    this.setLevel = this.setLevel.bind(this);
    this.setStatus = this.setStatus.bind(this);
  }

  updateFlagCounter(count) {
    this.setState({ flagCounter: this.state.boardSettings.bombs - count });
  }

  setStatus(newStatus) {
    this.setState({ status: newStatus });
  }

  setLevel(chosenLevel) {
    this.setState( {
      boardSettings: chosenLevel,
      status: STATUS.PLAY,
      flagCounter: chosenLevel.bombs,
      gameCounter: this.state.gameCounter+1
    } );
  }

  render() {
    const {
      flagCounter,
      boardSettings,
      status,
      gameCounter
    } = this.state;


    return (
      <div className="main">
        <BackgroundDecorations flowers={100} grass={50} />
        <Banner status={status} />
        <div className="settings">
          <Timer status={status} />
          <Counter remainingFlags={flagCounter} />
          <ResetButton boardSettings={boardSettings} reset={this.setLevel} />
          <LevelSetter
            levels={Object.values(BOARD_SETTINGS)}
            chosenLevel={boardSettings}
            setLevel={this.setLevel}
          />
        </div>
        <Board
          endGame={this.setStatus}
          updateCounter={this.updateFlagCounter}
          status={status}
          boardSettings={boardSettings}
          gameCounter={gameCounter}
        />  
      </div>
    );
  }
}
