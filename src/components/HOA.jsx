import React, { useEffect, useState, useCallback } from 'react'
import { useGlobalContext } from './../context';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { numberWithCommas } from './../utils/format';

const HOA = () => {
    const { setHoa } = useGlobalContext();
    const [monthlyHoa, setMonthyHoa]=useState(150);
    const [isOpen, setIsOpen]=useState(false);

    let cb = useCallback(() => {
            setHoa(Number(monthlyHoa))
        },
        [monthlyHoa, setHoa],
    )
    
    useEffect(()=>{
        cb()
    },[cb])

    return (
        <article>
            <header>
                <div>
                    <span>HOA fees </span>
                    <span>{ `$${numberWithCommas(monthlyHoa)}/mo` }</span>
                </div>
                <button className="btn-white" onClick={()=>setIsOpen(!isOpen)}>
                    {(isOpen) ? <FaChevronUp /> : <FaChevronDown /> }
                </button>
            </header>
            <div className={ `${(isOpen) ? "" : "show"}` }>
                <form action="">
                    <div className="form-control">
                        <p>Monthly fees $</p>
                        <input type="text" value={ monthlyHoa } onChange={ (e)=> setMonthyHoa(e.target.value) } />
                    </div>
                </form>
                <small>
                    Some properties require monthly HOA dues to cover common amenities or services.
                </small>
            </div>
        </article>
    )
}

export default HOA
