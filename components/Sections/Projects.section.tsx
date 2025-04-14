import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const Projects = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('https://api.github.com/users/Ne-k/repos');
                if (!response.ok) {
                    new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const filteredRepos = data
                    .filter(repo => !repo.fork)
                    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
                    .slice(0, 8);
                setRepos(filteredRepos);
            } catch (error) {
                console.error('Fetching error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    if (loading) {
        return <p>Loading projects...</p>;
    }

    if (!repos.length) {
        return <Link
            key="na"
            href="/"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-auto min-h-[7rem] max-w-[20rem] cursor-pointer rounded-lg p-1 text-white duration-100 hover:scale-105"
            style={{
                background: `linear-gradient(to right, #FFD1DC, #FF9E9D)`
            }}
        >
            <div
                className="flex h-full w-auto flex-col items-center justify-center rounded-lg bg-primary px-2 py-2 text-center font-medium">
                <p className="project-name text-lg font-semibold break-all">No Projects Found...</p>
                <p className="project-description text-sm break-words">No description available.</p>
            </div>
        </Link>
    }

    const pastelColors = [
        ['#FFD1DC', '#FF9E9D'], // pink
        ['#B5EAD7', '#C7CEEA'], // green and purple
        ['#FFDAC1', '#E2F0CB'], // orange and light green
        ['#FFB7B2', '#FF9AA2'], // red and salmon
        ['#B5EAD7', '#AFCBFA'], // teal and blue
        ['#FAD2E1', '#99DDCC'], // pastel pink and mint
        ['#FFC8DD', '#D6AEDD'], // pastel pink and lavender
        ['#F3EAC2', '#F5D6BA'], // light yellow and peach
        ['#ECD4FF', '#FFC4E1'], // light purple and pastel pink
        ['#A8E6CF', '#FDFFAB'], // mint green and pastel yellow
    ];

    const getRandomPastelGradient = () => {
        const randomIndex = Math.floor(Math.random() * pastelColors.length);
        return pastelColors[randomIndex];
    };

    return (
        <div className="my-16 px-3 font-sen" id="projects">
            <p className="text-2xl sm:text-3xl font-bold text-white text-center">
                <Link href="https://github.com/Ne-k" passHref>
                    <span className="hover:font-bold cursor-pointer">
                        <u>Recently Updated Projects</u>
                    </span>
                </Link>
            </p>
            <div className="my-8 flex flex-wrap items-center justify-center gap-10 px-4 sm:px-8">
                {repos.map(repo => {
                    const [colorStart, colorEnd] = getRandomPastelGradient();
                    return (
                        <Link
                            key={repo.id}
                            href={repo.html_url}
                            passHref
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-auto min-h-[7rem] max-w-[20rem] cursor-pointer rounded-lg p-1 text-white duration-100 hover:scale-105"
                            style={{
                                background: `linear-gradient(to right, ${colorStart}, ${colorEnd})`
                            }}
                        >
                            <div
                                className="flex h-full w-auto flex-col items-center justify-center rounded-lg bg-primary px-2 py-2 text-center font-medium">
                                <p
                                    className="project-name text-lg font-semibold px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap"
                                    style={{ minWidth: '10rem' }}
                                >
                                    {repo.name}
                                </p>
                                <p className="project-description text-sm break-words">{repo.description || 'No description available.'}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Projects;