import './App.css'
import { Routes, Route } from 'react-router-dom'
import CountriesList from './components/CountriesList/CountriesList';
import CountryInfo from './components/CountryInfo/CountryInfo';


function App() {
  return (
    <>
    <div className='header'>
      <div className='header-wrapper'>
        <div className='header-text'>The Countries</div>
      </div>
    </div>
    <div >
      <Routes>
        <Route path='/' element={<CountriesList/>}/>
        <Route path='/country/:countryName' element={<CountryInfo/>}/>
      </Routes>

    </div>
    </>
  );
}

export default App;
