import React from 'react';

const Header = ({course}) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({course}) => {
    const parts = course.parts
    const sum = parts.reduce((acc, val) => acc + val.exercises, 0)
    return (
        <p>Number of exercises {sum}</p>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({course}) => {
    const parts = course.parts
    return (
        parts.map((part) =>
            <Part key={part.id} part={part}/>
        )
    )
}

const Course = (props) => {
    const course = props.course
    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}

export default Course