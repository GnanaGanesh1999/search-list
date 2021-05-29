import {useEffect, useRef, useState} from "react";
import axios from "axios";


export const useSearch = (query) => {
    const [state, setState] = useState({
        articles: [],
        status: 'IDLE',
        error: ''
    });
    const CancelToken = useRef(null);
    useEffect(() => {
        if (CancelToken.current) {
            console.log('CANCEL')
            CancelToken.current.cancel();
        }
        CancelToken.current = axios.CancelToken.source();
        axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${query}`,
            {cancelToken: CancelToken.current.token})
            .then(function (response) {
                const responseData = response.data;
                const parsedData = []
                for (let i = 0; i < responseData[1].length; i++) {
                    parsedData.push({
                        id: responseData[3][i],
                        label: responseData[1][i]
                    })
                }
                setState(
                    {
                        articles: parsedData,
                        status: '   SUCCESS',
                        error: ''
                    }
                );
            })
            .catch(function (error) {
                if (axios.isCancel(error)) {
                    console.log('ERROR')
                    return;
                }
                setState({
                    articles: [],
                    status: 'ERROR',
                    error: error
                });
            });
    }, [query])
    return state;
};

export const useDebounce = (value, delay = 2000) => {

    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounceValue;
};