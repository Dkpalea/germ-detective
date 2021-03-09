import classroomRegular from '../../assets/images/classroomRegular.png';
import classroomFaded from '../../assets/images/classroomFaded.png';
import scannerOn from '../../assets/images/scannerOn.png';
import scannerOff from '../../assets/images/scannerOff.png';
import handSoap from '../../assets/images/handsoap.png';
import spray from '../../assets/images/spray.png';
import boy from '../../assets/images/boy.png';
import boySad from '../../assets/images/boySad.png';
import girl from '../../assets/images/girl.png';
import girlSad from '../../assets/images/girlSad.png';
import germ1 from '../../assets/images/Germ_1.GIF';
import germ2 from '../../assets/images/Germ_2.GIF';
import germ3 from '../../assets/images/Germ_3.GIF';

import click from '../../assets/audio/click.wav';
import scanner from '../../assets/audio/scanner.mp3';


import { useEffect, useState } from 'react';
import * as url from 'url';

const LevelOne = ({state, setStateProp}) => {

  // helper: [0,max)
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // select which germs will be active once on initial mount
  useEffect(() => {
    const selectedGermNums = [];
    while (selectedGermNums.length<state.levelOneNumGerms) {
      let selectedGermNum = getRandomInt(16);
      if (!selectedGermNums.includes(selectedGermNum)) selectedGermNums.push(selectedGermNum);
    }
    selectedGermNums.forEach((germNum) => {
      setStateProp((prevState) => {
        return {
          ...prevState,
          [`germLocations${germNum}IsAlive`]: true,
          [`germLocations${germNum}IsActive`]: true,
        };
      });
    });
    console.log(state);
  }, []);

  // germ setup
  const [germItemImagesState, setGermItemImagesState] = useState([
    // germs on items images
    getRandomInt(3),
    getRandomInt(3),
    getRandomInt(3),
    getRandomInt(3),
    getRandomInt(3),
    getRandomInt(3),
    getRandomInt(3),
    getRandomInt(3),
    getRandomInt(3),
    getRandomInt(3),
    getRandomInt(3),
    getRandomInt(3),
    getRandomInt(3),
    getRandomInt(3),
    getRandomInt(3),
    getRandomInt(3),
  ]);

  // timer setup
  const [intervalOneId, setIntervalOneId] = useState(null);

  // student setup
  const studentsLocations = {
    studentLocations1Top: 250,
    studentLocations1Left: 725,
    studentLocations2Top: 200,
    studentLocations2Left: 350,
    studentLocations3Top: 250,
    studentLocations3Left: 60,
  };
  const [studentImagesState, setStudentImagesState] = useState([
    // student images (M or F)
    getRandomInt(2),
    getRandomInt(2),
    getRandomInt(2),
  ]);

  // audio setup
  const clickPlayer = new Audio(click);
  const scannerPlayer = new Audio(scanner);
  scannerPlayer.volume = 0.3;

  // scanner setup
  const scannerActiveTimeSec = 3;
  const scannerCooldownTimeSec = 5;

  // use timer
  useEffect(
    () => {
      if (state.scannerUseRemainingSeconds === scannerActiveTimeSec) {
        const intervalId = setInterval(() => {
          setStateProp((prevState) => {
            console.log('prevstate active: ', prevState.scannerUseRemainingSeconds);
            return {...prevState, scannerUseRemainingSeconds: prevState.scannerUseRemainingSeconds - 1};
          });
        }, 1000);
        setIntervalOneId(intervalId);
      } else if (state.scannerUseRemainingSeconds === 0 && intervalOneId !== null) {
        clearInterval(intervalOneId);
        setIntervalOneId(null);
        setStateProp((prevState) => {
          return {...prevState, scannerCooldownRemainingSeconds: scannerCooldownTimeSec};
        });
      }
    },
    [state.scannerUseRemainingSeconds],
  );

  // cooldown timer
  useEffect(
    () => {
      if (state.scannerCooldownRemainingSeconds === scannerCooldownTimeSec) {
        const intervalId = setInterval(() => {
          setStateProp((prevState) => {
            console.log('prevstate cool: ', prevState.scannerCooldownRemainingSeconds);
            return {...prevState, scannerCooldownRemainingSeconds: prevState.scannerCooldownRemainingSeconds - 1};
          });
        }, 1000);
        setIntervalOneId(intervalId);
      } else if (state.scannerCooldownRemainingSeconds === 0 && intervalOneId !== null) {
        clearInterval(intervalOneId);
        setIntervalOneId(null);
      }
    },
    [state.scannerCooldownRemainingSeconds],
  );

  const playAudio = (name) => {
    switch (name) {
      case 'click':
        if (state.scannerCooldownRemainingSeconds === 0) {
          clickPlayer.play();
        }
      case 'scanner':
        if (state.scannerCooldownRemainingSeconds === 0) {
          scannerPlayer.play();
          setTimeout(() => {
            scannerPlayer.pause();
            scannerPlayer.currentTime = 0;
            }, 2750)
        }
    }
  };

  const activeScanner = () => {
    if (state.scannerUseRemainingSeconds === 0 && state.scannerCooldownRemainingSeconds === 0) {
      setStateProp((prevState) => ({...prevState, scannerUseRemainingSeconds: scannerActiveTimeSec}));
    }
  };

  const activateScanner = () => {
    if (state.scannerCooldownRemainingSeconds===0 && state.scannerUseRemainingSeconds===0) {
      activeScanner();
      playAudio('click');
      playAudio('scanner');
    }
  };

  const killGerm = (germNum) => {
    console.log('killing', germNum);
    setStateProp((prevState) => {
      return {
        ...prevState,
        [`germLocations${germNum}IsAlive`]: false
      };
    });
  };

  const selectTool = (toolName) => {

    // tool not already selected AND scanner is not active
    if (/*!state[`${toolName}IsSelected`] &&*/ state.scannerUseRemainingSeconds===0) {
      switch (toolName) {
        case 'handSoap':
          setStateProp((prevState) => {
            return {
              ...prevState,
              handSoapIsSelected: !prevState.handSoapIsSelected,
              sprayIsSelected: false,
            };
          });
          break;
        case 'spray':
          setStateProp((prevState) => {
            return {
              ...prevState,
              handSoapIsSelected: false,
              sprayIsSelected: !prevState.sprayIsSelected,
            };
          });
          break;
      }
    }
  };

  return (
    <div className="level-one-page"
         style={{cursor: (state.handSoapIsSelected&&state.scannerUseRemainingSeconds===0?
             `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🧼</text></svg>") 16 0, auto`
             :(state.sprayIsSelected&&state.scannerUseRemainingSeconds===0?
               `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>💨</text></svg>") 16 0, auto`
             :'auto'))}}
    >
      <div className="content-container">
        <div className="toolbar">
          <div className="scanner-container">
            <div className="cooldown-counter" style={{visibility: (state.scannerCooldownRemainingSeconds !== 0)?'visible':'hidden'}}>
              {`Cooldown ${state.scannerCooldownRemainingSeconds}`}
            </div>
            <div className="scanner-bars-container">
              <div className="scanner-bar scanner-bar-3" style={{visibility: (state.scannerUseRemainingSeconds === 1 && state.scannerUseRemainingSeconds !== 0)?'visible':'hidden'}} />
              <div className="scanner-bar scanner-bar-2" style={{visibility: (state.scannerUseRemainingSeconds <= 2 && state.scannerUseRemainingSeconds !== 0)?'visible':'hidden'}} />
              <div className="scanner-bar scanner-bar-1" style={{visibility: (state.scannerUseRemainingSeconds <= 3 && state.scannerUseRemainingSeconds !== 0)?'visible':'hidden'}} />
            </div>
            <div
                className="scanner-label-container"
                style={{opacity: (state.scannerCooldownRemainingSeconds>0?'50%':'100%'), cursor: (state.scannerCooldownRemainingSeconds>0 || state.scannerUseRemainingSeconds?'not-allowed':'pointer')}}
                onClick={() => activateScanner()}
            >
              {state.scannerUseRemainingSeconds > 0?<img className="scanner" src={scannerOn} />
              :<img className="scanner" src={scannerOff} />}
              <div className="label">Scanner</div>
            </div>
          </div>
          <div className="other">
            <div className="other-label-container"
                 onClick={() => selectTool('handSoap')}
                 style={{background: (state.handSoapIsSelected?'#C4C4C4':''), opacity: (state.scannerUseRemainingSeconds===0?'100%':'50%'), cursor: (state.scannerUseRemainingSeconds===0?'pointer':'not-allowed')}}
            >
              <img className="handsoap" src={handSoap} />
              <div className="label">Hand <br/> Soap</div>
            </div>
            <div className="other-label-container"
                 onClick={() => selectTool('spray')}
                 style={{background: (state.sprayIsSelected?'#C4C4C4':''), opacity: (state.scannerUseRemainingSeconds===0?'100%':'50%'), cursor: (state.scannerUseRemainingSeconds===0?'pointer':'not-allowed')}}
            >
              <img className="spray" src={spray} />
              <div className="label">Disinfectant Spray</div>
            </div>
            {/*<div className="other-label-container">*/}
            {/*  <img className="mask" />*/}
            {/*  <div className="label">Mask</div>*/}
            {/*</div>*/}
          </div>
        </div>

        {germItemImagesState.map((imageNum, i) => {
          if (imageNum === 0 ) {
            return (state[`germLocations${i}IsAlive`]?<img onClick={() => {killGerm(i)}} key={`germ-item-${i}`} style={{visibility: (state.scannerUseRemainingSeconds>0?'visible':'hidden'), top: (state[`germLocations${i}Top`]+'px'), right: '0', bottom: '0', left: (state[`germLocations${i}Left`]+'px')}} className="germ" src={germ1} />:null)
          } else if (imageNum === 1) {
            return (state[`germLocations${i}IsAlive`]?<img onClick={() => {killGerm(i)}} key={`germ-item-${i}`} style={{visibility: (state.scannerUseRemainingSeconds>0?'visible':'hidden'), top: (state[`germLocations${i}Top`]+'px'), right: '0', bottom: '0', left: (state[`germLocations${i}Left`]+'px')}} className="germ" src={germ2} />:null)
          } else {
            return (state[`germLocations${i}IsAlive`]?<img onClick={() => {killGerm(i)}} key={`germ-item-${i}`} style={{visibility: (state.scannerUseRemainingSeconds>0?'visible':'hidden'), top: (state[`germLocations${i}Top`]+'px'), right: '0', bottom: '0', left: (state[`germLocations${i}Left`]+'px')}} className="germ" src={germ3} />:null)
          }
        })}

        {studentImagesState.map((imageNum, i) => {
          const gender = imageNum===0?'male':'female';
          let isSad;
          // student 1
          if (i === 0) {
            isSad = (state.germLocations10IsAlive || state.germLocations11IsAlive);
            // student 2
          } else if (i === 1) {
            isSad = (state.germLocations12IsAlive || state.germLocations13IsAlive);
            // student 3
          } else {
            isSad = (state.germLocations14IsAlive || state.germLocations15IsAlive);
          }

          return <img key={`student-${i}`} style={{top: (studentsLocations[`studentLocations${i+1}Top`]+'px'), right: '0', bottom: '0', left: (studentsLocations[`studentLocations${i+1}Left`]+'px')}} className="student" src={gender==='male'?(isSad?(boySad):(boy)):(isSad?(girlSad):(girl))} />;

        })}

        <img className="background"
             src={state.scannerUseRemainingSeconds > 0?classroomFaded:classroomRegular}
             // style={{cursor: 'url(/handsoap.png), auto'}}
        />
      </div>
    </div>
  );
}

export default LevelOne;
