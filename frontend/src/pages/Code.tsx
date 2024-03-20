import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Code = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        code: '',
        language: '',
        input: '',
    })
    const [output, setOutput] = useState('')

    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const finalData = {
            username: data.username,
            code: data.code,
            language: data.language,
            input: data.input
        }
        const res = await fetch('http://localhost:9000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalData)

        })
        navigate('/submission')
        console.log(res)
        const token = await res.json()
        console.log(token)
        const getOptions = {
            method: 'GET',
            url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
            params: {
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'X-RapidAPI-Key': '92d01ba61bmsh792a46cf9da7ca2p13a648jsn0f9c65aee2bc',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(getOptions);
            console.log(response.data.stdout);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='w-screen h-screen overflow-hidden'>
            <h1 className='text-4xl m-5'>Code</h1>
            <form className='flex items-center justify-evenly w-full '>
                <div className='flex flex-col w-[50%]'>
                    <input name="username" onChange={handleChange} value={data.username} className="border border-solid border-gray-400 rounded-md m-3 p-1" placeholder="Username" />
                    <select name="language" value={data.language} onChange={handleChange} className="border border-solid border-gray-400 rounded-md m-3 p-1">
                        <option value="C" selected>C</option>
                        <option value="C++">C++</option>
                        <option value="java">Java</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                    </select>
                    <input name="input" onChange={handleChange} value={data.input} className="border border-solid border-gray-400 rounded-md m-3 p-1" placeholder="Input" />
                    <button type="submit" onClick={handleSubmit} className="border border-solid ">Submit</button>
                </div>
                <div className='w-[40%]'>
                    <textarea rows={10} cols={50} name="code" onChange={handleChange} value={data.code} className="border border-solid border-gray-400 w-full p-1" placeholder="Code" />
                </div>
                {output}
            </form>
        </div>
    )
}

export default Code