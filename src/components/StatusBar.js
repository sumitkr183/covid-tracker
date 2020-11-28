import React,{useState,useEffect} from 'react';
import axios from "axios";

const StatusBar = () => {

    const [allCountry, setAllCountry] = useState([]);

    const sortAscending = (data) => { 
        const sortData = [...data];   
        sortData.sort((a, b) => {
            if(a.cases > b.cases){
                return -1;
            }else{
                return 1;
            }
        })      
        return sortData;
    }

    useEffect(()=>{
        axios({
            method: 'GET',
            url: 'https://disease.sh/v3/covid-19/countries',
            headers: {'Content-type':'application/json'}
          }).then(res=>{               
                const allData = res.data.map(country => (
                    {
                        name: country.country,
                        flag: country.countryInfo.flag,
                        cases: country.cases
                    }
                ))             
                setAllCountry(allData);        
          }).catch(error=>{
            console.log(error);
          });
    },[]);

    return (
        <div className="cover_bar">
            <h3>Coronovirus Cases</h3>
            <div className="cover_bar_table">
                <table>
                    <tr>
                        <th>Country</th>
                        <th>Cases</th>
                    </tr>                
                        {                    
                            sortAscending(allCountry).map(country=>(
                            <tr>
                                <td><img src={country.flag} alt={country.name}/>{country.name}</td>
                                <td>{country.cases}</td>
                            </tr>
                            ))                        
                        }                
                </table>
            </div>
        </div>
    )
}

export default StatusBar
