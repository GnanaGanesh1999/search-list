import Autocomplete from "react-autocomplete";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [value, setValue] = useState();
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${value}`)
            .then(function (response) {
                const responseData = response.data;
                const parsedData = []
                for (let i = 0; i < responseData[1].length; i++) {
                    parsedData.push({
                        id: responseData[3][i],
                        label: responseData[1][i]
                    })
                }
                setItems(parsedData)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [value])

    return (
        <div>
            <Autocomplete
                getItemValue={(item) => item.label}
                items={items}
                renderItem={(item, isHighlighted) =>
                    <div style={{background: isHighlighted ? 'lightgray' : 'white'}}>
                        {item.label}
                    </div>
                }
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onSelect={(val) => setValue(val)}
            />
        </div>
    );
}

export default App;
