import React, { useState } from 'react'

export function HookUseState() {
	const [count, setCount] = useState(0)
	const handleIncrement = () => {
	  setCount(prevState => {return ( prevState + 1 )} )
	}
	const handleDecrement = () => {
          setCount(prevState => {return ( prevState - 1 )} )
        }
	return(
	    <div>
	        <h1>useState hook examples</h1>
	        <div>
	    	   simple state counter
	    	  <div>
		    <div>{count}</div>
		    <button onClick={() => handleIncrement()}>increase</button>
		    <button onClick={() => handleDecrement()}>decrease</button>
	    	  </div>
	        </div>
	    </div>
    )
}
