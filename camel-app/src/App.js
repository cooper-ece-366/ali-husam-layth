import logo from './logo.svg';
import './App.css';


function App() {
 const apiUrlPrefix = "http://localhost:8080";

 const testUrl = apiUrlPrefix.concat("/api/message")
 App.testMessage = () => {
    console.log("Test message");
    fetch(testUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log("Cannot connect to API endpoint: %s", testUrl);
      });
  }

  App.testMessage()


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
