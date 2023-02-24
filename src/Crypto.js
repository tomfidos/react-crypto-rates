import React, { Component } from 'react';
import axios from 'axios';

import './Crypto.css';
import CryptoList from './CryptoList';

const baseUrl = 'https://blockchain.info/ticker';

class Crypto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rates: {},
        };
    }

    getRates = () => {
        axios.get(baseUrl, {mode: 'cors'}).then(respone => {
            const data = respone.data;
            const currentRates = this.state.rates;
            for (let sym in data) {
                if (!currentRates.hasOwnProperty(sym)) {
                    currentRates[sym] = {};
                    currentRates[sym]['direction'] = '';
                    currentRates[sym]['rate'] = 0;
                }
                const currentRate = currentRates[sym]['rate'];
                const lastRate = data[sym].last;
                currentRates[sym]['id'] = Date.now().toString() + '_' + data[sym].symbol;
                currentRates[sym]['name'] = sym;
                currentRates[sym]['symbol'] = '';  // TODO
                currentRates[sym]['direction'] = currentRate < lastRate * 0.999 ? 'down' : currentRate > lastRate * 1.001 ? 'up' : 'stable';  // TODO
                currentRates[sym]['rate'] = lastRate;
            }
            this.setState(() => {
                return({
                    rates: currentRates,
                });
            });
        });
    }

    componentDidMount() {
        this.getRates();
        console.log('component mounted');
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
        console.log('compenent unmounted');
    }

    render() {
        return(
            <div>
               <input type="text" placeholder='Filter'/> 
               <CryptoList rates={this.state.rates}/>
            </div>
        );
    }
}

export default Crypto;
