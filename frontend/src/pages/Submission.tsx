import { useEffect, useState } from "react";

const Submission = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9000/submissions')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    return (
        <div className="w-[100%] h-[100%] flex flex-col items-center justify-center px-5 ">
            <h1 className='text-4xl m-5'>Submissions</h1>
            <table className="border-collapse border border-gray-800 w-full h-full">
                <thead>
                    <tr>
                        <th className="border border-gray-800 px-4 py-2">Username</th>
                        <th className="border border-gray-800 px-4 py-2">Language</th>
                        <th className="border border-gray-800 px-4 py-2">Input</th>
                        <th className="border border-gray-800 px-4 py-2">Source Code</th>
                        <th className="border border-gray-800 px-4 py-2">Output</th>
                        <th className="border border-gray-800 px-4 py-2">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((sub: any) => (
                        <tr key={sub.id} className="text-center">
                            <td className="border border-gray-800 px-4 py-2">{sub.username}</td>
                            <td className="border border-gray-800 px-4 py-2">{sub.language}</td>
                            <td className="border border-gray-800 px-4 py-2">{sub.input}</td>
                            <td className="border border-gray-800 px-4 py-2">{sub.code.substring(0, 100) + '...'}</td>
                            <td className="border border-gray-800 px-4 py-2">{sub.output}</td>
                            <td className="border border-gray-800 px-4 py-2">{sub.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Submission;
