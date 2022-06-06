import React, { useState } from 'react'

export default function Main() {
    let [actual, setActual] = useState('');

    function fetchActual() {
        fetch('/actual')
            .then(res => res.text())
            .then(res => setActual(res))
    }

    return (
        <div>
            <h1>Monar Oko !</h1>
            <button onClick={fetchActual}>Actual NFT ?</button>
            <h3>{actual}</h3>
            <button>Fetch NFT list</button>
        </div>
    )
}