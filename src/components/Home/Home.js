import moment from 'moment';
import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEarthquakes } from '../../app/store';

export default function Home() {
    const earthquakes = useSelector((state) => state.earthquakes.entities);
    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [hasError, setHasError] = useState(false);

    const setDates = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
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

    return (
        <div className="pt-20">
            <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
                <div className="py-8">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
                        <div className="min-w-full rounded-lg">
                            <DateRangePicker
                                startDate={startDate}
                                startDateId="startDate"
                                endDate={endDate}
                                endDateId="endDate"
                                onDatesChange={({ startDate, endDate }) => setDates({ startDate, endDate })}
                                focusedInput={focusedInput}
                                onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                                
                            />
                            <button
                                onClick={handleSubmit} 
                                className="ml-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
                            Submit
                            </button>
                        </div>
                        { hasError && (
                            <div className="min-w-full text-red-400">Please select a date range</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
                <div className="py-8">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
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
                                    {earthquakes.map(({id, properties}) => (
                                        <tr key={id}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                {properties.place}
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {moment(properties.time).format("MM/DD/YYYY")}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {properties.mag}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}