import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { DateRangePicker } from 'react-dates';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import Magnitude from './Magnitude';
import { fetchEarthquakes, setEndDate, setSelectedEarthquake, setSortOption, setStartDate } from '../store';
import { useNavigate } from 'react-router';

const sortOptions = [
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
    { value: "location-asc", label: "Location ASC" },
    { value: "location-desc", label: "Location DESC" },
    { value: "magnitude-asc", label: "Magnitude ASC" },
    { value: "magnitude-desc", label: "Magnitude DESC" },
]

export default function Home() {
    const startDate = useSelector((state) => state.earthquakes.startDate);
    const endDate = useSelector((state) => state.earthquakes.endDate);
    const earthquakes = useSelector((state) => state.earthquakes.entities);
    const loading = useSelector((state) => state.earthquakes.loading);
    const error = useSelector((state) => state.earthquakes.error);
    const sortOption = useSelector((state) => state.earthquakes.sortOption);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [focusedInput, setFocusedInput] = useState(null);
    const [hasError, setHasError] = useState(false);

    const setDates = ({ startDate, endDate }) => {
        dispatch(setStartDate(startDate));
        dispatch(setEndDate(endDate));
    }

    const handleSubmit = () => {
        if (!startDate || !endDate) {
            setHasError(true);
            return;
        }

        setHasError(false);

        dispatch(
            fetchEarthquakes({
                startDate: startDate.format('YYYY-MM-DD'), 
                endDate: endDate.format('YYYY-MM-DD')
            })
        );     
    }

    const handleClick = (earthquake) => {
        dispatch(setSelectedEarthquake(earthquake));
        navigate(`/earthquakes/${earthquake.id}`);
    }

    const sortedEarthquakes = useMemo(() => {
        return earthquakes.concat().sort((a, b) => {
            if (sortOption.value === "oldest") {
                return new Date(a.properties.time) - new Date(b.properties.time);              
            }

            if (sortOption.value === "location-asc") {
                return a.properties.place > b.properties.place;              
            }  

            if (sortOption.value === "location-desc") {
                return b.properties.place > a.properties.place;              
            }              

            if (sortOption.value === "magnitude-asc") {
                return a.properties.mag - b.properties.mag;              
            }            

            if (sortOption.value === "magnitude-desc") {
                return b.properties.mag - a.properties.mag;              
            }                        

            // default - newest
            return new Date(b.properties.time) - new Date(a.properties.time);              
        })

    }, [earthquakes, sortOption]);

    return (
        <div className="pt-32">
            <h1 className="text-lg text-center mb-8">Earthquake information from USGS API</h1>
            <div className="container mx-auto px-4 mb-8 sm:px-8 max-w-3xl">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8">
                    <div className="min-w-full rounded-lg flex">
                        <DateRangePicker
                            startDate={startDate}
                            startDateId="startDate"
                            endDate={endDate}
                            endDateId="endDate"
                            onDatesChange={({ startDate, endDate }) => setDates({ startDate, endDate })}
                            focusedInput={focusedInput}
                            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                            displayFormat="DD/MM/YYYY"
                            isOutsideRange={() => false}
                            block
                        />
                        <button
                            onClick={handleSubmit} 
                            className="ml-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
                            {loading === "pending" && !error ? "Loading..." : "Submit"}
                        </button>
                    </div>
                    { hasError && (
                        <div className="min-w-full text-red-400 text-left mt-1">Please select a date range</div>
                    )}
                </div>
            </div>

            <div className="container mx-auto mb-4 px-4 sm:px-8 max-w-3xl">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8">
                    <div className="min-w-full rounded-lg flex items-center">
                        <span className="mr-2">Sort by</span> 
                        <Select options={sortOptions} defaultValue={sortOption} onChange={(selected) => dispatch(setSortOption(selected))}/>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-16 sm:px-8 max-w-3xl">
                <div className="">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                            Location
                                       </th>
                                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                            Date
                                        </th>
                                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                            Magnitude
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedEarthquakes.length === 0 ? 
                                        (
                                            <tr>
                                                <td colSpan="3" className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="text-center">                                            
                                                        No data available
                                                    </div>
                                                </td>
                                            </tr>                                                                                    
                                        )
                                        : sortedEarthquakes.map((earthquake) => {
                                            const { id, properties } = earthquake;
                                            return (
                                                <tr key={id} className="cursor-pointer bg-white hover:bg-gray-50" onClick={() => handleClick(earthquake)}>
                                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                                        <div className="flex items-center">
                                                        {properties.place}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {moment(properties.time).format("DD/MM/YYYY")}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                                        <Magnitude value={properties.mag} />
                                                    </td>
                                                </tr>
                                            )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}