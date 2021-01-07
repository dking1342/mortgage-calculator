<h1>Mortgage Calculator</h1>
<h2>Prerequisites</h2>
<a href="https://www.reactjs.org">React</a><br></br>
<h2>Overview</h2>
<p>
The goal of this app was to make a monthly expense calculator for a house payment using React. The calculator would have multiple facets of the various payments that would ultimately tally to a grand total. Each aspect of the payment would have their own permutations and calculations to find its respective subtotal.
</p>
<p>
This exercise makes use of some key concepts in React. It was made exclusively with functional components which means that various hooks were used. The hooks being used were useState, useEffect, useContext, useCallback. Finding the data that needed to be global and local for the best performance took some planning. This had an impact on when and what to place inside the context file. 
</p>
<p>
The useEffect and useCallback hooks were especially important when making changes to the calculator fields. The challenge was to ensure the values changed when the user enters data into the input fields, but not needing to re-render the entire calculator. That means only the affected input fields should change and it shouldn't affect each piece of state in the entire app.
</p>
<h2>Getting Started</h2>
<p>
Follow the instructions below:
</p>

```
$mkdir demo
$cd demo
$git clone // copy and paste the repo url here //
```

<p>
Next use npm to install all the dependencies (the only one I installed was react-icons) and start the dev server. 
</p>

```
$npm install && npm start
```

<h2>Project Setup</h2>
<h3>Components and Important Files</h3>
<h4>Context</h4>
<p>
Import React along with the useState, useEffect, useContext and useCallback hooks. Go through the rest of the standard setup by initializing the AppContext and creating the AppProvider function. I used a custom, global hook for useContext to avoid importing both the AppContext and AppProvider in each component. You can do it either way and depends on your preference.
</p>
<p>
The next step runs parallel to the project development. However, since this will explain this file, then you will use the useState hook to create state. The state needed will be the subtotals for each section. You can put the initial values to whatever you find appropriate, but I put the home price at $100,000 while the rest were $0. 
</p>
<p>
The grand total is found through the useCallback which internally has a reduce method which evaluates an array filled with the subtotal state. A useEffect hook is used to update it whenever one of the subtotals changes.
</p>
<h4>Utils</h4>
<p>
The utils folder has one file called format.js. This is a function that will convert the format of the number where applicable to include commas in the appropriate place.
</p>
<h4>
App and MonthlyTotal Components
</h4>
<p>
These are fairly simple as there isn't much work done to these components. The App component only needs to have the AppProvider imported from the context.js file. Then you will wrap the AppProvider tag around the App element.
</p>
<p>
In the MonthlyTotal component you'll need to import all the components that will go into the calculator. I have made a mortgage, taxes, HOA, home insurance and utilities component. You'll need to import the global context for the grand total that will be in this component.
</p>
<h4>
Mortgage
</h4>
<p>
In the Mortgage component there are five pieces of state: home price, down payment, down payment percentage, loan duration and the interest rate. The values will be placed within input fields and when changed will adjust accordingly.
</p>
<p>
I'm not sure if it is necessary, but I needed to include a reference for these input fields. The problem when using the state value is that the change is always one step behind. Perhaps a better fix would be to have this incorporated into the useCallback function, but I found the useRef hook worked for what I needed it to do which was updating the various values as the user changes the input fields. This was especially difficult when I added a feature so that if the user changed the down payment percentage then the down payment dollar amount would change. It worked in reverse as well.
</p>
<p>
I added the useCallback hook to update each of these four component state when the user changed any of the values. The exception was the home price which is a global state, but the callback took in this global state in order for the callback function to work and output the subtotal. This was then put into the useEffect hook to update anytime the callback function output was changed, or the other pieces of state.
</p>

```
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

```

<h4>
Taxes, Home Insurance and HOA Components
</h4>
<p>
These components were pretty straightforward. They didn't have many moving parts or pieces of state. In these components it was a matter of either dividing the user input by 12 (months) or performing one other calculation. The useCallback hook was used in these components to update the affected input value. The useEffect was then made and the callback value was entered into the useEffect hook.
</p>
<h4>
Utilities
</h4>
<p>
Apart from the similarity to the other components, the difference in this component was the ability for the user to toggle back and forth to include or not include the utilities in the grand total. This was achieved by adding a checkbox input field. The boolean nature of the checkbox would allow the user to include with a truth/checked or not include in the checkbox was false/unchecked.
</p>
<h2>
Conclusion
</h2>
<p>
This exercise was made as a means of practicing React. The idea came from the Zillow mobile app and the calculator that is there within it. I can understand the Zillow calculator would be a bit more complex than what I've done, and styled better, but the exercise did accomplish the goal of building this calculator. 
</p>


