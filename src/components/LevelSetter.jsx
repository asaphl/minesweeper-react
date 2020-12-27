import React from 'react';

function LevelSetter(props) {

    const handleClick = (level) => {
        props.setLevel(level);
    };

    return (
        <div class="setting-container">
        Level &nbsp; 
            <div class="dropdown">
            <span className="dropdown-selected">{ props.chosenLevel.level }</span>
              <ul className="dropdown-content">
                { props.levels.map((level) => <li onClick = { handleClick.bind(this, level) }>{ level.level }</li>) }
              </ul>
            </div>
        </div>
    );
}

export default LevelSetter;