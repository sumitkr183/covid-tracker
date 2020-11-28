import React,{useEffect, useState} from 'react';
import {Navbar,Nav,Form,} from 'react-bootstrap';
import axios from 'axios';

export default function Header({setCoutries,setCoutriesName}) {   
    
    const [name, setName] = useState([]);
    const getCountry = (value) => {
        
        axios({
            method: 'GET',
            url: value==='all' ? 'https://disease.sh/v3/covid-19/all' : 'https://disease.sh/v3/covid-19/countries/'+value,
            headers: {'Content-type': 'application/json'}
        }).then(res =>{
            setCoutries({
                'total_cases' : res.data.cases,
                'total_recovered' : res.data.recovered,
                'total_deaths' : res.data.deaths,
                'cases' : res.data.todayCases,
                'recovered' : res.data.todayRecovered,
                'deaths' : res.data.todayDeaths,
                'lat' : res.data.countryInfo.lat,
                'lng' : res.data.countryInfo.long,
                'zoom' : 4
              });
            console.log(res);
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => {

        axios({
            method: 'GET',
            url: 'https://disease.sh/v3/covid-19/countries',
            headers: {'Content-type':'application/json'}
        }).then(res=>{
            console.log(res);
            const countryData = res.data.map(country => (
                {
                    name: country.country,
                    id: country.countryInfo.iso3
                }
            ))
            setCoutriesName(res.data);
            setName(countryData);
        }).catch(error=>{
            console.log(error);
        })

    },[]);

    return (
        <div style={{marginBottom: '2rem'}}>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#">COVID-19 TRACKER</Navbar.Brand>
                <Nav className="mr-auto">            
                </Nav>
                <Form inline>
                <Form.Control as="select" onChange={(e)=>getCountry(e.target.value)}>                
                    <option value="all">World Wide</option>
                    {
                        name.map(name => (
                        <option value={name.id}>{name.name}</option>
                        ))
                    }
                </Form.Control>
                </Form>
            </Navbar>
        </div>
    )
}
