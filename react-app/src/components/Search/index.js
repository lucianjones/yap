import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinServer, getServerQuery } from '../../store/servers';
import './Search.css';

function Search() {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((store => store.session.user));
    const [results, setResults] = useState('');
    
    async function submitQuery(e) {
        e.preventDefault();
        if (query) {
            setResults(await dispatch(getServerQuery(query)))
            setQuery('')
        }
    }

    function join(e, id) {
        e.preventDefault()
        dispatch(joinServer(id));
    }

    const names = user.joined_servers.map(server => server.server_name)

    return (
        <div id='search-div'>
            <form id='search' onSubmit={submitQuery}>
                <input 
                    id='search-input'
                    type='text'
                    name='query'
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                <button id='search-button' type='submit'>Search</button>
            </form>
            { results && 
                <div id='results'>
                    { results.map(result => (
                        <div className='ind-res'>
                            <li key={result.id} className='res-li'>{result.server_name}</li>
                            {!names.includes(result.server_name) && <button id='join' key={result.id} onClick={(e) => join(e, result.id)}>Join</button>} 
                        </div>
                ))}
                </div>
            }
            { results && <div id='search-back' onClick={e => setResults('')}/> }
        </div>
    )
}

export default Search
