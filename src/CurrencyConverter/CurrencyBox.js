import React, {Component} from 'react';

import './CurrencyBox.css';


class CurrencyBox extends Component
{
    render() {
        return(
        <div className = "currency-converter">
               { this.props.currencyList.map((item) => {
                return <div className = "currency-box" key= {item.id}>
                <div className ="currency-info">             
                    <div className = "currency-abb"><b>{item.id}</b></div> 
                    <div className = "currency-name">{this.props.base} - {item.id}</div> 
                    <div className = "currency-conversion">1 {this.props.base}= {item.id} {item.conversionRate.toFixed(3)}</div> 
                </div>
                <div className = "currency-amount"> <b>{ (this.props.value * item.conversionRate).toFixed(3)}</b> </div>
                <button className ="remove-button" onClick = {this.props.handleDelete.bind(null, item)}>(-)</button>
             </div>
             })}
        </div>
        );
    }
}

export default CurrencyBox;   