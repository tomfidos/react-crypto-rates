import React from 'react';

import './CryptoList.css';

const CryptoList = (props) => {
    const rateList = props.rateList.map(currency => <li key={currency.id}>Last rate: <span className="rate">{currency.rate} </span><span className="symbol">{currency.name} {currency.symbol}</span></li>);

    return(
        <ul>
            {rateList}
        </ul>
    );
} 

export default CryptoList;
