import './App.scss';
import db from './db';
import { useState } from 'react';
import Home from './components/Home/Home';
import LevelOne from './components/LevelOne/LevelOne';
import SnackbarProvider from 'react-simple-snackbar'

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
    <SnackbarProvider>
      <div className="app">
        {state.currentPageNum < 1 || state.currentPageNum === 2 ? <Home state={state} setStateProp={setStateProp} /> : null}
        {state.currentPageNum === 1 ? <LevelOne state={state} setStateProp={setStateProp} /> : null}
      </div>
    </SnackbarProvider>
  );
}

export default App;
