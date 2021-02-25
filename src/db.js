// defines the initial "database"
const db = {
  currentPageNum: {
    // [0-2]
    number: 0,
  },
  tools: {
    scanner: {
      // [0-5]
      cooldownRemainingSeconds: 0,
      // [0-3]
      useRemainingSeconds: 0,
    },
    spray: {
      isSelected: false,
      isActive: false,
    },
    handSoap: {
      isSelected: false,
      isActive: false,
    },
    faceMask: {
      isSelected: false,
      isActive: false,
    }
  },
  levelOne: {
    numGerms: 3,
    germLocations: [
      {
        x: 0,
        y: 0,
        isAlive: false,
        isActive: false,
      },
      {
        x: 0,
        y: 0,
        isAlive: false,
        isActive: false,
      },
      {
        x: 0,
        y: 0,
        isAlive: false,
        isActive: false,
      },
      {
        x: 0,
        y: 0,
        isAlive: false,
        isActive: false,
      },
      {
        x: 0,
        y: 0,
        isAlive: false,
        isActive: false,
      },
    ],
  }
};

export default db;
