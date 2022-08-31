import Header from "./components/Header"
import Button from "./components/Button"
import StatisticLine from "./components/StatisticLine"
import Statistics from "./components/Statistics"
import { useState } from 'react'


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const changeGood = newGoodValue => {
    setGood(newGoodValue)
  }
  const changeNeutral = newNeutralValue => {
    setNeutral(newNeutralValue)
  }
  const changeBad = newBadValue => {
    setBad(newBadValue)
  }
  const calculateAll = good+bad+neutral || 0
  const calculateAverage = (good-bad) / calculateAll || 0
  const calculatePositive = (good / calculateAll)*100  || ""
  const displayPositive = calculatePositive + "%"
  
  return (
    <>
      <Header  />
      <Button handleClick={() => changeGood(good+1)}text="Good"/>
      <Button handleClick={() => changeNeutral(neutral+1)}text="Neutral"/>
      <Button handleClick={() => changeBad(bad+1)} text="Bad"/>
      <Statistics />
      <table>
      <StatisticLine calculateAll={calculateAll} text="Good:" value={good} />
      <StatisticLine calculateAll={calculateAll} text="Neutral:" value={neutral} />
      <StatisticLine calculateAll={calculateAll} text="Bad:" value={bad} />
      <StatisticLine calculateAll={calculateAll} text="All:" value={calculateAll} />
      <StatisticLine calculateAll={calculateAll} text="Average:" value={calculateAverage} />
      <StatisticLine calculateAll={calculateAll} text="Positive:" value={displayPositive}/>
      </table>
      </>
  )
}

export default App
