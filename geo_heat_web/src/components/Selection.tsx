import React from "react";
import { useLayerContext } from "../context/LayerContext.tsx";
import "./Selection.css";

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
                    console.log("layer clicked");
                    setLayer(layer);
                    setSearchTerm(layer);
                    setIsSearchFocused(false);
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
        <div className={`selection_container ${layer ? "selection__visible" : ""}`}>
            <div
                style={{
                    backgroundColor: isSearchFocused ? "white" : "",
                    border: isSearchFocused ? "2px black solid" : "",
                    borderRadius: "12px"
                }}
            >
                <input
                    className={`selection__search_bar`}
                    onChange={onInputChange}
                    value={searchTerm}
                    onFocus={() => setIsSearchFocused(true)}
                    // onBlur={() => setIsSearchFocused(false)}
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