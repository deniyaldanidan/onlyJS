import {useState, useEffect, useCallback} from 'react'
import axios from 'axios';

const usePost = (postId) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
  
    const fetchPost = useCallback(async()=>{
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            const data = res.data;
            return data
        } catch (error) {
            if(error.response?.status === 404) {
                return {};
            }
            setError(true);
            console.log(error);
            return {}; 
        }
    }, [postId]);

    useEffect(()=>{
        const getPost = async()=>{
          const data = await fetchPost();
          if(postId===1) return setPosts([data]);
          if(!Object.values(data).length) return setHasMore(false);
          setPosts(prev=>[...prev, data]);
        }
        setLoading(true);
        getPost();
        setLoading(false);
      }, [postId, fetchPost]);
  
    return {posts, loading, error, hasMore};
}

export default usePost