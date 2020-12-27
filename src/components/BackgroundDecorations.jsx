import React, { Component } from 'react';
import Flower from './decorations/Flower';
import Grass from './decorations/Grass';

export default class BackgroundDecorations extends Component {

  constructor(props){
    super(props);
    this.state = {
      flowerCoords: this.createRandomCoordsArray(props.flowers),
      grassCoords: this.createRandomCoordsArray(props.grass)
    }
  }

  createRandomCoordsArray(num) {
    let coordinates = [];
    for (let i = 0; i < num; i++) {
      coordinates.push({
        top: Math.floor(Math.random() * window.innerHeight),
        left: Math.floor(Math.random() * window.innerWidth),
      });
    }
    return coordinates;
  }

  renderDecoration (element, coordArray) {
    const renderedDecoration = coordArray.map((coord) => {
      return <div className="decoration-container" style={ {...coord, position: 'absolute'} }>
        { element }
      </div>
    })
    return renderedDecoration;
  }

  render() {    
    const { flowerCoords, grassCoords } = this.state;
    
    return (
        <React.Fragment>
            { this.renderDecoration(<Flower />, flowerCoords) }
            { this.renderDecoration(<Grass />, grassCoords)}
        </React.Fragment>
    );
  }
}