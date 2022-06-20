import {useEffect, useState} from 'react'
import axios from 'axios';

const useBookSearch = (query, pageNumber) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [books, setBooks] = useState([]);
    const [hasMore, setHasMore] = useState(false); 

    useEffect(()=>{
        setBooks([])
    }, [query])

    useEffect(()=>{
        setLoading(true);
        setError(false);
        let cancel;
        axios({
            method: "GET",
            url:"https://openlibrary.org/search.json",
            params: { q: query, page: pageNumber },
            cancelToken: new axios.CancelToken(c=>cancel=c)
        }).then(res=>{
            setBooks(prevBooks => {
                return [...new Set([...prevBooks, ...res.data.docs.map(b=>b.title)])]
            })
            // console.log(res.data);
            setHasMore(res.data.docs.length > 0);
            setLoading(false);
        }).catch(err=>{
            if (axios.isCancel(err)) return;
            setError(true);
            console.log(err)
        })
        return ()=>cancel();
    }, [query, pageNumber])

    return {loading, error, books, hasMore};
}

export default useBookSearch