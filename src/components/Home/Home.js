import home from '../../assets/images/home.png';
import bgm from '../../assets/audio/bgm.mp3';
import click from '../../assets/audio/click.wav';


const Home = ({state, setStateProp}) => {


  // const bgmPlayer = new Audio(bgm);
  // bgmPlayer.volume = 0.4;
  // bgmPlayer.loop = true;
  const clickPlayer = new Audio(click);


  const navToLevel1 = () => {
    setStateProp((prevState) => ({...prevState, currentPageNum: 1}));
  };


  return (
    <div className="home-page">
      <div className="content-container">
        <button onClick={() => {navToLevel1(); /*bgmPlayer.play();*/ clickPlayer.play();}}>Start!</button>
        <img className="background" src={home} />
      </div>
    </div>
  );
}

export default Home;
