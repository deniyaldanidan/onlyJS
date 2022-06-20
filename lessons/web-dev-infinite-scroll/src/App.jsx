import { useState, useRef, useCallback } from "react";
import useBookSearch from "./useBookSearch";

const logStyles = {
  color: "red",
  textAlign: "center"
}

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, hasMore, books } = useBookSearch(query, pageNumber);
  
  const observer = useRef();
  const lastBookElementRef = useCallback(node=>{
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && hasMore){
        setPageNumber(prev=>prev+1);
      }
    }, {
      
    })
    if(node) observer.current.observe(node)
    console.log(node)
  }, [loading, hasMore]);

  const handleSearch = (e)=>{
    setQuery(e.target.value);
    setPageNumber(1);
  }


  return (
    <div className="App">
      <input type="text" value={query} onChange={handleSearch} />
      {books.map((book, index)=>{
        if (books.length === index+1){
          return <div ref={lastBookElementRef} key={book} className="book-el">{book}</div>
        }
        return <div key={book} className="book-el" >{book}</div>
      })}
      <h1 style={logStyles}>{loading && 'Loading...'}</h1>
      <h1 style={logStyles}>{error && 'Error Happened'}</h1>
      {(!hasMore && !loading) ? <h1 style={logStyles}>Reached the End</h1> : ""}
    </div>
  );
}

export default App;
