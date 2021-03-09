import classroomRegular from '../../assets/images/classroomRegular.png';
import classroomFaded from '../../assets/images/classroomFaded.png';
import scannerOn from '../../assets/images/scannerOn.png';
import scannerOff from '../../assets/images/scannerOff.png';
import handsoap from '../../assets/images/handsoap.png';
import spray from '../../assets/images/spray.png';
import boySad from '../../assets/images/boySad.png';
import girlSad from '../../assets/images/girlSad.png';
import germ1 from '../../assets/images/Germ_1.GIF';
import germ2 from '../../assets/images/Germ_2.GIF';
import germ3 from '../../assets/images/Germ_3.GIF';

import click from '../../assets/audio/click.wav';
import scanner from '../../assets/audio/scanner.mp3';


import { useEffect, useState } from 'react';

const LevelOne = ({state, setStateProp}) => {

  const studentLocations1Top = 250;
  const studentLocations1Left = 725;
  const studentLocations2Top = 200;
  const studentLocations2Left = 350;
  const studentLocations3Top = 250;
  const studentLocations3Left = 60;

  // helper: [0,max)
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const [intervalOneId, setIntervalOneId] = useState(null);
  const [germItemImagesState, setGermItemImagesState] = useState([
    // germ images
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
  const [studentImagesState, setStudentImagesState] = useState([
    // student images (M or F)
    getRandomInt(2),
    getRandomInt(2),
    getRandomInt(2),
  ]);

  const clickPlayer = new Audio(click);
  const scannerPlayer = new Audio(scanner);
  scannerPlayer.volume = 0.3;


  const scannerActiveTimeSec = 3;
  const scannerCooldownTimeSec = 5;

  const activeScanner = () => {
    if (state.scannerUseRemainingSeconds === 0 && state.scannerCooldownRemainingSeconds === 0) {
      setStateProp((prevState) => ({...prevState, scannerUseRemainingSeconds: 3}));
    }
  };

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

  const activateScanner = () => {
    if (state.scannerCooldownRemainingSeconds===0 && state.scannerUseRemainingSeconds===0) {
      activeScanner();
      playAudio('click');
      playAudio('scanner');
    }
  };

  const imageDeterminer = (imageType) => {
    console.log('here');
    switch (imageType) {
      case 'germ':
        console.log('germ');
        const germImagesArray = [germ1,germ2,germ3];
        return germImagesArray[Math.floor(Math.random()*germImagesArray.length)];
      case 'student':
        console.log('student');
        const sadStudentImagesArray = [boySad,girlSad];
        // const sadStudentImagesArray = [boySad,girlSad];
        return sadStudentImagesArray[Math.floor(Math.random()*sadStudentImagesArray.length)];
    }
  };

  return (
    <div className="level-one-page">
      <div className="content-container">
        {/*<div className="toolbar">*/}
        {/*  <div className="scanner-container">*/}
        {/*    <div className="cooldown-counter" style={{visibility: (state.scannerCooldownRemainingSeconds !== 0)?'visible':'hidden'}}>*/}
        {/*      {`Cooldown ${state.scannerCooldownRemainingSeconds}`}*/}
        {/*    </div>*/}
        {/*    <div className="scanner-bars-container">*/}
        {/*      <div className="scanner-bar scanner-bar-3" style={{visibility: (state.scannerUseRemainingSeconds === 1 && state.scannerUseRemainingSeconds !== 0)?'visible':'hidden'}} />*/}
        {/*      <div className="scanner-bar scanner-bar-2" style={{visibility: (state.scannerUseRemainingSeconds <= 2 && state.scannerUseRemainingSeconds !== 0)?'visible':'hidden'}} />*/}
        {/*      <div className="scanner-bar scanner-bar-1" style={{visibility: (state.scannerUseRemainingSeconds <= 3 && state.scannerUseRemainingSeconds !== 0)?'visible':'hidden'}} />*/}
        {/*    </div>*/}
        {/*    <div*/}
        {/*        className="scanner-label-container"*/}
        {/*        style={{opacity: (state.scannerCooldownRemainingSeconds>0?'50%':'100%'), cursor: (state.scannerCooldownRemainingSeconds>0 || state.scannerUseRemainingSeconds?'not-allowed':'pointer')}}*/}
        {/*        onClick={() => activateScanner()}*/}
        {/*    >*/}
        {/*      {state.scannerUseRemainingSeconds > 0?<img className="scanner" src={scannerOn} />*/}
        {/*      :<img className="scanner" src={scannerOff} />}*/}
        {/*      <div className="label">Scanner</div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="other">*/}
        {/*    <div className="other-label-container"*/}
        {/*         style={{opacity: (state.scannerUseRemainingSeconds===0?'100%':'50%'), cursor: (state.scannerUseRemainingSeconds===0?'pointer':'not-allowed')}}*/}
        {/*    >*/}
        {/*      <img className="handsoap" src={handsoap} />*/}
        {/*      <div className="label">Hand <br/> Soap</div>*/}
        {/*    </div>*/}
        {/*    <div className="other-label-container"*/}
        {/*         style={{opacity: (state.scannerUseRemainingSeconds===0?'100%':'50%'), cursor: (state.scannerUseRemainingSeconds===0?'pointer':'not-allowed')}}*/}
        {/*    >*/}
        {/*      <img className="spray" src={spray} />*/}
        {/*      <div className="label">Disinfectant Spray</div>*/}
        {/*    </div>*/}
        {/*    /!*<div className="other-label-container">*!/*/}
        {/*    /!*  <img className="mask" />*!/*/}
        {/*    /!*  <div className="label">Mask</div>*!/*/}
        {/*    /!*</div>*!/*/}
        {/*  </div>*/}
        {/*</div>*/}

        {germItemImagesState.map((imageNum, i) => {
          if (imageNum === 0 ) {
            return (state[`germLocations${i}IsActive`]?<img key={`germ-${i}`} style={{top: (state[`germLocations${i}Top`]+'px'), right: '0', bottom: '0', left: (state[`germLocations${i}Left`]+'px')}} className="germ" src={germ1} />:null)
          } else if (imageNum === 1) {
            return (state[`germLocations${i}IsActive`]?<img key={`germ-${i}`} style={{top: (state[`germLocations${i}Top`]+'px'), right: '0', bottom: '0', left: (state[`germLocations${i}Left`]+'px')}} className="germ" src={germ2} />:null)
          } else {
            return (state[`germLocations${i}IsActive`]?<img key={`germ-${i}`} style={{top: (state[`germLocations${i}Top`]+'px'), right: '0', bottom: '0', left: (state[`germLocations${i}Left`]+'px')}} className="germ" src={germ3} />:null)
          }
        })}

        <img style={{top: (studentLocations1Top+'px'), right: '0', bottom: '0', left: (studentLocations1Left+'px')}} className="student" src={boySad} />
        <img style={{top: (studentLocations2Top+'px'), right: '0', bottom: '0', left: (studentLocations2Left+'px')}} className="student" src={boySad} />
        <img style={{top: (studentLocations3Top+'px'), right: '0', bottom: '0', left: (studentLocations3Left+'px')}} className="student" src={boySad} />
        <img className="background" src={state.scannerUseRemainingSeconds > 0?classroomFaded:classroomRegular} />
      </div>
    </div>
  );
}

export default LevelOne;
