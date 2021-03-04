// defines the initial "database"
const db = {
  // [0-2]
  currentPageNum: 0,
  // [0-5]
  scannerCooldownRemainingSeconds: 0,
  // [0-3]
  scannerUseRemainingSeconds: 0,
  sprayIsSelected: false,
  sprayIsActive: false,
  handSoapIsSelected: false,
  handSoapIsActive: false,
  faceMaskIsSelected: false,
  faceMaskIsActive: false,
  levelOneNumGerms: 3,
  germLocations0X: 0,
  germLocations0Y: 0,
  germLocations0IsAlive: false,
  germLocations0IsActive: false,
  germLocations1X: 0,
  germLocations1Y: 0,
  germLocations1IsAlive: false,
  germLocations1IsActive: false,
  germLocations2X: 0,
  germLocations2Y: 0,
  germLocations2IsAlive: false,
  germLocations2IsActive: false,
  germLocations3X: 0,
  germLocations3Y: 0,
  germLocations3IsAlive: false,
  germLocations3IsActive: false,
  germLocations4X: 0,
  germLocations4Y: 0,
  germLocations4IsAlive: false,
  germLocations4IsActive: false,
};

export default db;
