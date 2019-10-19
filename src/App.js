import React, {Component} from 'react';


import './App.css';
import CurrencyConverter from './CurrencyConverter/CurrencyConverter';


class App extends Component{
  render ()
  {

  return(
    <div>
       <CurrencyConverter></CurrencyConverter>
    </div> 
    );
  }
}

export default App;
