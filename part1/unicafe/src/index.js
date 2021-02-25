import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = (props) => {
    return (
        <div>
            <button onClick={props.handleClick}>
                {props.text}
            </button>
        </div>
    )
}

const Stat = (props) => {
    return (
        <tr>
            <td>{props.label}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad === 0) {
        return <div>No feedback given</div>
    }

    return (
        <table>
            <tbody>
            <Stat label={"good"} value={good}/>
            <Stat label={"bad"} value={bad}/>
            <Stat label={"neutral"} value={neutral}/>
            <Stat label={"all"} value={good + neutral + bad}/>
            <Stat label={"average"} value={(good - bad) / (good + neutral + bad)}/>
            <Stat label={"positive"} value={good / (good + neutral + bad)}/>
            </tbody>
        </table>
    )

}

const Anecdote = (props) => {
    return (
        <div>
            <p>{props.anecdotes[props.selected]}</p>
            <p>has {props.votes[props.selected]} votes</p>
        </div>
    )
}

const App = (props) => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

    const newAnecdote = () => {
        setSelected(Math.floor(Math.random() * props.anecdotes.length))
    }

    const voteForCurrent = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }

    const increment = (old, setSomething) => {
        return () => {
            setSomething(old + 1)
        }
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button text={"good"} handleClick={increment(good, setGood)}/>
            <Button text={"neutral"} handleClick={increment(neutral, setNeutral)}/>
            <Button text={"bad"} handleClick={increment(bad, setBad)}/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
            <h1>Anecdote of the day</h1>
            <Anecdote anecdotes={props.anecdotes} votes={votes} selected={selected}/>
            <Button text={"vote"} handleClick={voteForCurrent}/>

            <Button text={"next anecdote"}
                    handleClick={newAnecdote}/>

            <h1>Anecdote with most votes</h1>
            <Anecdote anecdotes={props.anecdotes} votes={votes} selected={votes.indexOf(Math.max(...votes))}/>


        </div>
    )
}


ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
);
