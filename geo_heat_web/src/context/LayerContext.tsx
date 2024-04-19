import React from "react";
import { Selection } from "../components/Selection.tsx";

interface ILayerContext {
    setLayer: (layer: string) => void;
    layer: string;
    allLayers: string[];
}

const LayerContext = React.createContext<ILayerContext | undefined>(undefined);

interface LayerContextProviderProps {
    children: React.ReactNode;
}

export const LayerContextProvider: React.FC<LayerContextProviderProps> = ({ children }) => {
    const [layer, setLayer] = React.useState<string>("");

    const allLayers = ["layer1", "layer2", "layer3"];

    const value: ILayerContext = {
        setLayer,
        layer,
        allLayers,
    };

    return (
        <LayerContext.Provider value={value}>
            <Selection />
            {children}
        </LayerContext.Provider>
    );
}

export const useLayerContext = () => {
    const context = React.useContext(LayerContext);

    if (context === undefined) {
        throw new Error("useLayerContext must be used within a LayerContextProvider");
    }

    return context;
}