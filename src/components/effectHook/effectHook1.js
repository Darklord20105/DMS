
import React, { useState, useEffect } from "react";

const m = [
        {name: 'ahmed', age: 25},
        {name: 'beluga',age: 56},
        {name: 'caress', age: 13},
]

export function UseCaseDataLoader() {
	const [data, setData] = useState([])
        useEffect(() => {
                start()
                return () => clean()
        }, [])
        const start = () => {
                //alert('works')
                setTimeout(() => {
                        setData(m)
                }, 3000)
        }
        const clean = () => {
                //alert('exit')
                setTimeout(() => {
                        setData([])
                }, 3000)
        }
        return(
                <div>
                  {data.length> 0 && data.map(item => {
                    return <h4>name is ${item.name}, and i am ${item.age}</h4>
                  })}
                  {data.length == 0 &&  <h3>loading</h3>}
                  <button onClick={() => setData(m)}>load</button>
                  <button onClick={() => clean()}>clear</button>
                </div>
        )
}

