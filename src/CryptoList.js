import React from 'react';

import './CryptoList.css';

const CryptoList = (props) => {
    const rates = props.rates;
    const rateCollection = [];
    for (const sym in rates) {
        const rate = rates[sym];
        rateCollection.push(<li key={rate.id}>Last rate: <span className="rate">{rate.rate} {rate.direction} </span><span className="symbol">{rate.name} {rate.symbol}</span></li>);
    }

    return(
        <ul>
            {rateCollection}
        </ul>
    );
} 

export default CryptoList;
