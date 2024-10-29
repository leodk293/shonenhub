import React from 'react'

export async function generateMetadata({ params }, parent) {
    const id = params.anime_id;

    const product = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    const result = await product.json();

    return {
        title: `${result.data.title} | Shonenhub`,
        description: `${result.data.title} Infos are displayed here .`,
    };
}

const layout = ({ children, params }) => {

    return (
        <div>
            {children}
        </div>
    )
}

export default layout