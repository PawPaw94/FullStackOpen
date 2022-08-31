import React from 'react'

const StatisticLine = (props) => {
   if (props.calculateAll === 0) {
      return (
         <></>
      )
   }
   return (
      <tbody>
      <tr>
      <td>{props.text}</td>
      <td> {props.value} </td>
      </tr>
      </tbody>
   )
}

export default StatisticLine