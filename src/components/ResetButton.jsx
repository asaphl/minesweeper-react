import React from 'react';

function ResetButton(props) {
  return (
    <div className="setting-container" onClick={() => {props.reset(props.boardSettings)}} >
      Reset <span className="reset-button">&nbsp;<span className="reset-arrow"></span></span>
    </div>
  );
}

export default ResetButton;