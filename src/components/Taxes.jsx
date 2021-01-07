import React, { useEffect, useState, useCallback } from 'react';
import { useGlobalContext } from './../context';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { numberWithCommas } from './../utils/format';

const Taxes = () => {
    const { homePrice, propTaxes, setPropTaxes } = useGlobalContext();
    const [taxRate, setTaxRate]=useState(0.95)
    const [yearlyTax, setYearlyTax]=useState(()=> homePrice * taxRate / 100);
    const [isOpen, setIsOpen]=useState(false);

    
    // callbacks
    let cbYearTax = useCallback(() => {
            return Math.round(homePrice * taxRate / 100);
        },
        [homePrice, taxRate],
    )

    let cbMonthTax = useCallback(() => {
            return Math.round(yearlyTax / 12);
        },
        [yearlyTax],
    )

    
    // useEffects
    useEffect(()=>{
        setYearlyTax(cbYearTax);
    },[cbYearTax])
    
    useEffect(()=>{
        setPropTaxes(cbMonthTax);
    },[cbMonthTax, setPropTaxes])

    return (
        <article>
            <header>
                <div>
                    <span>Property Taxes </span>
                    <span>{ `$${numberWithCommas(propTaxes)}/mo` }</span>
                </div>
                <button className="btn-white" onClick={()=>setIsOpen(!isOpen)}>
                    {(isOpen) ? <FaChevronUp /> : <FaChevronDown /> }
                </button>
            </header>
            <div className={ `${(isOpen) ? " " : "show"}` }>
                <form action="" onSubmit={ (e)=> e.preventDefault()}>
                    <div className="form-control">
                        <p>Home price</p>
                        <p>${ homePrice }</p>
                        <p>x</p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="taxRate">Tax rate</label>
                        <input type="number" value={ Number(taxRate) }  onChange={ (e)=> setTaxRate(e.target.value) }/>
                    </div>
                    <div className="form-control">
                        <p>=</p>
                        <p>${yearlyTax}/year</p>

                    </div>
                </form>
                <small>
                    This estimate is based on the home value and an estimated local tax rate. Actual rate may vary.
                </small>
            </div>
        </article>
    )
}

export default Taxes
