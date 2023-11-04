import React, { useEffect, useState } from 'react';
import { Collapse, initTE } from "tw-elements";
import axios from "axios";

const Accordion = ({ product }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    useEffect(() => {
        // Initialisation de tw-elements
        initTE({ Collapse });
    }, []);

    const groupedProducts = product.reduce((groups, item) => {
        const companyName = item.company.nom;
        if (!groups[companyName]) {
            groups[companyName] = [];
        }
        groups[companyName].push(item);
        return groups;
    }, {});


    return (
        <div className="">
                <div id="accordionFlushExample" className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    {Object.entries(groupedProducts).map(([companyName, products], index) => (
                        <div
                            key={index}
                            className="border rounded-t-lg border-l-0 border-r-0 border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800"
                        >
                            <h2 className="mb-0" id={`flush-heading${index + 1}`}>
                                <button
                                    className={`group rounded-t-lg  relative flex w-full items-center border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"}`}
                                    type="button"
                                    data-te-collapse-init
                                    onClick={() => handleClick(index)}
                                >
                                    {companyName}, Les promos actuelles : {products[0].company.promo.join(', ')}
                                    <span
                                        className={`-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white`}
                                    >
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="h-6 w-6"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                      </svg>
                                    </span>
                                </button>
                            </h2>
                            <div
                                id={`flush-collapse${index + 1}`}
                                className={`!visible border-0 ${activeIndex === index ? 'block' : 'hidden'}`}
                                data-te-collapse-item
                                data-te-collapse-show={activeIndex === index || index === 0 ? '' : null}
                                aria-labelledby={`flush-heading${index + 1}`}
                            >
                                <div className="px-5 py-4 bg-blue-200">
                                    {products.map((item, productIndex) => (
                                        <div key={productIndex} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img src={item.photo} alt={item.nom} className="w-10 h-10 rounded-md mr-4" />
                                                <div>
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                                                        <h5 className="text-lg font-medium">{item.nom}</h5>
                                                    </a>
                                                    <p>
                                                        {Object.entries(item.prixRef).map(([poids, prix], index) => (
                                                            <span key={poids}>
                                                                {index > 0 && ', '}
                                                                {poids}={prix.toFixed(2)} €/kg
                                                            </span>
                                                        ))}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-right">
                                                    {`Le meilleur rapport prix/kg: ${Math.min(...Object.values(item.prixRef)).toFixed(2)} €`}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default Accordion;
