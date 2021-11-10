import React from 'react';

export default function Magnitude({value}) {
    let color = null;
    let label = "";

    const intValue = parseInt(value);

    switch (intValue) {
        case 1:
            color = "bg-green-600";
            label = "Micro";
            break;
        case 2:
            color = "bg-green-300";
            label = "Minor";
            break;
        case 3:
            color = "bg-yellow-300";
            label = "Minor";
            break;
        case 4:
            color = "bg-yellow-400";
            label = "Light";
            break;
        case 5:
            color = "bg-yellow-600";
            label = "Moderate";
            break;                                
        case 6:
            color = "bg-red-400";
            label = "Strong";
            break;
        case 7:
            color = "bg-red-600";
            label = "Major";
            break;
        case 8:
            color = "bg-fuchsia-500";
            label = "Great";
            break;
        case 9:
            color = "bg-fuchsia-700";
            label = "Great";
            break;                                            
        default:
            color = "bg-green-600";
            label = "Micro";            
            break;
    }

    return (
        <div className="flex" title={`${value} - ${label}`}>
            {[...Array(9).keys()].map((key, i) => {
                return <span key={key} className={(i+1) <= intValue || i === 0 ? `w-2 h-4 mr-1 ${color}`: "w-2 h-4 mr-1 bg-gray-200"}></span>
            })}
        </div>
    )
}