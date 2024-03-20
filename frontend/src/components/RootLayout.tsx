import { Link, Outlet } from 'react-router-dom'
const RootLayout = () => {
    return (
        <>
            <nav className='flex m-4 p-5 justify-between items-center'>
                <div className='flex items-center'>
                    <img src="https://pbs.twimg.com/profile_images/1564721529807593474/ll21tyFr_400x400.jpg" alt="TUF" className='h-12 w-12' />
                    <p className='font-bold text-xl'>Code</p>
                </div>
                <div>
                    <Link to='/' className='m-2'>Code</Link>
                    <Link to='/submission' className='m-2'>Submission</Link>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout