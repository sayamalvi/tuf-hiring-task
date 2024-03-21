import { useEffect, useState } from "react";

const Submission = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://tuf-backend-xe6k.onrender.com/submissions', { mode: 'no-cors' })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    return (
        <div className="w-[100%] h-[100%] flex flex-col items-center justify-center px-5 ">
            <h1 className='text-4xl m-5 self-start'>Submissions</h1>
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
                            <td className="border border-gray-800 px-4 py-2">{atob(sub.username)}</td>
                            <td className="border border-gray-800 px-4 py-2">{atob(sub.language)}</td>
                            <td className="border border-gray-800 px-4 py-2">{atob(sub.input)}</td>
                            <td className="border border-gray-800 px-4 py-2">{atob(sub.code).substring(0, 30) + '...'}</td>
                            <td className="border border-gray-800 px-4 py-2">{atob(sub.output).substring(0, 30) + '...'}</td>
                            <td className="border border-gray-800 px-4 py-2">{new Date(sub.created_at).toLocaleDateString('en-US') + new Date(sub.created_at).toLocaleTimeString('en-US')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Submission;
