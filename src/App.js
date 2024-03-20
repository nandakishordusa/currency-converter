import { useEffect, useState } from 'react';
import './App.css';
import { CurrencyRow } from './CurrencyRow';
import axios from 'axios';

const BASE_URL = 'https://v6.exchangerate-api.com/v6/a43a801886837e2543376a88/latest/USD' 
function App() {
  
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState()
  const [currencyFromInput, setCurrencyFromInput] = useState()
  const [exchangerate, setExchangeRate] = useState()


  let toAmount, fromAmount
    if(currencyFromInput) {
      fromAmount = amount
      toAmount = amount * exchangerate
    }
    else{
      toAmount = amount
      fromAmount = amount * exchangerate
    }

 

  
  function handleFromInput (e) {
      console.log("handleFromInput")
      setAmount(e.target.value)
      setCurrencyFromInput(true)
  }

  function handleToInput (e){
    console.log("handleToInput")
    setAmount(e.target.value)
    setCurrencyFromInput(false)
  }


  useEffect(() => {
    axios.get(BASE_URL)
      .then(res => {
        setCurrencyOptions([...Object.keys(res.data.conversion_rates)])
        setFromCurrency("USD")
        setToCurrency("USD")
        setExchangeRate(1)
        setAmount(1)
        setCurrencyFromInput(true)
      })
  },[])

  useEffect(() => {
    let from,to
    if(currencyFromInput){
      from = fromCurrency
      to = toCurrency
    }
    else  {
      from = toCurrency
      to = fromCurrency
    }
    const URL = 'https://v6.exchangerate-api.com/v6/a43a801886837e2543376a88/pair/' + from + '/' + to + '/' + amount
    

    if(!isNaN(amount) && from !== undefined && to !== undefined){
      axios.get(URL)
      .then(res => {
        setExchangeRate(res.data.conversion_rate)
      })
    }
  },[amount,fromCurrency,toCurrency])



  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions} 
        selectedCurrency = {fromCurrency}
        amount = {fromAmount}
        handleInput={handleFromInput}
        handleCurrencyChange = {e => setFromCurrency(e.target.value)}
      />
      <div className='equals'>=</div>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        amount = {toAmount}
        handleInput= {handleToInput}
        handleCurrencyChange = {e => {setToCurrency(e.target.value)}}
      />
    </>
  );
}

export default App;
