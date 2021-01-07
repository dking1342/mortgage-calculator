import React, { useEffect, useState, useCallback } from 'react'
import { useGlobalContext } from './../context';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { numberWithCommas } from './../utils/format';

const Utilities = () => {
    const { setUtilities } = useGlobalContext();
    const [isCheckboxClick, setIsCheckboxClick]=useState(false);
    const [water, setWater]=useState(0);
    const [gas, setGas]=useState(0);
    const [internet, setInternet]=useState(0);
    const [electric, setElectric]=useState(0);
    const [subTotal, setSubTotal]=useState(0);
    const [isOpen, setIsOpen]=useState(false);


    let cb = useCallback(() => {
            return +water + +gas + +internet + +electric;
        },
        [water, gas, internet, electric],
    )

    useEffect(()=>{
        setSubTotal(cb)
    },[cb])

    useEffect(()=>{
        (isCheckboxClick) ? setUtilities(cb) : setUtilities(0);
    },[cb, isCheckboxClick,setUtilities])

    useEffect(() => {
        setIsCheckboxClick(isCheckboxClick);
        (isCheckboxClick) ? setUtilities(cb) : setUtilities(0);
    }, [cb, isCheckboxClick, setUtilities])

    return (
        <article>
            <header>
                <div>
                    <span>Utilities </span>
                    <span>{ `${(isCheckboxClick) ? `$${numberWithCommas(subTotal)} /mo` : 'Not included'}` }</span>
                </div>
                <button className="btn-white" onClick={()=>setIsOpen(!isOpen)}>
                    {(isOpen) ? <FaChevronUp /> : <FaChevronDown /> }
                </button>
            </header>
            <div className={ `${(isOpen) ? "" : "show"}` }>
                <form action="">
                    <div className="form-control">
                        <div className="form-checkbox">
                            <input type="checkbox" name="utilities" value={ isCheckboxClick } onClick={()=> setIsCheckboxClick(!isCheckboxClick)} />
                            <label htmlFor="utilities">Include utilities in payment</label>
                        </div>
                    </div>
                    <div className="form-control">
                        <label htmlFor="water">Water & Sewer $/mo</label>
                        <input 
                            type="number" 
                            name="water" 
                            value={ water }
                            onChange={ (e)=> setWater(e.target.value) }
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="gas">Gas $/mo</label>
                        <input 
                            type="number" 
                            name="gas" 
                            value={ gas }
                            onChange={ (e)=> setGas(e.target.value) }
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="internet">Internet $/mo</label>
                        <input 
                            type="number" 
                            name="internet" 
                            value={ internet }
                            onChange={ (e)=> setInternet(e.target.value) }
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="electric">Electric $/mo</label>
                        <input 
                            type="number" 
                            name="electric" 
                            value={ electric }
                            onChange={ (e)=>setElectric(e.target.value) }
                        />
                    </div>
                </form>
            </div>

        </article>
    )
}

export default Utilities
