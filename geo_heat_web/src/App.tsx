import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";
import "./App.css";

function App() {

    const geoUrl = "/geo-data.json";

    return (
        <ComposableMap>
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                        />
                    ))
                }
            </Geographies>
        </ComposableMap>
    );
}

export default App;
