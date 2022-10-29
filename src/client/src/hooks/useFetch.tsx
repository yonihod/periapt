import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const useFetch = (url: string) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}${url}`);
                const json = await response.json();
                setData(json);
                setLoading(false);
            } catch (error) {
                setError(error);
            }

        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;