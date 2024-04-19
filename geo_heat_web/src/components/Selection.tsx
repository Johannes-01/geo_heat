import React from "react";
import { useLayerContext } from "../context/LayerContext.tsx";

export const Selection = () => {
    const { layer, allLayers, setLayer } = useLayerContext();

    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [isSearchFocused, setIsSearchFocused] = React.useState<boolean>(false);
    const [currentPossibleLayers, setCurrentPossibleLayers] = React.useState<string[]>(allLayers);

    const onInputChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);

        if (event.target.value === "") {
            setCurrentPossibleLayers(allLayers);
            return;
        }

        setCurrentPossibleLayers(allLayers.filter(l => l.includes(event.target.value)));
    }

    const Layers: React.FC = React.memo(() => {
        if (!isSearchFocused) {
            return null;
        }

        if (currentPossibleLayers.length === 0) {
            return <div>No layers found</div>
        }

        return currentPossibleLayers.map((layer) => (
            <button
                key={layer}
                onClick={() => {
                    setLayer(layer);
                    setSearchTerm(layer);
                }}
                aria-label={`Select ${layer}`}
                style={{
                    width: "100%",
                    backgroundColor: "white",
                    color: "black",
                }}
            >
                {layer}
            </button>
        ));
    });

    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "400px",
                height: "100vh",
                zIndex: "1",
                backgroundColor: layer !== "" ? "white" : "transparent",
                padding: "20px 16px",
            }}
        >
            <div>
                <input
                    style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "white",
                        borderRadius: "100px",
                        border: "1px solid black",
                        color: "black",
                        padding: "0 16px",
                    }}
                    onChange={onInputChange}
                    value={searchTerm}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Layers />
                </div>
            </div>
        </div>
    )
}