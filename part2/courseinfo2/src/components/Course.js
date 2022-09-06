import React from 'react'

const Header = ({ courses }) => <h2>{courses}</h2>

const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Content = ({courses}) => {
    return (
     <div>
        {courses.map(part => 
        <Part key={part.id} part={part} />
        )}
        </div>
    )
  }

  const Total = ({courses}) => {
   const sum =  courses.reduce((sum,excersise) => sum+excersise.exercises,0)
    return (
        <p>Total excersises: {sum}</p>
    )
  }

const Course = ({courses}) => {

  return (
    <div>
        <h1>Web development curriculum</h1>
        <Header courses={courses[0].name}/>
        <Content courses={courses[0].parts} />
        <Total courses={courses[0].parts} />
        <Header courses={courses[1].name}/>
        <Content courses={courses[1].parts} />
        <Total courses={courses[1].parts} />
    </div>
  )
}

export default Course