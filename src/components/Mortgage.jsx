import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGlobalContext } from './../context';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { numberWithCommas } from './../utils/format';

const Mortgage = () => {
    const { homePrice, setHomePrice, mortgage, setMortgage } = useGlobalContext();
    const [downPaymentPerc, setDownPaymentPerc]=useState(20);
    const [downPayment,setDownPayment]=useState(()=> homePrice * downPaymentPerc / 100 )
    const [loan, setLoan]=useState(30);
    const [interestRate, setInterestRate]=useState(3);
    const [isOpen, setIsOpen]=useState(false);
    
    // refs
    let downPaymentValue = useRef(null);
    let downPayPercValue = useRef(null);
    let homePriceValue = useRef(null);

    // functions
    const handleChangeDownPayment = (e, type) => {
        if(type === 'dp'){
            if(Number(e.target.value) > homePrice){
                setDownPayment(homePrice)
                setDownPaymentPerc( 100 );
            } else if(Number(e.target.value) < 1){
                setDownPayment(0)
                setDownPaymentPerc( 0 );
            } else{
                setDownPayment(e.target.value)
                let newPerc = downPaymentValue.current.value / homePrice;
                setDownPaymentPerc( newPerc * 100 );
            }
        }
        if(type === 'perc'){
            if(Number(e.target.value) > 100){
                setDownPayment(homePrice)
                setDownPaymentPerc( 100 );
            } else if(Number(e.target.value) < 1){
                setDownPayment(0)
                setDownPaymentPerc( 0 );
            } else{
                setDownPaymentPerc(e.target.value)
                let newDp = (downPayPercValue.current.value / 100) * homePrice;
                setDownPayment(newDp);
            }
        }            
    }

    const handleHomePriceChange = (e) => {
        setHomePrice(e.target.value);
        let hp = homePriceValue.current.value;
        let newDownPayment = (downPayPercValue.current.value / 100) * hp;
        setDownPayment(newDownPayment);
    }

    // callback
    let cb = useCallback(() => {
            let principal = homePriceValue.current.value - downPaymentValue.current.value;
            let i;
            ((interestRate / 100) / 12) ? i = (interestRate / 100) / 12 : i = 0;
            let n = loan * 12;
    
            // formula
            let monthly = Math.round(principal * ( i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1 ));
            return monthly;
        },
        [homePriceValue,downPaymentValue, interestRate, loan],
    )

    // useEffects
    useEffect(()=>{
        setMortgage(cb);
    },[cb, setMortgage,homePrice,downPayment,downPaymentPerc,loan,interestRate])


    return (
        <article>
            <header>
                <div>
                    <span>Mortgage  </span>
                    <span>{ `$${numberWithCommas(mortgage)}/mo` }</span>
                    </div>
                <button className="btn-white" onClick={()=>setIsOpen(!isOpen)}>
                    {(isOpen) ? <FaChevronUp /> : <FaChevronDown /> }
                </button>
            </header>
            <div className={ `${(isOpen) ? " " : "show"}` }>                
                <form action="">
                    <div className="form-control">
                        <label htmlFor="price">Home price $</label>
                        <input 
                            type="number" 
                            name="price" 
                            ref={ homePriceValue }
                            value={ homePrice } 
                            onChange={ (e)=> handleHomePriceChange(e) }
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="payment">Down payment $</label>
                        <input 
                            type="number" 
                            name="payment" 
                            ref={ downPaymentValue }
                            value={ Math.round(downPayment) }
                            onChange={ (e)=> handleChangeDownPayment(e,'dp') }
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="percentage">Down payment %</label>                        
                        <input 
                            type="number" 
                            name="percentage" 
                            ref={ downPayPercValue }
                            value={ Math.round(downPaymentPerc) }
                            max={ 100 }
                            min={ 0 } 
                            onChange={ (e)=> handleChangeDownPayment(e,'perc') }
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="loanDuration">Loan program</label>
                        <select name="loan" onChange={ (e)=> setLoan(Number(e.target.value)) } >
                            <option value="30">30 year fixed</option>
                            <option value="15">15 year fixed</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label htmlFor="interest">Interest rate %</label>
                        <input 
                            type="number" 
                            name="interest"
                            value={ Math.round(interestRate)  }
                            onChange={ (e)=> (e.target.value < 1) ? setInterestRate(0) : setInterestRate(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        </article>
    )
}

export default Mortgage
