import React, { useEffect, useState } from 'react';
import { apiURL } from '../utils/api';
import SearchInput from '../Search/SearchInput';
import _ from "lodash";
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';
import { ReactComponent as Search } from '../../assets/search.svg'
import { ReactComponent as Close } from '../../assets/close.svg'
import animationData from '../../assets/location.json'
import './CountriesList.css'



const CountriesList = () => {

    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [queryInput, setQueryInput] = useState(null);

    const getAllCountries = async () => {

        try {
            const res = await fetch(`${apiURL}/all`)
            const data = await res.json()
            setCountries(data)
            DelayLoading()

        } catch (error) {
            setIsLoading(false)
            console.log(error.message)
        }
    }

    const getCountryByName = async () => {

        try {
            setIsLoading(true)
            const res = await fetch(`${apiURL}/name/${queryInput}`)
            const data = await res.json()
            setCountries(data)
            DelayLoading()

        } catch (error) {
            setIsLoading(false)
            console.log(error.message)
        }
    }


    const DelayLoading = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }

    useEffect(() => {
        getAllCountries()
    }, [])


    return (
        <div className='countries-list-container'>

            <div className='countries-list-top-section'>

                <div className='search-logo'>
                    <Search width={20} height={20} fill='#8A663F' />
                </div>

                <SearchInput queryInput={queryInput} setQueryInput={setQueryInput} getAllCountries={getAllCountries} getCountryByName={getCountryByName} />

                <div onClick={() => { setQueryInput("") }} className='close-logo'>
                    <Close width={20} height={20} fill='#8A663F' />
                </div>

            </div>

            {isLoading && <div className='loading-container'>
                <div style={{ width: '400px' }}>
                    <Lottie animationData={animationData} loop={true} />
                </div>
                <h2>Loading...</h2>
            </div>}


            {!isLoading && <div className='countries-list-bottom-section'>

                {countries.length > 0 ?
                    countries && countries?.map(country => (
                        <Link to={`/country/${country.name.common}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            <div className='countries-card-wrapper'>

                                <div className='countries-image-wrapper'>
                                    <img width={250} height={150} src={country.flags.png} alt="" />
                                </div>

                                <div className='country-data'>
                                    <h3>{country.name.common}</h3>
                                </div>

                            </div>
                        </Link>
                    ))
                    : <h1>No such country exist. Kindly try again!</h1>
                }
            </div>}

        </div>

    )

}

export default CountriesList
