import React from 'react'

const PersonForm = ({onSubmit,name,number}) => {
  return (
    <form onSubmit={onSubmit}>
    <div> Name: <input value={name.value} onChange={name.onChange} /> </div>
    <div> Number: <input value={number.value} onChange={number.onChange} /></div>
    <div><button type="submit">add</button></div>
  </form>
  )
}

export default PersonForm