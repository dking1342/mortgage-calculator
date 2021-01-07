import React from 'react'

// components
import Mortgage from './Mortgage';
import Taxes from './Taxes';
import HomeInsurance from './HomeInsurance';
import HOA from './HOA';
import Utilities from './Utilities';
import { useGlobalContext } from './../context';
import { numberWithCommas } from './../utils/format';

const MonthlyTotal = () => {
    const { monthlyTotal } = useGlobalContext();
    return (
        <section>
            <h4>Estimated monthly cost</h4>
            <h5>${ numberWithCommas(monthlyTotal) }/mo</h5>
            <div className="container">
                <Mortgage />
                <Taxes />
                <HomeInsurance />
                <HOA />
                <Utilities />
            </div>
        </section>
    )
}

export default MonthlyTotal
