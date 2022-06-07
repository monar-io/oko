import React, { useState } from 'react'

export default function Main() {
    let [actual, setActual] = useState('');
    let [loading, setLoading] = useState('');
    let [list, setList] = useState([]);

    function fetchActual() {
        fetch('/actual')
            .then(res => res.text())
            .then(res => setActual(res));
    }

    function fetchList() {
        setLoading('LOADING...')
        fetch('/list')
            .then(res => res.json())
            .then(res => {
                setList(res);
                setLoading('');
            });
    }

    async function selectNft(nft) {
        setLoading('LOADING...');
        fetch(`/select`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: nft.id,
                name: nft.name,
                description: nft.description,
                ipfs: nft.ipfs
            })
        }).then(res => res.json())
            .then(res => {
                setList([]);
                setLoading('');
            }).catch(error => console.log(error));
    }

    return (
        <div>
            <h1>Monar Oko !</h1>
            <button type="button" onClick={fetchActual}>Actual NFT ?</button>
            <br/>
            <br/>
            <text>{actual}</text>
            <br/>
            <br/>
            <button type="button" onClick={fetchList}>Fetch NFT list</button>
            <b>&emsp;{loading}</b>
            <hr />
            {list.map(nft => {
                return (
                    <div key={nft.id}>
                        <text>{nft.id}</text> <br/>
                        <h3>{nft.name}</h3>
                        <text>{nft.description}</text> <br/><br/>
                        <button onClick={() => selectNft(nft)}>Select</button>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}