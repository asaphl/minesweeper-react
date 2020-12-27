import React from "react";
import Flag from "./decorations/Flag";
import Bomb from "./decorations/Bomb";

function Tile(props) {
  const { flagged, revealed, value } = props;

  const handleClick = () => {
    props.reveal(props.index);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    props.toggleFlag(props.index);
  };

  const tileClass = "tile" + (revealed ? " revealed" : "");
  let tileContent = "";
  if (revealed) {
    if (value < 0) tileContent = <Bomb />;
    if (value > 0) tileContent = value;
  }
  if (flagged) tileContent = <Flag />;

  const lineBreak = () => {
    if (props.lastInLine) return <br />;
  };

  return (
    <React.Fragment>
      <button
        className={ tileClass }
        onClick={ handleClick }
        onContextMenu={ handleRightClick }
      >
        <span>&nbsp;{ tileContent }</span>
      </button>
      {lineBreak()}
    </React.Fragment>
  );
}

export default Tile;
