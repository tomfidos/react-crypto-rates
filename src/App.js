import './App.css';
import logo from './bitcoin_logo.png';
import Crypto from './Crypto';


function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} className="logo" alt="BTC logo"></img>
        <h1>crypto rate</h1>
      </header>
      <Crypto/>
    </div>
  );
}

export default App;
