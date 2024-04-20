import {
    ComposableMap,
    Geographies,
    GeographiesProps,
    Geography,
    ZoomableGroup,
} from "react-simple-maps";
import React, { MouseEventHandler } from "react";
import { geoMercator } from "d3-geo";
import "./App.css";

interface Position {
    coordinates: [number, number];
    zoom: number;
}

function App() {
    const [position, setPosition] = React.useState<Position>({ coordinates: [0, 0], zoom: 1 });
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMoveEnd = (position: Position) => {
        setPosition(position)
    }

    const selectElement = (geo: any) => {
        console.log("selected Element", geo);
    }

    const geoUrl = "/geo-data.json";

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const [modalPosition, setModalPosition] = React.useState<{ x: number, y: number } | null>(null);

    const handleMouseMove = (event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
        const { clientX, clientY } = event;

        /* get svgRect element - position of country*/
        const svg = document.querySelector("svg");
        const svgRect = svg?.getBoundingClientRect();
        const svgX = clientX - svgRect!.left;
        const svgY = clientY - svgRect!.top;

        console.log("mouse where: ", clientX, clientY);
        setModalPosition({ x: svgRect!.left, y: svgRect!.top });
    };

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
                            return (
                                <React.Fragment key={geo.rsmKey}>
                                    <Geography
                                        onMouseEnter={handleMouseEnter}
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
                                    {isHovered && modalPosition && (
                                        <circle
                                            cx={modalPosition.x}
                                            cy={modalPosition.y}
                                            r={5}
                                            fill="blue"
                                        />/*
                                        <div
                                            style={{
                                                position: "absolute",
                                                left: modalPosition.x,
                                                top: modalPosition.y,
                                                backgroundColor: "white",
                                                padding: "10px",
                                                border: "1px solid black",
                                            }}
                                        >
                                            Modal content
                                        </div>*/
                                    )}
                                </React.Fragment>
                            );
                        })
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    );
}

export default App;
