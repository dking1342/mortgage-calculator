import React, { useEffect, useState, useCallback } from 'react';
import { useGlobalContext } from './../context';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { numberWithCommas } from './../utils/format';

const HomeInsurance = () => {
    const { hInsurance, sethInsurance } = useGlobalContext();
    const [homeInsurance, setHomeInsurance]=useState(500);
    const [isOpen, setIsOpen]=useState(false);

    let cb = useCallback(() => {
            return Math.round(homeInsurance / 12);
        },
        [homeInsurance],
    )

    useEffect(() => {
        sethInsurance(cb);
    }, [cb, sethInsurance])

    return (
        <article>
            <header>
                <div>
                    <span>Home Insurance </span>
                    <span>{ `$${numberWithCommas(hInsurance)}/mo` }</span>
                </div>
                <button className="btn-white" onClick={()=>setIsOpen(!isOpen)}>
                    {(isOpen) ? <FaChevronUp /> : <FaChevronDown /> }
                </button>
            </header>
            <div className={ `${(isOpen) ? "" : "show"}` }>
                <form action="">
                    <div className="form-control">
                        <p>Yearly Insurance $</p>
                        <input type="text" value={ homeInsurance } onChange={ (e)=> setHomeInsurance(e.target.value) } />
                    </div>
                </form>
                <small>
                    Most lenders require homeowners insurance, which protects your home and property.
                </small>
            </div>
        </article>
    )
}

export default HomeInsurance
