// SCOREBOARD COMPONENT
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import firebase from './firebase.js'


const ScoreBoard = ({ playerTotalScore }) => {
// stateful variables to update final scores for both player and computer grid at the end of the game, and also user input at the end of the game which appears on the modal. Passed in modal.js .
  const [scores, setScores] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [leaderBoardUpdated, setLeaderBoardUpdated] = useState(true);
  const [userInput, setUserInput] = useState({
    name: "",
    score: ""
  });


  useEffect(() => {
    // storing the player's total score in playerScore state
    setPlayerScore(playerTotalScore);
    // setting the database for firebase & linking to the object
    const database = getDatabase(firebase);
    // targeting the leaderboard key database
    const dbRef = ref(database, '/leaderboard');
    // mapping through all the total scores and renders new total score on the page.
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newState = Object.entries(data).map(([key, value]) => ({
          key,
          ...value,
        }));
        setScores(newState);
      }
    });

  }, [playerTotalScore])

  // this event will fire every time there is a change in the name input it is attached to (two-way binding)
  const handleChange = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };
  // targeting the spot in the database where we want to store all the total scores.
  const handleSubmit = (event) => {
    event.preventDefault();

    const database = getDatabase(firebase);
    const dbRef = ref(database, '/leaderboard');

    const newScore = {
      name: userInput.name,
      score: playerScore
    };
    // creating a unique key identifier and pushing the new total score to the leaderboard key
    push(dbRef, newScore);

    setUserInput({ name: '', score: '' });
    // disabling the form once it's submitted
    setLeaderBoardUpdated(false)
  };

  // JSX below returns the scoreboard
  return (
    <>
      <div className="leaderBoardCont">
        {leaderBoardUpdated ?
          <form onSubmit={handleSubmit}>
            <h3>LeaderBoard</h3>
            <p className='totalScore'>Your score is: {playerTotalScore}</p>
            <p>Submit your score</p>
            <p>Enter your name</p>
            <label
              className="sr-only" htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={userInput.name}
            />
            <button type="submit">Submit</button>
          </form> :
          null
        }
        <ul>
          {scores.map((score) => (
            <li key={score.key}>
              <span className='bold'>Name:</span> {score.name} | <span className='bold'>Score:</span> {score.score}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ScoreBoard