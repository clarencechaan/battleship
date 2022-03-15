const Ship = (length) => {
  let composition = [];

  // set up composition
  for (let i = 0; i < length; i++) {
    composition.push("O");
  }

  const hit = (pos) => {
    composition[pos] = "X";
  };

  const isSunk = () => {
    for (const c of composition) {
      if (c === "O") return false;
    }
    return true;
  };
  return { length, composition, hit, isSunk };
};

export default Ship;
