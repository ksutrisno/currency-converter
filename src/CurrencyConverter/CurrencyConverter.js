import React, {Component} from 'react';

import './CurrencyConverter.css';
import SelectSearch from 'react-select-search'
import CurrencyBox from './CurrencyBox';


const options = [];

class CurrencyConverter extends Component
{
    constructor(props)
    {
        super(props);
        this.handleBaseChange = this.handleBaseChange.bind(this);
        this.handleBaseSubmit = this.handleBaseSubmit.bind(this);
        this.handleNewCurrency = this.handleNewCurrency.bind(this);
    }

    state = {
        isFormActive: false,
        base:null,
        date:null,
        rates:[],
        value: (10).toFixed(3),
        currency:"",
        currencyList: []
      }


      async componentDidMount() {
        const url = 'https://api.exchangeratesapi.io/latest?base=USD';
        const response = await fetch(url);
        const data = await response.json();
        this.setState(
            {
                base:data.base,
                date:data.date,
                rates:data.rates
            });
            
          
            for (var i=0; i < Object.keys(data.rates).length; i++) {
                var newElement = {};
                newElement['name'] = Object.keys(data.rates)[i];
                newElement['value'] = Object.keys(data.rates)[i];
                options.push(newElement);
            }

            this.addNewCurrency('JPY');
            this.addNewCurrency('IDR');
            this.addNewCurrency('GBP');
      }

    handleBaseChange(event) {
        this.setState({value: event.target.value});
        event.preventDefault();
    }

    handleBaseSubmit(event) {
        this.setState({value: event.target.value});
        event.preventDefault();
    }

    handleNewCurrency(event) {
          this.setState({currency:event.value});
    }

    
    addNewCurrency(id)
    {    
        if(id != null)
        {
            var newElement = {};
            newElement['id'] = id;
            newElement['conversionRate'] = this.state.rates[id];
            this.state.currencyList.push(newElement);  
        }
        else if(this.state.rates[this.state.currency] != null)
        {
            var newElement = {};
            newElement['id'] = this.state.currency;
            newElement['conversionRate'] = this.state.rates[this.state.currency];
            this.state.currencyList.push(newElement);  
        }

       
        this.setState({currency: ""});
        this.showForm(false);

    }

    handleDelete(itemToBeDeleted)
    {
       var newList = this.state.currencyList.filter((item)=>{
            return item != itemToBeDeleted
       });

       this.setState({currencyList:newList});
    }

    showForm(isActive)
    {
        this.setState({isFormActive:isActive});
    }


    render () {
        const isFormActive = this.state.isFormActive;

        return (
            <div>
                <h1>Currency Converter</h1>
            
                <div className = "currency-converter">
                <div>
                    <form className = "base-currency"  onSubmit={e => { e.preventDefault(); }} >
                        <label>
                            <i>United States Dollar</i>
                            <br></br>   
                            <b>USD</b>                    
                        </label>
                        <input type="text" placeholder= {this.state.value} onChange={this.handleBaseChange} />
                    </form>
                </div>
              
                <CurrencyBox handleDelete = {this.handleDelete.bind(this)} base = {this.state.base}  value = {this.state.value} currencyList = {this.state.currencyList}/>
                        
                {isFormActive ? 
                 ( <div className = "dropdown">  
                 <SelectSearch className = "select-search-box" options={options} value={this.state.currency} placeholder="Select Currency" 
                    onChange = {this.handleNewCurrency}  /> 
                     <button className ="submit-button" onClick = {()=>this.addNewCurrency()}>Submit </button>
                     </div>)  : 
                 (<button className ="add-button" onClick = {()=>this.showForm(true)}>(+) Add new currency</button>)
                }

                </div>
            </div>
        );
    }
}



export default CurrencyConverter;

