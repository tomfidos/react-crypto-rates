import React, { Component } from 'react';
import './Crypto.css';
import CryptoList from './CryptoList';

class Crypto extends Component {

    render() {
        return(
            <div>
               <input type="text" placeholder='Filter'/> 
               <CryptoList />
            </div>
        );
    }
}

export default Crypto;
