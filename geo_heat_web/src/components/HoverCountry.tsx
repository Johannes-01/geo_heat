import React, { useState } from 'react';

interface HoverCountryProps {
    geo: any;
}

const HoverCountry: React.FC<HoverCountryProps> = ({ geo }) => {

    return (
        <div>
            <h2>{geo.properties.name}</h2>
            <p>Hovered!</p>
        </div>
    );
};

export default HoverCountry;