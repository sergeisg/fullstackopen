const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return <h1>{props.course.name}</h1>
  }

  const Content = (props) => {
    const part1 = <p key="1">{course.parts[0].name} {course.parts[0].exercises}</p>
    const part2 = <p key="2">{course.parts[1].name} {course.parts[1].exercises}</p>
    const part3 = <p key="3">{course.parts[2].name} {course.parts[2].exercises}</p>
    return [part1, part2, part3]       
  }

  const Total = (props) => {
    return <p>Total {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
