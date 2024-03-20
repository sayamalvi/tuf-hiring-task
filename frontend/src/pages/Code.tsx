import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Code = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        code: '',
        language: 'C',
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
            username: btoa(data.username),
            code: btoa(data.code),
            language: btoa(data.language),
            input: btoa(data.input)
        }
        const res = await fetch('http://localhost:9000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalData)

        })
        if (res) navigate('/submission')

    }
    return (
        <div className='w-screen h-screen overflow-hidden m-3'>
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