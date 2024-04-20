import React, { StrictMode, useState } from 'react';

interface HoverCountryProps {
    geo: any;
    modalPosition: {
        x: number,
        y: number,
    }
}

const HoverCountry: React.FC<HoverCountryProps> = ({ geo, modalPosition }) => {

    return (
        <div
            style={{
                pointerEvents: "none",
                top: modalPosition.y,
                left: modalPosition.x,   
                zIndex: 1,
                position: "fixed",
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
            }}>
            <h1>{geo.properties.name}</h1>
        </div>
    );
};

export default HoverCountry;