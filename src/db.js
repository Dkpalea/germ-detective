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
  levelOneNumGerms: 5,
  // chair 1 top
  germLocations0Left: 285,
  germLocations0Top: 340,
  germLocations0IsAlive: false,
  germLocations0IsActive: false,
  // desk 1 center
  germLocations1Left: 250,
  germLocations1Top: 305,
  germLocations1IsAlive: false,
  germLocations1IsActive: false,
  // chair 2 top
  germLocations2Left: 485,
  germLocations2Top: 340,
  germLocations2IsAlive: false,
  germLocations2IsActive: false,
  // chalkboard
  germLocations3Left: 545,
  germLocations3Top: 240,
  germLocations3IsAlive: false,
  germLocations3IsActive: false,
  // chair 3 top
  germLocations4Left: 685,
  germLocations4Top: 340,
  germLocations4IsAlive: false,
  germLocations4IsActive: false,
  // desk 3 center
  germLocations5Left: 625,
  germLocations5Top: 310,
  germLocations5IsAlive: false,
  germLocations5IsActive: false,
  // trash can
  germLocations6Left: 825,
  germLocations6Top: 305,
  germLocations6IsAlive: false,
  germLocations6IsActive: false,
  // floor
  germLocations7Left: 920,
  germLocations7Top: 400,
  germLocations7IsAlive: false,
  germLocations7IsActive: false,
  // drawer handle right
  germLocations8Left: 925,
  germLocations8Top: 255,
  germLocations8IsAlive: false,
  germLocations8IsActive: false,
  // books on shelf
  germLocations9Left: 30,
  germLocations9Top: 200,
  germLocations9IsAlive: false,
  germLocations9IsActive: false,
  // student 1 germs
  // LH
  germLocations10Left: 55,
  germLocations10Top: 385,
  germLocations10IsAlive: false,
  germLocations10IsActive: false,
  // RH
  germLocations11Left: 125,
  germLocations11Top: 385,
  germLocations11IsAlive: false,
  germLocations11IsActive: false,
  // student 2 germs
  // LH
  germLocations12Left: 350,
  germLocations12Top: 340,
  germLocations12IsAlive: false,
  germLocations12IsActive: false,
  // RH
  germLocations13Left: 420,
  germLocations13Top: 340,
  germLocations13IsAlive: false,
  germLocations13IsActive: false,
  // student 3 germs
  // LH
  germLocations14Left: 725,
  germLocations14Top: 385,
  germLocations14IsAlive: false,
  germLocations14IsActive: false,
  // RH
  germLocations15Left: 795,
  germLocations15Top: 385,
  germLocations15IsAlive: false,
  germLocations15IsActive: false,
};

export default db;
