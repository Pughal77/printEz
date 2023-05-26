import { useEffect, useState } from 'react'

function useFetch(url) {
    const [backendData, setBackendData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data');
                }
                return res.json();
            })
            .then(data => {
                setBackendData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
    }, [url])

     return { backendData, isPending, error}
}
 
export default useFetch;