import React from 'react';
import Navbar from './Components';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/home';
import Masjids from './pages/mosques';
import Salah from './pages/prayerinfo';
import Restaurants from './pages/restaurants';

function message(){

    const apiUrlPrefix = "http://localhost:8080";

    const testUrl = apiUrlPrefix.concat("/api/message")
    fetch(testUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log("Cannot connect to API endpoint: %s", testUrl);
      });
}
message();

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route exact path='/' exact element={<Home />} />
            <Route path='/restaurants' element={<Restaurants />} />
            <Route path='/mosques' element={<Masjids />} />
            <Route path='/prayerinfo' element={<Salah />} />
        </Routes>
    </Router>
  );
}

export default App;
