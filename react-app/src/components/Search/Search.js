import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServerQuery } from '../../store/servers';

function Search() {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const results = useSelector((store => store.servers.query)); 
    
    function submitQuery(e) {
        e.preventDefault();
        dispatch(getServerQuery(query));
    }



    return (
        <>
            <form onSubmit={submitQuery}>
                <input 
                    type='text'
                    name='query'
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                <button type='submit'>Search</button>
            </form>
        </>
    )
}

export default Search
