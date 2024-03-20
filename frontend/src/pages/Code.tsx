import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Code = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        code: '',
        language: 'C',
        input: '',
    })
    const [loading, setLoading] = useState(false)
    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const finalData = {
            username: btoa(data.username),
            code: btoa(data.code),
            language: btoa(data.language),
            input: btoa(data.input)
        };

        try {
            const res = await fetch('http://localhost:9000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(finalData)
            });

            if (res.ok) {
                console.log('Submission successful');
                setLoading(false);
                navigate('/submission');
            } else {
                console.error('Submission failed');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='m-3'>
            <h1 className='text-4xl m-5'>Code</h1>
            <form className='grid grid-cols-2 items-center'>
                <div className='flex flex-col '>
                    <input name="username" onChange={handleChange} value={data.username} className="border border-solid border-gray-400 rounded-md m-3 p-2" placeholder="Username" />
                    <select name="language" value={data.language} onChange={handleChange} className="border border-solid border-gray-400 rounded-md m-3 p-2">
                        <option value="C" >C</option>
                        <option value="C++">C++</option>
                        <option value="Java">Java</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                    </select>
                    <input name="input" onChange={handleChange}
                        value={data.input}
                        className="border border-solid border-gray-400 rounded-md m-3 p-2"
                        placeholder="Input" />
                    <button type="submit" onClick={handleSubmit}
                        className="text-white bg-green-600 m-3 rounded-md p-2 disabled:opacity-60"
                        disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
                <div className=''>
                    <textarea rows={9} cols={50} name="code" onChange={handleChange} value={data.code} className="border border-solid border-gray-400 w-full p-2 rounded-md" placeholder="Code" />
                </div>
            </form>
        </div>
    )
}

export default Code