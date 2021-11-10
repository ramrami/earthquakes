import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';

import 'react-toastify/dist/ReactToastify.css';

export default function CheckEarthquake() {
    useEffect(() => {
        const interval = setInterval(() => {
            const today = moment().format('YYYY-MM-DD');
            const startDate = `${today}T00:00:00`;
            const endDate = moment().format('YYYY-MM-DDTHH:mm:ss');
    
            const requestUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&limit=2`;
            axios.get(requestUrl)
            .then(response => {
                const count = response.data.metadata.count;
                if (count > 0) {
                    toast.warn("An earthquake happened today !")
                }
            })
        }, 10 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return <ToastContainer limit={1}/>
}