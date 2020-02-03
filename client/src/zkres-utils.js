import { soliditySha3 } from "web3-utils";

const createResolution = (resolution, creator) => {
  return soliditySha3(
    { type: 'string', value: resolution },
    { type: 'address', value: creator },
  );
};

const createGuess = (guess, creator, guesser) => {
  return soliditySha3(
    { type: 'string', value: guess },
    { type: 'address', value: creator },
    { type: 'address', value: guesser },
  );
};

export {
  createResolution,
  createGuess,
};
