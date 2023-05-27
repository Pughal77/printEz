import { useEffect, useState } from 'react'

function usePost(url, frontendData) {
    const [backendData, setBackendData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(frontendData)
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('could not post the data');
                }
                console.log(res);
                setBackendData(res.json());
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
 
export default usePost;