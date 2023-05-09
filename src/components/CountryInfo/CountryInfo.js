import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import { apiURL } from '../utils/api';
import animationData from '../../assets/location.json'
import { ReactComponent as Back } from '../../assets/back.svg'
import './CountryInfo.css'



const CountryInfo = () => {

    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { countryName } = useParams();
    const navigate = useNavigate()


    useEffect(() => {
        const getCountryByName = async () => {

            try {
                const res = await fetch(`${apiURL}/name/${countryName}`)
                const data = await res.json()
                setCountries(data[0])
                DelayLoading()

            } catch (error) {
                setIsLoading(false)
                console.log(error.message)

            }
        }
        getCountryByName()

    }, [countryName])

    const DelayLoading = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }


    return (
        <div className='country-info-container' style={{}}>

            <div onClick={() => navigate('/')} className='back-button-wrapper' >
                <Back width={20} height={20} fill='#8A663F' />
                <Link to={'/'} style={{ color: 'inherit', textDecoration: 'inherit' }}>Back</Link>
            </div>

            {isLoading && <div className='loading-container'>
                <div style={{ width: '400px' }}>
                    <Lottie animationData={animationData} loop={true} />
                </div>
                <h2>Loading...</h2>
            </div>}


            {!_.isEmpty(countries) && !isLoading && <div className='country-card-info-wrapper' >

                <div className='country-image-wrapper'>
                    <img className='country-image'  src={countries.flags.png} alt="" />
                </div>

                <div className='country-info-data'>
                    <h3>{countries.name.common}</h3>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '0px 20px' }}>

                        <div className='info-left-text' >
                            <h6>Population: </h6>
                            <h6>Region:</h6>
                            <h6>Sub-Region:</h6>
                            <h6>Capital:</h6>
                            <h6>Currency:</h6>
                        </div>
                        <div className='info-right-text'>
                            <h6>{countries.population}</h6>
                            <h6>{countries.region}</h6>
                            <h6>{countries.subregion}</h6>
                            <h6>{countries.capital}</h6>
                            <h6>{countries.currencies?.[Object.keys(countries.currencies)[0]].name} {`(${countries.currencies?.[Object.keys(countries.currencies)[0]].symbol})`}</h6>
                        </div>

                    </div>

                    <a href={`${countries.maps.googleMaps}`} target="_blank" rel="noreferrer" style={{ color: 'white', textDecoration: 'inherit' }}>
                        <div className='country-info-button-wrapper'>View in Google Map</div>
                    </a>

                </div>


            </div>}

        </div>

    )

}

export default CountryInfo
