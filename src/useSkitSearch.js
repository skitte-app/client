import { useEffect, useState } from "react";
import axios from "axios";
import { HOST } from "./config";


export default function useSkitSearch(query, pageNumber, endpoint) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [skits, setSkits] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  endpoint = endpoint ? endpoint : "";

  useEffect(() => {
    setSkits([]);
    setUsers([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `${HOST}/api/skits/${endpoint}`,
      params: { page: pageNumber, q: query },
      // params: pageNumber ? { page: pageNumber, q: query } : { q: query },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setSkits((prevSkits) => {
          return [
            ...new Set([
              ...prevSkits,
              ...res.data.results.map((s) => s.content),
              ...res.data.results.map((s) => s.caption),
            ]),
          ];
        });
        if (res.data.results){setUsers(...res.data.results);}
        setHasMore(res.data.count > 20 && !res.data.next === null);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber, endpoint]);
  return { loading, error, skits, hasMore, users };
}
