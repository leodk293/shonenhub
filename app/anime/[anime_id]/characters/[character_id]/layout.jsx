import React from 'react';

export async function generateMetadata({ params }, parent) {
    const id = params.character_id;

    const product = await fetch(`https://api.jikan.moe/v4/characters/${id}/full`);
    const result = await product.json();

    return {
        title: `${result.data.name} | Shonenhub`,
        description: `${result.data.name} Infos are displayed here .`,
    };
}

export default function Layout({ children }) {
    
    return (
        <div>
            {children}
        </div>
    );
}
