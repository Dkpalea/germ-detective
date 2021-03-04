import classroomRegular from '../../assets/images/classroomRegular.png';
import classroomFaded from '../../assets/images/classroomFaded.png';
import scannerOn from '../../assets/images/scannerOn.png';
import scannerOff from '../../assets/images/scannerOff.png';

import click from '../../assets/audio/click.wav';
import scanner from '../../assets/audio/scanner.mp3';


import { useEffect, useState } from 'react';

const LevelOne = ({state, setStateProp}) => {

  const [intervalOneId, setIntervalOneId] = useState(null);
  const [intervalTwoId, setIntervalTwoId] = useState(null);

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


  return (
    <div className="level-one-page">
      <div className="content-container">
        <div className="toolbar">
          <div className="scanner-container">
            <div style={{visibility: (state.scannerCooldownRemainingSeconds !== 0)?'visible':'hidden'}}>
              {`Cooldown ${state.scannerCooldownRemainingSeconds}`}
            </div>
            <div className="scanner-bars-container">
              <div className="scanner-bar scanner-bar-3" style={{visibility: (state.scannerUseRemainingSeconds === 1 && state.scannerUseRemainingSeconds !== 0)?'visible':'hidden'}} />
              <div className="scanner-bar scanner-bar-2" style={{visibility: (state.scannerUseRemainingSeconds <= 2 && state.scannerUseRemainingSeconds !== 0)?'visible':'hidden'}} />
              <div className="scanner-bar scanner-bar-1" style={{visibility: (state.scannerUseRemainingSeconds <= 3 && state.scannerUseRemainingSeconds !== 0)?'visible':'hidden'}} />
            </div>
            {state.scannerUseRemainingSeconds > 0?<img className="scanner" src={scannerOn} />:<img  onClick={() => {activeScanner(); playAudio('click'); playAudio('scanner')}} className="scanner" src={scannerOff} />}
          </div>
          <div className="other">
            <img className="handsoap" />
            <img className="spray" />
            <img className="mask" />
          </div>
        </div>
        <img className="background" src={state.scannerUseRemainingSeconds > 0?classroomFaded:classroomRegular} />
      </div>
    </div>
  );
}

export default LevelOne;
