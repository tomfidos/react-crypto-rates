import React, { Component } from 'react';
import axios from 'axios';

import './Crypto.css';
import CryptoList from './CryptoList';

const baseUrl = 'https://blockchain.info/ticker';

class Crypto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rateList: [],
        };
    }

    getRates = () => {
        axios.get(baseUrl, {mode: 'cors'}).then(respone => {
            const data = respone.data;
            const reformattedData = [];
            for (let sym in data) {
                reformattedData.push({
                    id: Date.now().toString() + '_' + data[sym].symbol,
                    name: sym,
                    rate: data[sym].last,
                    symbol: '',
                });
            }
            this.setState(state => {
                return({
                    rateList: state.rateList.concat(reformattedData)
                });
            });
        });
    }

    componentDidMount() {
        this.getRates();
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
        
    }

    render() {
        return(
            <div>
               <input type="text" placeholder='Filter'/> 
               <CryptoList rateList={this.state.rateList}/>
            </div>
        );
    }
}

export default Crypto;
