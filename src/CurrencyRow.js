import React from 'react'

export const CurrencyRow = ({amount, handleInput, handleCurrencyChange, selctedCurrency, currencyOptions}) => {

  
  return (
    <div>
        <input onChange = {handleInput} type='number' className='input' value={amount}/>
        <select value={selctedCurrency} onChange={handleCurrencyChange}>
            {currencyOptions.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
            ))}
        </select>
    </div>
  )
}
