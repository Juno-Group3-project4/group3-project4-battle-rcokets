import './App.scss';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Form from "./components/Form";
import PlayerGrid from "./components/PlayerGrid";
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  // set rocket data in variable
  const [rockets, setRockets] = useState([]);
  // store users selected rockets in state.
  const [selectedRockets, setSelectedRockets] = useState([]);
  // stateful variable for form submission
  const [formSubmitted, setFormSubmitted] = useState(false);

  // call api data on mount
  useEffect(() => {
    axios({
      url: 'https://api.spacexdata.com/v4/rockets',
      method: 'GET',
      dataResponse: 'json'
    }).then((response) => {
      // console.log(response.data);
      setRockets(response.data)
    })
  }, []);

  // onchange event to listen for users selected choices and update selectedRockets state
  const handleChange = (event) => {
    // console.log(event.target.checked);
    if (event.target.checked) {
      // console.log(event.target.value);
      // use spread operater to create a new array and add users selection
      setSelectedRockets([...selectedRockets, event.target.value]);
    } else {
      // using filter method to allow the user to remove a selected rocket from the array
      setSelectedRockets(selectedRockets.filter(rocket => rocket !== event.target.value))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('form is submitted');
    if (selectedRockets.length !== 3) {
      alert("Please only select 3 rockets!!");
    } else {
      setFormSubmitted(!false);
    }
  }

  return (
    <div className="App">
      <Header />
      <main>
        <div className="wrapper">
          { formSubmitted ? <PlayerGrid selectedRockets={selectedRockets} /> : (
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route 
                    path="/form" 
                    element={
                      <Form
                        rockets={rockets}
                        submitForm={handleSubmit}
                        handleChange={handleChange}
                      />
                    } 
                />
              </Routes>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;