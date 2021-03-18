import './App.css';
import React, {useState, useEffect} from "react";
import axios from "axios";

const Filter = (props) => {
    const filter = props.countryFilter
    const handleFilterChange = props.handleFilterChange
    return (
        <div>
            find countries <input value={filter}
                                  onChange={handleFilterChange}/>
        </div>
    )
}

const CountryDetails = (props) => {
    const country = props.country;
    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country['capital']}</div>
            <div>population {country['population']}</div>
            <h3>languages</h3>
            <ul>
                {country['languages'].map((language) => {
                    return <li key={language['name']}>{language['name']}</li>
                })}
            </ul>
        </div>
    )

}

const Result = (props) => {
    const filter = props.countryFilter;
    const allData = props.allData;
    const filteredData = allData.filter((country) => {
        const lowerName = country.name.toLowerCase();
        return lowerName.includes(filter);
    })

    if (filteredData.length === 0) {
        return <div>No matches</div>
    }

    if (filteredData.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (filteredData.length > 1 && filteredData.length <= 10) {
        return (
            filteredData.map((country) => {
                return <div key={country.name}>{country.name}</div>
            })
        )
    }

    if (filteredData.length === 1) {
        return <CountryDetails country={filteredData[0]}/>
    }
}

function App() {
    const [filter, setFilter] = useState('');
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setAllData(response.data);
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value.toLowerCase());
    }

    return (
        <div>
            <Filter countryFilter={filter} handleFilterChange={handleFilterChange}/>
            <Result countryFilter={filter} allData={allData}/>
        </div>
    );
}

export default App;
