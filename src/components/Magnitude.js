import React from 'react';

export default function Magnitude({value}) {
    let color = null;
    let label = "";

    const intValue = parseInt(value);

    switch (intValue) {
        case 1:
            color = "green-600";
            label = "Micro";
            break;
        case 2:
            color = "green-300";
            label = "Minor";
            break;
        case 3:
            color = "yellow-300";
            label = "Minor";
            break;
        case 4:
            color = "yellow-400";
            label = "Light";
            break;
        case 5:
            color = "yellow-600";
            label = "Moderate";
            break;                                
        case 6:
            color = "red-400";
            label = "Strong";
            break;
        case 7:
            color = "red-600";
            label = "Major";
            break;
        case 8:
            color = "fuchsia-500";
            label = "Great";
            break;
        case 9:
            color = "fuchsia-700";
            label = "Great";
            break;                                            
        default:
            color = "green-600";
            label = "Micro";            
            break;
    }

    return (
        <div className="flex" title={`${value} - ${label}`}>
            {[...Array(9).keys()].map((key, i) => {
                return <span key={key} className={(i+1) <= intValue || i === 0 ? `w-2 h-4 mr-1 bg-${color}`: "w-2 h-4 mr-1 bg-gray-200"}></span>
            })}
        </div>
    )
}