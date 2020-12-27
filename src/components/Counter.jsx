import React from "react";

function Counter(props) {
  return (
    <div class="setting-container">
      Bombs <span class="setting-field">{ props.remainingFlags }</span>
    </div>
  );
}

export default Counter;
