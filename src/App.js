import './App.scss';
import db from './db';
import { useState } from 'react';
import Home from './components/Home/Home';
import LevelOne from './components/LevelOne/LevelOne';

const App = () => {

  const [state, setStateProp] = useState(db);

  // const setStateProp = (stateUpdateObj) => {
  //   setState((prevState) => {
  //     return {
  //       ...prevState,
  //       ...stateUpdateObj,
  //     };
  //   });
  // };

  return (
    <div className="app">
      {state.currentPageNum === 0 ? <Home state={state} setStateProp={setStateProp} /> : null}
      {state.currentPageNum === 1 ? <LevelOne state={state} setStateProp={setStateProp} /> : null}
    </div>
  );
}

export default App;
