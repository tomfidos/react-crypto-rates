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
            areCurrenciesFiltered: false,
        };
    }

    getRates = () => {
        axios.get(baseUrl, {mode: 'cors'}).then(respone => {
            const data = respone.data;
            const currentRates = this.state.rates;

            for (let sym in data) {
                if (!this.state.areCurrenciesFiltered) {
                    if (!currentRates.hasOwnProperty(sym)) {
                        currentRates[sym] = {};
                        currentRates[sym]['rate'] = 0;
                    }
                } else if (!currentRates.hasOwnProperty(sym)) {
                    continue;
                }
                const ticker = currentRates[sym];
                const currentRate = ticker['rate'];
                const lastRate = data[sym].last;
                if (currentRate < lastRate) {
                    ticker['direction'] = String.fromCharCode(8593);
                    ticker['class'] = 'green';
                } else if (currentRate > lastRate) {
                    ticker['direction'] = String.fromCharCode(8595);
                    ticker['class'] = 'red';
                } else {
                    ticker['direction'] = String.fromCharCode(8596);
                    ticker['class'] = 'blue';
                }
                ticker['id'] = Date.now().toString() + '_' + data[sym].symbol;
                ticker['name'] = sym;
                ticker['rate'] = lastRate;
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
        this.timerId = setInterval(() => this.getRates(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
        console.log('component unmounted');
    }

    filterCurrencies = (event) => {
        const currentRates = this.state.rates;
        const symbol = event.target.value.trim().toUpperCase();
        const filteredRates = Object.fromEntries(Object.entries(currentRates)
            .filter(([key]) => key.includes(symbol)));
        if (Object.keys(filteredRates).length > 0 && symbol !== '') {
            this.setState(() => {
                return({
                    rates: filteredRates,
                    areCurrenciesFiltered: true,
                });
            });
        } else {
            this.setState(() => {
                return({
                    areCurrenciesFiltered: false,
                });
            });
        }
    }

    render() {
        return(
            <div>
               <input type="text" placeholder='Filter' onChange={this.filterCurrencies}/> 
               <CryptoList rates={this.state.rates}/>
            </div>
        );
    }
}

export default Crypto;
