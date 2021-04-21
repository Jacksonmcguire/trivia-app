import './App.scss';
import { Lobby } from '../Lobby/Lobby'
import { InGame } from '../InGame/InGame'
import { Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Route exact path='/'><Lobby/></Route>
      <Route exact path='/play'><InGame/></Route>
    </div>
  );
}

export default App;
