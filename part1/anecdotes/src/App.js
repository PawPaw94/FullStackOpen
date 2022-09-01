import { useState } from 'react'
import React from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick} >{props.text}</button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  // state for selected anecdote & amount of points
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0,0])
  // handle randomization
  const handleClick =() => {
    const randomize = () => [Math.floor(Math.random() * anecdotes.length)]
    setSelected(randomize);
  } 
  // handle count
  const handlePoints = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  } 


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>{points[selected]} votes</p>
      <Button handleClick={handlePoints} text="vote" />
      <Button handleClick={handleClick} text="next anecdote" />
      <h2> Anecdote with most wins</h2>
      <p> {anecdotes[points.indexOf(Math.max(...points))]}</p>
      <p> has {Math.max(...points)} points</p>
    </div>
  )
}

export default App
