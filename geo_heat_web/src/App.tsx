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
                            strokeWidth={0.5}
                            stroke="#555555"
                            style={{
                                default: {
                                    outline: "none",
                                    border: "10px solid red",
                                },
                                pressed: {
                                    outline: "none", 
                                    border: "10px solid red",
                                    fill: "#0f0"
                                },
                                hover: {
                                    outline: "none",
                                    border: "10px solid red",
                                    fill: "#888"
                                }
                            }}
                            // fill={() => {console.log(geo.properties.exampleValuePerCapita); return 1;}}
                        />
                    ))
                }
            </Geographies>
        </ComposableMap>
    );
}

export default App;
