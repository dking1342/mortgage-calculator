import React, { useEffect, useState, useContext, useCallback } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [monthlyTotal, setMonthlyTotal]=useState(0);
    const [homePrice, setHomePrice]=useState(100000);
    const [mortgage, setMortgage]=useState(0);
    const [propTaxes, setPropTaxes]=useState(0);
    const [hInsurance, sethInsurance]=useState(0);
    const [hoa, setHoa]=useState(0);
    const [utilities, setUtilities]=useState(0);


    let cb = useCallback(
        () => {
            let sum = [mortgage, propTaxes, hInsurance, hoa, utilities].reduce((acc, val)=>{
                acc = acc + val;
                return acc;
            },0)
            return sum;
        },
        [mortgage, propTaxes, hInsurance, hoa, utilities],
    )


    useEffect(()=>{
        setMonthlyTotal(cb);
    },[cb]);

    return <AppContext.Provider value={{
        homePrice,
        mortgage,
        propTaxes,
        monthlyTotal,
        hInsurance,
        setUtilities,
        setHoa,
        sethInsurance,
        setPropTaxes,
        setMortgage,
        setHomePrice
    }}>
        { children }
    </AppContext.Provider>

}

// custom hook
export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {
    AppContext,
    AppProvider
}
