import React, { Component } from "react";
import Tile from "./Tile";
import { createBoard, getNumberOfTilesWithoutBombs, reveal } from "../utils/BoardFunctions";
import { mergeUnique, findAllIndexes, excludeExceptions, populateArrayWithIndexes } from "../utils/arrayFunctions";
import { compareFlagsAndBombs, getImplicitFlagList, updateFlagList } from "../utils/flaggingFunctions";
import STATUS from "../constants/GameStatus";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: createBoard(props.boardSettings),
      revealed: [],
      flags: []
    };
    this.revealTile = this.revealTile.bind(this);
    this.toggleFlag = this.toggleFlag.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.boardSettings !== this.props.boardSettings || prevProps.gameCounter !== this.props.gameCounter) {
      const newState = {
        revealed: [],
        flags: [],
        board: createBoard(this.props.boardSettings),
      };
      this.setState(newState);
    }
  }

  revealTile(tileIndex) {
    const { revealed, board, flags } = this.state, { boardSettings } = this.props;
    const exceptions = revealed.concat(flags);
    if (exceptions.includes(tileIndex)) return;
    if (board[tileIndex] === -1) {
      this.props.endGame(STATUS.LOSE);
      return;
    }
    const reveals = reveal(tileIndex, board, boardSettings);  
    const shouldReveal = excludeExceptions(reveals, exceptions);
    const newRevealed = mergeUnique(revealed, shouldReveal);
    this.setState({
      revealed: newRevealed
    });
  }
  
  revealAll() {
    const { board } = this.state;
    const all = populateArrayWithIndexes(board.length);
    this.setState({ revealed: all });
  }

  toggleFlag(flagIndex) {
    const { bombs, status } = this.props, { flags, revealed } = this.state;
    if ((status !== STATUS.PLAY || revealed.includes(flagIndex)) || (flags.length === bombs && !flags.includes(flagIndex))) return;
    const newFlagList = updateFlagList(flagIndex, flags);
    this.props.updateCounter(newFlagList.length);
    this.setState({ flags: newFlagList });
  }

  checkForWin() {
    const { boardSettings } = this.props, { board, flags, revealed } = this.state;
    const numberOfTilesWithoutBombs = getNumberOfTilesWithoutBombs(boardSettings);
    if (revealed.length === numberOfTilesWithoutBombs || flags.length === boardSettings.bombs) {
      const flagList = (flags.length === boardSettings.bombs) ? flags : getImplicitFlagList(revealed, board.length);
      const bombList = findAllIndexes(board, -1);
      return compareFlagsAndBombs(flagList, bombList);
    }
    return false;
  }

  render() {
    const { status, boardSettings } = this.props, { board, flags, revealed } = this.state;

    if (status === STATUS.PLAY) {
      if (this.checkForWin()) this.props.endGame(STATUS.WIN);
    } else {
      if (revealed.length !== board.length) this.revealAll();
    }
    const boardTiles = board.map((tileValue, tileIndex) => {
      return (
        <Tile
          key={tileIndex}
          index={tileIndex}
          value={tileValue}
          revealed={revealed.includes(tileIndex)}
          flagged={flags.includes(tileIndex)}
          reveal={this.revealTile}
          toggleFlag={this.toggleFlag}
          lastInLine={(tileIndex + 1) % boardSettings.cols === 0}
        />
      );
    });

    return <div className="board">{boardTiles}</div>;
  }
}