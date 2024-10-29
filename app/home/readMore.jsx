"use client";
import { useState } from 'react';

const ReadMore = ({ text, maxLength }) => {
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <div>
            <p>
                {isReadMore ? `${text.slice(0, maxLength)}...` : text}
                <span className='text-gray-100 cursor-pointer' onClick={toggleReadMore}>
                    {isReadMore ? '..more' : '..less'}
                </span>
            </p>
        </div>
    );
};

export default ReadMore;
