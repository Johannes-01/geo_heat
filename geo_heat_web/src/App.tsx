import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
} from "react-simple-maps";
import React from "react";
import "./App.css";
import HoverCountry from "./components/HoverCountry";

interface Position {
    coordinates: [number, number];
    zoom: number;
}

function App() {
    const [position, setPosition] = React.useState<Position>({ coordinates: [0, 0], zoom: 1 });
    // const [isHovered, setIsHovered] = React.useState(false);
    const [geo, setGeo] = React.useState(null);

    const handleMoveEnd = (position: Position) => {
        setPosition(position)
    }

    const selectElement = (geo: any) => {
        // console.log("selected Element", geo);
    }

    const geoUrl = "/geo-data.json";

    const handleMouseEnter = (geo: any) => {
        setGeo(geo);
    };

    const handleMouseLeave = () => {
        setGeo(null);
    };

    const [modalPosition, setModalPosition] = React.useState<{ x: number, y: number } | null>(null);

    const handleMouseMove = (event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        const { clientX, clientY } = event;

        // get svgRect element - position of country
        const svg = document.querySelector("svg");
        const svgRect = svg?.getBoundingClientRect();
        if(!svgRect){
            return;
        }
        const svgX = clientX - svgRect.left;
        const svgY = clientY - svgRect.top;

        setModalPosition({ x: svgX, y: svgY });
    };

    return (
        <>
            <ComposableMap>
                <ZoomableGroup
                    zoom={position.zoom}
                    center={position.coordinates}
                    onMoveEnd={handleMoveEnd}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                return (
                                    <React.Fragment key={geo.rsmKey}>
                                        <Geography
                                            onMouseEnter={() => handleMouseEnter(geo)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={() => selectElement(geo)}
                                            onMouseMove={handleMouseMove}
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
                                    </React.Fragment>
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            {geo && modalPosition && (
                <HoverCountry geo={geo} modalPosition={modalPosition} />
            )}
        </>
    );
}

export default App;