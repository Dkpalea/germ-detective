import home from '../../assets/images/home.png';
import instruction1 from '../../assets/images/instruction1.png';
import instruction2 from '../../assets/images/instruction2.png';
import instruction3 from '../../assets/images/instruction3.png';
import endScreen from '../../assets/images/endScreen.png';
import bgm from '../../assets/audio/bgm.mp3';
import click from '../../assets/audio/click.wav';
import { useEffect } from 'react';


const Home = ({state, setStateProp}) => {

  useEffect(() => {
    if (state.currentPageNum === 2) {
      setTimeout(() => {
        window.location.reload();
      }, 8000);
    }
  }, [state.currentPageNum]);


  const bgmPlayer = new Audio(bgm);
  bgmPlayer.volume = 0.1;
  bgmPlayer.loop = true;
  const clickPlayer = new Audio(click);
  clickPlayer.volume = 0.3;


  const next = () => {
    setStateProp((prevState) => {
      console.log('triggered: ', prevState.currentPageNum);
      if (prevState.currentPageNum === 0) {
        console.log(prevState.currentPageNum);
        return {...prevState, currentPageNum: 0.1};
      } else if (prevState.currentPageNum === 0.1) {
        console.log('other: ', prevState.currentPageNum);
        return {...prevState, currentPageNum: 0.2};
      } else if (prevState.currentPageNum === 0.2) {
        console.log('other: ', prevState.currentPageNum);
        return {...prevState, currentPageNum: 0.3};
      } else if (prevState.currentPageNum === 0.3) {
        console.log('other: ', prevState.currentPageNum);
        return {...prevState, currentPageNum: 1};
      }
    });
  };


  return (
    <div className="home-page">
      <div className="content-container">
        {state.currentPageNum===0?<button onClick={() => {next(); bgmPlayer.play(); clickPlayer.play();}} className="button-0"><b>Start!</b></button>:null}
        {state.currentPageNum>0 && state.currentPageNum<2?<button onClick={() => {next(); clickPlayer.play();}} className="button-0-1">👉🏽</button>:null}
        {state.currentPageNum===0?<img className="background" src={home} />:null}
        {state.currentPageNum===0.1?<img className="background" src={instruction1} />:null}
        {state.currentPageNum===0.2?<img className="background" src={instruction2} />:null}
        {state.currentPageNum===0.3?<img className="background" src={instruction3} />:null}
        {state.currentPageNum===2?<img className="background" src={endScreen} />:null}
      </div>
    </div>
  );
}

export default Home;
