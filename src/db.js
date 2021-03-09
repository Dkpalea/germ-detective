// defines the initial "database"
const db = {
  // [0-2]
  currentPageNum: 0,
  // [0-5]
  scannerCooldownRemainingSeconds: 0,
  // [0-3]
  scannerUseRemainingSeconds: 0,
  sprayTopIsSelected: false,
  sprayTopIsActive: false,
  handSoapIsSelected: false,
  handSoapIsActive: false,
  faceMaskIsSelected: false,
  faceMaskIsActive: false,
  levelOneNumGerms: 5,
  // chair 1 top
  germLocations0Left: 285,
  germLocations0Top: 340,
  germLocations0IsAlive: false,
  germLocations0IsActive: true,
  // desk 1 center
  germLocations1Left: 250,
  germLocations1Top: 305,
  germLocations1IsAlive: false,
  germLocations1IsActive: true,
  // chair 2 top
  germLocations2Left: 485,
  germLocations2Top: 340,
  germLocations2IsAlive: false,
  germLocations2IsActive: true,
  // desk 2 center
  germLocations3Left: 545,
  germLocations3Top: 240,
  germLocations3IsAlive: false,
  germLocations3IsActive: true,
  // chair 3 top
  germLocations4Left: 685,
  germLocations4Top: 340,
  germLocations4IsAlive: false,
  germLocations4IsActive: true,
  // desk 3 center
  germLocations5Left: 625,
  germLocations5Top: 310,
  germLocations5IsAlive: false,
  germLocations5IsActive: true,
  // trash can
  germLocations6Left: 825,
  germLocations6Top: 305,
  germLocations6IsAlive: false,
  germLocations6IsActive: true,
  // drawer handle left
  germLocations7Left: 920,
  germLocations7Top: 400,
  germLocations7IsAlive: false,
  germLocations7IsActive: true,
  // drawer handle right
  germLocations8Left: 925,
  germLocations8Top: 255,
  germLocations8IsAlive: false,
  germLocations8IsActive: true,
  // books on shelf
  germLocations9Left: 30,
  germLocations9Top: 200,
  germLocations9IsAlive: false,
  germLocations9IsActive: true,
  // student 1 germs
  // LH
  germLocations10Left: 0,
  germLocations10Top: 0,
  germLocations10IsAlive: false,
  germLocations10IsActive: false,
  // RH
  germLocations11Left: 0,
  germLocations11Top: 0,
  germLocations11IsAlive: false,
  germLocations11IsActive: false,
  // student 2 germs
  // LH
  germLocations12Left: 0,
  germLocations12Top: 0,
  germLocations12IsAlive: false,
  germLocations12IsActive: false,
  // RH
  germLocations13Left: 0,
  germLocations13Top: 0,
  germLocations13IsAlive: false,
  germLocations13IsActive: false,
  // student 3 germs
  // LH
  germLocations14Left: 0,
  germLocations14Top: 0,
  germLocations14IsAlive: false,
  germLocations14IsActive: false,
  // RH
  germLocations15Left: 0,
  germLocations15Top: 0,
  germLocations15IsAlive: false,
  germLocations15IsActive: false,
};

export default db;
