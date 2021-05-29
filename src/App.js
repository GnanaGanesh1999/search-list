import Autocomplete from "react-autocomplete";
import {useState} from "react";
import {useSearch} from "./hook";

function App() {

    const [value, setValue] = useState('');
    const {articles, status, error} = useSearch(value);
    return (
        <>
            <p>Status: {status}</p>
            <p>Error: {error}</p>
            <div>
                <Autocomplete
                    getItemValue={(item) => item.label}
                    items={articles}
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
        </>
    );
}

export default App;
