import React, {useState, useEffect} from 'react';
import phonebookService from "./services/phonebook"

/*
TO CHECK IN MODEL SOLUTION:
- do they filter the same way i do, to avoid async state updating issues?
- are the functions all defined in App still, like I have, with just the
references passed to the components?
-- or, do they define the functions in the components where they are used?
-- but then, how does common state get passed around?
-- is common state passed by reference? in which case we can just pass it
from parent to child for the functions in the child to operate on that state?
-- or, ooh, we can just pass the state updater together with the state?
 */

const Filter = (props) => {
    const nameFilter = props.nameFilter
    const handleNameFilterChange = props.handleNameFilterChange
    return (
        <div>
            filter shown with <input value={nameFilter}
                                     onChange={handleNameFilterChange}/>
        </div>
    )
}

const PersonForm = (props) => {
    const newName = props.newName
    const newNumber = props.newNumber
    const handleNameChange = props.handleNameChange
    const handleNumberChange = props.handleNumberChange
    const handleSubmit = props.handleSubmit
    return (
        <form>
            <div>
                name: <input value={newName}
                             onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber}
                               onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>add</button>
            </div>
        </form>
    )
}

const Persons = (props) => {
    const persons = props.persons;
    const nameFilter = props.nameFilter;
    const handleDelete = props.handleDelete;
    const displayedPersons = persons.filter((person) => {
            const lowerName = person.name.toLowerCase()
            return lowerName.includes(nameFilter)
        }
    )

    return (
        displayedPersons.map((person) =>
            <div key={person.id}>
                {person.name} {person.number}
                <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
            </div>)
    )
}

const Notification = (props) => {
    const message = props.message;
    const type = props.type;
    let notificationStyle = {};
    if (type === 'error') {
        notificationStyle = {
            color: 'red',
            background: 'lightgrey',
            fontSize: '20px'
        }
    } else if (type === 'added') {
        notificationStyle = {
            color: 'green',
            background: 'lightblue',
            fontSize: '20px'
        }
    }

    return (
        <div style={notificationStyle} className='notification'>{message}</div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')
    const [addedMsg, setAddedMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        phonebookService.getAll()
            .then(data => {
                    setPersons(data);
                }
            )
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const matches = persons.filter((person) =>
            person.name === newName
        )

        if (matches.length > 0) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        const personObj = {
            name: newName,
            number: newNumber
        }
        phonebookService.create(personObj)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
                setNewName('');
                setAddedMsg(`Added ${returnedPerson.name}`);
                setTimeout(() => {
                    setAddedMsg('');
                }, 4000);
            })
    }

    const handleDelete = (personId, name) => {
        console.log(personId);
        if (window.confirm(`Sure you want to delete ${name}?`)) {
            phonebookService.deletePerson(personId)
                .then(returnedPerson => {
                    setPersons(persons.filter(person => person.id !== personId));
                })
                .catch(error => {
                    setPersons(persons.filter(person => person.id !== personId));
                    setErrorMsg(`Information of ${name} has already been removed from the server`);
                })
        }
    }


    const handleNameFilterChange = (event) => {
        setNameFilter(event.target.value.toLowerCase())
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={addedMsg} type={'added'}/>
            <Notification message={errorMsg} type={'error'}/>
            <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange}/>
            <h2>add a new</h2>

            <PersonForm newName={newName}
                        newNumber={newNumber}
                        handleNameChange={handleNameChange}
                        handleNumberChange={handleNumberChange}
                        handleSubmit={handleSubmit}/>

            <h2>Numbers</h2>

            <Persons persons={persons}
                     nameFilter={nameFilter}
                     handleDelete={handleDelete}/>
        </div>
    )
}


export default App;
