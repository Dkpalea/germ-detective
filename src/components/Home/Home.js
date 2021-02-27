
const Home = ({state, setStateProp}) => {


  const addToCount = () => {
    setStateProp({toolsScannerCooldownRemainingSeconds: state.toolsScannerCooldownRemainingSeconds += 1});
  };


  return (
    <div className="home-page">
      {state.toolsScannerCooldownRemainingSeconds}
      <button onClick={() => addToCount()}>addToCount</button>
    </div>
  );
}

export default Home;
