import React,{useState, useEffect} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import StatusCard from './components/StatusCard';
import axios from 'axios';
import StatusBar from './components/StatusBar';
import ChartMap from './components/ChartMap';
import 'leaflet/dist/leaflet.css';

function App() {
  const initialState = {
    'total_cases' : false,
    'total_recovered' : false,
    'total_deaths' : false,
    'cases' : false,
    'recovered' : false,
    'deaths' : false,
    'lat' : 34.80746,
    'lng' : -40.4796,
    'zoom' : 2
  };


  const [coutries, setCoutries] = useState(initialState);
  const [contriesName, setCoutriesName] = useState([]);
  
  useEffect(()=>{
    setCoutries({
      ...initialState,
      'total_cases' : '...',
      'total_recovered' : '...',
      'total_deaths' : '...',
      'cases' : '...',
      'recovered' : '...',
      'deaths' : '...'
    })

    axios({
      method: 'GET',
      url: 'https://disease.sh/v3/covid-19/all',
      headers: {'Content-type':'application/json'}
    }).then(res=>{
      if(res.data){
        setCoutries({
          ...initialState,
          'total_cases' : res.data.cases,
          'total_recovered' : res.data.recovered,
          'total_deaths' : res.data.deaths,
          'cases' : res.data.todayCases,
          'recovered' : res.data.todayRecovered,
          'deaths' : res.data.todayDeaths
        })        
      }    
    }).catch(error=>{
      console.log(error);
    });

  },[])

  useEffect(() => {
    

  }, [initialState])

  return (
    <div className="App">

      {/* Cover Container */}
      <div className="container">
        <div className="row">
          <div className="col-md-8">

            {/* Header */}
            <Header setCoutries={setCoutries} setCoutriesName={setCoutriesName}/>

            {/* Status Cards */}
            <div className="row">
              <StatusCard name="Cases" textColor="blue" 
                totalCases={coutries.total_cases} cases={coutries.cases}/>
              <StatusCard name="Recovered" textColor="green" 
                totalCases={coutries.total_recovered} cases={coutries.recovered}/>
              <StatusCard name="Deaths" textColor="red" 
                totalCases={coutries.total_deaths} cases={coutries.deaths}/>
            </div>

            {/* Chart Status */}
            <ChartMap coutries={coutries} contriesName={contriesName}/>
            

          </div>
          <div className="col-md-4">

            {/* Table Status */}
            <StatusBar/>

          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
