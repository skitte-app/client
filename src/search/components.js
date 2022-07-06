import React, { useState, useRef, useCallback } from "react";
import useSkitSearch from "../useSkitSearch";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { skits, users, loading, hasMore, error } = useSkitSearch(query, pageNumber);
  console.log(users);

  const observer = useRef()
  const lastSkitElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }
  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        style={{ border: "2px solid #333" }}
      />
      <div>
      {!loading && users.user ? <a href={`/profile/${users.user.username}`}>@{users.user.username}</a> : <p>wait...</p>}
    </div>
      {skits.map((skit, index) => {
        if(skits.length === index + 1){
          return <div key={skit} ref={lastSkitElementRef}>{skit}</div>
        } else {
          return <div key={skit}>{skit}</div>
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </>
  );
}
