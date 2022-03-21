import React from 'react'

const Content = ({courses}) => {
    const courseList = courses.map(x => 
        <div key={x.id}>
        <h2 key={x.id}>
        {x.name}
        </h2>
        {x.parts.map(i => 
        <p key={i.id}>
            {i.name} {i.exercises}
        </p>)}
        Total of {x.parts.reduce ((sum, part) =>
        sum + part.exercises, 0)} exercises
        </div>)
    return courseList
  }

  /*const Content = ({courses}) => {
      const mappedCourses = courses.parts.map(x => <p key={x.id}>{x.name} {x.exercises}</p>)
      return (
          mappedCourses
      )
  }

  const Total = ({courses}) => {
      const totalExercises = courses.parts.reduce((sum, part) => sum + part.exercises, 0)
      return (
          <p>total of {totalExercises} exercises</p>
          )
  }*/

  const Course = ({courses}) => {
      return(
          <div>
          <Content courses={courses}/>
          </div>
      )
  }

export default Course

