import './App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer'
import GetRocket from './components/GetRocket';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <main>      
        <Routes>
          <Route path = "/" element={<LandingPage />} />
          <Route path="/rocket-selection" element={<GetRocket />} />
        </Routes> 
      </main>
      <Footer />
    </div>
  );
}

export default App;
