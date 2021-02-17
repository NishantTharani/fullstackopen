import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part name={props.part1} exercises={props.exercises1} />
            <Part name={props.part2} exercises={props.exercises2} />
            <Part name={props.part3} exercises={props.exercises3} />
        </div>
    )
}

const Footer = (props) => {
    return (
        <p>
            Number of exercises {props.ex1 + props.ex2 + props.ex3}
        </p>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />
            <Content part1={part1} exercises1={exercises1} part2={part2}
                     exercises2={exercises2} part3={part3} exercises3={exercises3} />
            <Footer ex1={exercises1} ex2={exercises2} ex3={exercises3} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))