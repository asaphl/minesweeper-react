export function compareFlagsAndBombs(flagsArr, bombsArr) {
  const sortedFlags = flagsArr.sort(), sortedBombs = bombsArr.sort();
  let arraysMatch = true;
  sortedFlags.forEach((flag, index) => {
    arraysMatch *= (flag === sortedBombs[index]);
  })
  return arraysMatch;
}

export function getImplicitFlagList(revealed, boardLength) {
  let implicitFlagList = [];
  for ( let i = 0; i < boardLength; i++ ) {
    if (revealed.indexOf(i) === -1) implicitFlagList.push(i);
  }
  return implicitFlagList;
}

export function updateFlagList(flagIndex, flagsArr) {
  return flagsArr.includes(flagIndex) ? 
      flagsArr.filter((flaggedIndex) => !(flaggedIndex === flagIndex)) :
      [...flagsArr, flagIndex];
}