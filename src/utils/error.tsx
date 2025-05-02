import {FC} from 'react'
import { Link } from 'react-router-dom';

const Error404: FC = () => {
    return (
        <div className='mt-5 d-flex justify-content-center align-items-center flex-column'>
            <h1 className='display-4 font-weight-bold'>404</h1>
            <p className='lead font-weight-semibold'>Page Not Found</p>
            <button className='btn btn-outline-dark mt-5'>
                <Link to='/' className='text-decoration-none'>Go back to main page</Link>
            </button>
        </div>
    )
}

export default Error404;