import home from '../../assets/images/home.png';

const Home = ({state, setStateProp}) => {


  const navToLevel1 = () => {
    setStateProp({currentPageNum: 1});
  };


  return (
    <div className="home-page">
      <div className="content-container">
        <button onClick={() => navToLevel1()}>Start!</button>
        <img className="background" src={home} />
      </div>
    </div>
  );
}

export default Home;
