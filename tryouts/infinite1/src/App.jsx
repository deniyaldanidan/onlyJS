import React, {useState, useCallback, useRef} from 'react';
import Post from './Post';
import usePost from './usePost';

function App() {
  const [postId, setPostId] = useState(1);
  const {loading, error, posts, hasMore} = usePost(postId);
  
  const observer = useRef();
  const lastPost = useCallback(node=>{
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries=>{
      // console.log(entries[0])
      if (entries[0].isIntersecting && hasMore){
        setPostId(prev=>prev+1);
      }
    });
    if(node) observer.current.observe(node);
  },[loading, hasMore] )

  return (
    <div className="App">
      {posts.length ? posts.map((post, index)=>{
        if (posts.length===(index+1)) {
          return <Post key={index} ref={lastPost} post={post} />
        }

        return <Post key={index} post={post} />
      }) :""}

      {loading ? <div className="infoBar">Loading...</div> : ""}
      {error ? <div className="errorBar">Error Happened</div> : ""}
      {!hasMore ? <div className="infoBar">The End</div> : ""}
    </div>
  );
}

export default App;
