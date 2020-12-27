import React, { Component } from "react";
import STATUS from "../constants/GameStatus";

export default class Timer extends Component {

  constructor(props){
    super(props);
    this.state = {
      time: 0
    }
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps){
    if (prevProps.status === this.props.status) return;
    if (this.props.status === STATUS.PLAY) this.startTimer();
    if (this.props.status !== STATUS.PLAY) this.stopTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.setState({ time: 0 });
    this.timerID = setInterval(() => this.updateTimer(), 1000);
  }

  updateTimer() {
    const { time } = this.state;
    this.setState({
      time: time + 1,
    });
  }

  stopTimer() {
    clearInterval(this.timerID);
  }

  formatTime(secondsPassed) {
    var minutes = Math.floor(secondsPassed / 60);
    var seconds = secondsPassed - minutes * 60;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + " : " + seconds;
  };

  render() {
    return (
      <div className="setting-container">
        Time: <span className="setting-field">{ this.formatTime(this.state.time) }</span>
      </div>
    );
  }
}
