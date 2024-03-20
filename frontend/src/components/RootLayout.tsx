import { Link, Outlet } from 'react-router-dom'
const RootLayout = () => {
    return (
        <>
            <nav className='m-4'>
                <Link to='/' className='m-2'>Code</Link>
                <Link to='/submission' className='m-2'>Submission</Link>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout