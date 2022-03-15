import Gameboard from "./gameboard.js";

const Player = (name) => {
  let gameboard = Gameboard();

  return { name, gameboard };
};

export default Player;
