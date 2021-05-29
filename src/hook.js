import {useEffect, useState} from "react";
import axios from "axios";


export const useSearch = (query) => {

    const [state, setState] = useState({
        articles: [],
        status: 'IDLE',
        error: ''
    });

    useEffect(() => {
        axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${query}`)
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
                        status: 'SUCCESS',
                        error: ''
                    }
                );
            })
            .catch(function (error) {
                setState(
                    {
                        articles: [],
                        status: 'ERROR',
                        error: error
                    }
                );
            })
    }, [query])
    return state;
}