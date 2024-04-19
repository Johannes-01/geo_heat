import {
    ComposableMap,
    Geographies,
    GeographiesProps,
    Geography,
    ZoomableGroup,
} from "react-simple-maps";
import React, { MouseEventHandler } from "react";
import "./App.css";

interface Position {
    coordinates: [number, number];
    zoom: number;
}

function App() {
    const [position, setPosition] = React.useState<Position>({ coordinates: [0, 0], zoom: 1 });

    const handleMoveEnd = (position: Position) => {
        setPosition(position)
    }

    const selectElement = (geo: any) => {
        console.log("selected Element", geo);
    }

    const geoUrl = "/geo-data.json";

    return (
        <ComposableMap>
            <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={handleMoveEnd}
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            // console.log("geo", geo.rms);
                            return <Geography
                                key={geo.rsmKey}
                                onClick={() => selectElement(geo)}
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
                                fill="#fff"
                            />
                        })
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    );
}

export default App;
