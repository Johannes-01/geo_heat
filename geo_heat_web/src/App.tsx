import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
} from "react-simple-maps";
import React from "react";
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
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                            />
                        ))
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    );
}

export default App;
