import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i));
            i++;
            if (i > text.length) {
                clearInterval(interval);
            }
        }, 100);
    }, [text]);

    return (
        <>
            <div className={"flex justify-center  font-mono px-24 text-xl bg-transparent font-sans dark:text-gray-200"}>{displayedText}</div>
        </>
    );
};

export default TypingEffect;
