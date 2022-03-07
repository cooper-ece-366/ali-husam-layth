import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Camel App
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://en.wikipedia.org/wiki/Bactrian_camel"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mascot
        </a>
      </header>
    </div>
  );
}

export default App;
