import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import firebase from './firebase.js'

const ScoreBoard = ({ playerTotalScore }) => {

  const [scores, setScores] = useState([]);
  const [playerScore, setPlayerScore] = useState(2000);
  const [leaderBoardUpdated, setLeaderBoardUpdated] = useState(true);
  const [userInput, setUserInput] = useState({
    name: "",
    score: ""
  });


  useEffect(() => {

    setPlayerScore(playerTotalScore);
    const database = getDatabase(firebase);
    const dbRef = ref(database, '/leaderboard');

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

  // this event will fire every time there is a change in the input it is attached to
  const handleChange = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const database = getDatabase(firebase);
    const dbRef = ref(database, '/leaderboard');

    const newScore = {
      name: userInput.name,
      score: playerScore
    };

    push(dbRef, newScore);

    setUserInput({ name: '', score: '' });
    setLeaderBoardUpdated(false)
  };

  return (
    <>
      <div className="leaderBoardCont">
        {leaderBoardUpdated ?
          <form onSubmit={handleSubmit}>
            <h2>LeaderBoard</h2>
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
              Name: {score.name} | Score: {score.score}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ScoreBoard