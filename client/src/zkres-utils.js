import { soliditySha3 } from "web3-utils";
import { ethers } from 'ethers';

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

const CONTRACT_INTERFACE = new ethers.utils.Interface([
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_creator",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_resolution",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_guessCommitment",
        "type": "bytes32"
      }
    ],
    "name": "commitGuess",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "guesser",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "resolution",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "guessCommitment",
        "type": "bytes32"
      }
    ],
    "name": "GuessCommitted",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_resolution",
        "type": "bytes32"
      }
    ],
    "name": "publishResolution",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "guesser",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "resolution",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "guessContent",
        "type": "string"
      }
    ],
    "name": "ResolutionGuessed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "resolution",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "ResolutionPublished",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_creator",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_resolution",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_guessContent",
        "type": "string"
      }
    ],
    "name": "revealGuess",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "_creator",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_resolution",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_guessContent",
        "type": "string"
      }
    ],
    "name": "checkGuess",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }
]);

const EVENT_TOPICS = {
  RESOLUTION_PUBLISHED: ethers.utils.id('ResolutionPublished(address,bytes32,uint256)'),
  GUESS_COMMITTED: ethers.utils.id('GuessCommitted(address,address,bytes32,bytes32)'),
  RESOLUTION_GUESSED: ethers.utils.id('ResolutionGuessed(address,address,bytes32,string)'),
};

const getPastEvents = async (provider, contract, topics = []) => {
  const logs = await provider.getLogs({
    fromBlock: 0,
    toBlock: "latest",
    address: contract,
    topics: topics,
  });

  return logs.map((log) => {
    CONTRACT_INTERFACE.parseLog(log);
  });
};

const getCommittedGuesses = async (provider, contract) => {
  return await getPastEvents(provider, contract,
    EVENT_TOPICS["GUESS_COMMITTED"]
  );
}

const getGuessedResolutions = async (provider, contract) => {
  return await getPastEvents(provider, contract,
    EVENT_TOPICS["RESOLUTION_GUESSED"]
  );
};

const getActiveResolutions = async (provider, contract) => {
  const guessed = await getGuessedResolutions(provider, contract);
  const resolutions = await getPastEvents(provider, contract,
    EVENT_TOPICS["RESOLUTION_PUBLISHED"]
  );

  return resolutions.filter((resolution) => {
    return !guessed.some((guess) => {
      return guess.values.creator === resolution.values.creator &&
        guess.values.resolution === resolution.values.resolution;
    });
  });
};

export {
  createResolution,
  createGuess,
  getCommittedGuesses,
  getGuessedResolutions,
  getActiveResolutions,
};
