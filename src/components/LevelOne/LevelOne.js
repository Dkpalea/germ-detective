import classroomRegular from '../../assets/images/classroomRegular.png';
import classroomFaded from '../../assets/images/classroomFaded.png';
import scannerOn from '../../assets/images/scannerOn.png';
import scannerOff from '../../assets/images/scannerOff.png';
import handSoap from '../../assets/images/handsoap.png';
import spray from '../../assets/images/sprayCursor.png';
import boy from '../../assets/images/boy.png';
import boySad from '../../assets/images/boySad.png';
import girl from '../../assets/images/girl.png';
import girlSad from '../../assets/images/girlSad.png';
import germ1 from '../../assets/images/Germ_1.GIF';
import germ2 from '../../assets/images/Germ_2.GIF';
import germ3 from '../../assets/images/Germ_3.GIF';

import clickSound from '../../assets/audio/click.wav';
import scannerSound from '../../assets/audio/scanner.mp3';
import spraySound from '../../assets/audio/spray.mp3';
import bubbleSound from '../../assets/audio/bubble.mp3';
import notifSound from '../../assets/audio/notif.mp3';
import yaySound from '../../assets/audio/yay.mp3';
import laughSound from '../../assets/audio/laugh.mp3';
import onoSound from '../../assets/audio/ono.mp3';

import { useEffect, useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar'

const LevelOne = ({state, setStateProp}) => {

  const alwaysVisible = false;

  // setup snackbar
  const [openSnackbar, closeSnackbar] = useSnackbar();

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
    console.log(selectedGermNums);
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

  // germ counter setup
  const [germsRemainingCounterState, setGermsRemainingCounterState] = useState(state.levelOneNumGerms);

  // complete when no germs remaining
  useEffect(() => {
    if (germsRemainingCounterState===0) {
      playAudio('yay');
      setTimeout(() => {
        playAudio('yay');
      }, 500);
      setTimeout(() => {
        setStateProp((prevState) => {
          return {
            ...prevState,
            currentPageNum: prevState.currentPageNum+1,
          };
        });
      }, 1500);
    }
  }, [germsRemainingCounterState]);

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
  const clickPlayer = new Audio(clickSound);
  clickPlayer.volume = 0.3;
  const scannerPlayer = new Audio(scannerSound);
  scannerPlayer.volume = 0.2;
  const sprayPlayer = new Audio(spraySound);
  const bubblePlayer = new Audio(bubbleSound);
  const notifPlayer = new Audio(notifSound);
  notifPlayer.volume = 0.8;
  const yayPlayer = new Audio(yaySound);
  yayPlayer.volume = 0.4;
  const laughPlayer = new Audio(laughSound);
  laughPlayer.volume = 0.02;
  const onoPlayer = new Audio(onoSound);
  onoPlayer.volume = 0.6;

  // scannerSound setup
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
        break;
      case 'scanner':
        if (state.scannerCooldownRemainingSeconds === 0) {
          scannerPlayer.play();
          setTimeout(() => {
            scannerPlayer.pause();
            scannerPlayer.currentTime = 0;
            }, 2750)
        }
        break;
      case 'spray':
        if (state.scannerUseRemainingSeconds === 0 && state.sprayIsSelected) {
          sprayPlayer.play();
        }
        break;
      case 'bubble':
        if (state.scannerUseRemainingSeconds === 0 && state.handSoapIsSelected) {
          bubblePlayer.play();
        }
        break;
      case 'notif':
        notifPlayer.play();
        break;
      case 'yay':
        yayPlayer.play();
        break;
      case 'laugh':
        laughPlayer.play();
        break;
      case 'ono':
        onoPlayer.play();
        break;
    }
  };

  // setup germ laugh timer on first mount
  useEffect(() => {
    // germ laugh timer
    setTimeout(() => {
      playAudio('laugh');
    }, 2500);
    setInterval(() => {
      playAudio('laugh');
    }, 35000);
  }, []);

  const resetAudio = (name) => {
    switch (name) {
      case 'spray':
        sprayPlayer.pause();
        sprayPlayer.currentTime = 0;
      case 'bubble':
        bubblePlayer.pause();
        bubblePlayer.currentTime = 0;
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

    if (state.scannerUseRemainingSeconds===0) {
      console.log('killing', germNum);

      const kill = () => {
        setStateProp((prevState) => {
          return {
            ...prevState,
            [`germLocations${germNum}IsAlive`]: false
          };
        });
        // update counter
        setGermsRemainingCounterState((prevNumGerms) => prevNumGerms-1);
        // play notification sound
        playAudio('notif');
      };

      const attemptedKill = (type) => {
        if (type==='soapForSurface') {
          openSnackbar('Hand soap is for our hands!');
          playAudio('ono');
        } else {
          openSnackbar('Disinfectant spray is for surfaces!');
          playAudio('ono');
        }
      };

      if (!state.handSoapIsSelected && !state.sprayIsSelected) {
        openSnackbar('Kill germs using soap 🧼 or spray 💨...');
        playAudio('ono');
      } else if ((germNum >= 10) && (germNum <= 15)) {
      //  on hands
        if (state.handSoapIsSelected) {
          console.log('killing handGerm');
          kill();
        } else {
          attemptedKill('sprayForHand');
        }
      } else {
        // on surfaces
        if (state.sprayIsSelected) {
          console.log('killing surfaceGerm');
          kill();
        } else {
          attemptedKill('soapForSurface');
        }
      }

    }
  };

  const selectTool = (toolName) => {

    // tool not already selected AND scannerSound is not active
    if (/*!state[`${toolName}IsSelected`] &&*/ state.scannerUseRemainingSeconds===0) {
      switch (toolName) {
        case 'handSoap':
          playAudio('click');
          setStateProp((prevState) => {
            return {
              ...prevState,
              handSoapIsSelected: !prevState.handSoapIsSelected,
              sprayIsSelected: false,
            };
          });
          break;
        case 'spray':
          playAudio('click');
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
    <div className="level-one-page">
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
                 style={{background: (state.handSoapIsSelected?'#E2E2E2':''), opacity: (state.scannerUseRemainingSeconds===0?'100%':'50%'), cursor: (state.scannerUseRemainingSeconds===0?'pointer':'not-allowed')}}
            >
              <img className="handsoap" src={handSoap} />
              <div className="label">Hand <br/> Soap</div>
            </div>
            <div className="other-label-container"
                 onClick={() => selectTool('spray')}
                 style={{background: (state.sprayIsSelected?'#E2E2E2':''), opacity: (state.scannerUseRemainingSeconds===0?'100%':'50%'), cursor: (state.scannerUseRemainingSeconds===0?'pointer':'not-allowed')}}
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
        <div
          style={{cursor: (state.handSoapIsSelected&&state.scannerUseRemainingSeconds===0?
              `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🧼</text></svg>") 16 0, auto`
              :(state.sprayIsSelected&&state.scannerUseRemainingSeconds===0?
                `url("data:image/svg+xml;utf8, <svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>💨</text></svg>") 16 0, auto`
                :'auto'))}}
          //`url('data:image/png;base64,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') 16 0, auto`
          // style={{cursor: (state.handSoapIsSelected&&state.scannerUseRemainingSeconds===0?
          //     `url('../../assets/images/handsoap.png') auto`
          //     :(state.sprayIsSelected&&state.scannerUseRemainingSeconds===0?
          //       `url("data:image/svg+xml;utf8, <svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>💨</text></svg>") 16 0, auto`
          //       :'auto'))}}
          onMouseDown={() => playAudio((state.handSoapIsSelected?'bubble':'spray'))}
          onMouseUp={() => resetAudio((state.handSoapIsSelected?'bubble':'spray'))}
        >
          <div className="germs-remaining-counter-container">
            <img className="germ-1" src={germ1} />
            <img className="germ-2" src={germ2} />
            <img className="germ-3" src={germ3} />
            <div className="germs-remaining-counter-text">
              <span className="count">{germsRemainingCounterState}</span>
              <span className="remaining">remaining</span>
            </div>
          </div>

          {germItemImagesState.map((imageNum, i) => {
            if (imageNum === 0 ) {
              return (state[`germLocations${i}IsAlive`]?(state.scannerUseRemainingSeconds>0||alwaysVisible?<img onMouseDown={() => {killGerm(i)}} key={`germ-item-${i}`} style={{top: (state[`germLocations${i}Top`]+'px'), right: '0', bottom: '0', left: (state[`germLocations${i}Left`]+'px')}} className="germ" src={germ1} />:<div key={`germ-item-${i}`} onMouseDown={() => {killGerm(i)}} key={`germ-item-${i}`} style={{top: (state[`germLocations${i}Top`]+'px'), right: '0', bottom: '0', left: (state[`germLocations${i}Left`]+'px')}} className="null-germ" />):null)
            } else if (imageNum === 1) {
              return (state[`germLocations${i}IsAlive`]?(state.scannerUseRemainingSeconds>0||alwaysVisible?<img onMouseDown={() => {killGerm(i)}} key={`germ-item-${i}`} style={{top: (state[`germLocations${i}Top`]+'px'), right: '0', bottom: '0', left: (state[`germLocations${i}Left`]+'px')}} className="germ" src={germ2} />:<div key={`germ-item-${i}`} onMouseDown={() => {killGerm(i)}} key={`germ-item-${i}`} style={{top: (state[`germLocations${i}Top`]+'px'), right: '0', bottom: '0', left: (state[`germLocations${i}Left`]+'px')}} className="null-germ" />):null)
            } else {
              return (state[`germLocations${i}IsAlive`]?(state.scannerUseRemainingSeconds>0||alwaysVisible?<img onMouseDown={() => {killGerm(i)}} key={`germ-item-${i}`} style={{top: (state[`germLocations${i}Top`]+'px'), right: '0', bottom: '0', left: (state[`germLocations${i}Left`]+'px')}} className="germ" src={germ3} />:<div key={`germ-item-${i}`} onMouseDown={() => {killGerm(i)}} key={`germ-item-${i}`} style={{top: (state[`germLocations${i}Top`]+'px'), right: '0', bottom: '0', left: (state[`germLocations${i}Left`]+'px')}} className="null-germ" />):null)
            }
          })}

          {studentImagesState.map((imageNum, i) => {
            const sex = imageNum===0?'male':'female';
            let isSad;
            // student 1
            if (i === 0) {
              isSad = (state.germLocations14IsAlive || state.germLocations15IsAlive);
              // student 2
            } else if (i === 1) {
              isSad = (state.germLocations12IsAlive || state.germLocations13IsAlive);
              // student 3
            } else if (i === 2) {
              isSad = (state.germLocations10IsAlive || state.germLocations11IsAlive);
            }
            // console.log(i);
            // console.log(imageNum===0?'male':'female');
            // console.log(isSad?'sad':'happy');

            return <img key={`student-${i}`} style={{top: (studentsLocations[`studentLocations${i+1}Top`]+'px'), right: '0', bottom: '0', left: (studentsLocations[`studentLocations${i+1}Left`]+'px')}} className="student" src={sex==='male'?(isSad?(boySad):(boy)):(isSad?(girlSad):(girl))} />;

          })}

          <img className="background"
               src={state.scannerUseRemainingSeconds > 0?classroomFaded:classroomRegular}
          />
        </div>
      </div>
    </div>
  );
}

export default LevelOne;
