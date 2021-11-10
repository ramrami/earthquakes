import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export default function Earthquake(props) {
    const navigate = useNavigate();
    const selectedEarthquake = useSelector((state) => state.earthquakes.selectedEarthquake);

    if (!selectedEarthquake) {
        return (
            <div className="pt-32 container mx-auto">
                <button 
                    onClick={() => navigate('/')}
                    className="mb-8 py-2 px-4 bg-gray-200 text-black text-sm font-semibold rounded-lg shadow-md hover:bg-gray-300 mr-auto">&larr; Go back</button>
    
                <h1 className="mb-8 text-xl text-center">Not found</h1>
            </div>
        );    
    }
    
    const { properties } = selectedEarthquake;

    return (
        <div className="pt-32 container mx-auto">
            <button 
                onClick={() => navigate('/')}
                className="mb-8 py-2 px-4 bg-gray-200 text-black text-sm font-semibold rounded-lg shadow-md hover:bg-gray-300 mr-auto">&larr; Go back</button>

            <h1 className="mb-8 text-xl text-center">{properties.place}</h1>

            <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mx-auto">
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Magnitude
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {properties.mag}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Time
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {moment(properties.time).format("DD/MM/YYYY HH:mm:ss")}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Gap
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {properties.gap}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                rms
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {properties.rms}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

        </div>
    )
}