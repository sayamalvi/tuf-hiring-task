import { useEffect, useState } from "react"
const Submission = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const data = fetch('http://localhost:9000/submissions')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data)
            })

    }, [])
    return (
        <div>
            <h1 className='text-4xl m-5'>Submissions</h1>
            <div>
                {data.map((sub: any) => {
                    return (
                        <div key={sub.id} className='m-4 p-4 border-2'>
                            <h1>{sub.username}</h1>
                            <h1>{sub.code}</h1>
                            <h1>{sub.language}</h1>
                            <h1>{sub.input}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Submission