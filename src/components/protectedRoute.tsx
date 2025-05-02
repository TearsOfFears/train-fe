import {FC} from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

interface Props {
    children: JSX.Element
}

export const ProtectedRoute: FC<Props> = ({children}) => {
    const isAuth = useAuth()
    return (
        <>
            {isAuth ? children : (
                <div className='mt-5 d-flex justify-content-center align-items-center flex-column'>
                    <p className='lead font-weight-semibold'>Unauthorized</p>
                    <button className='btn btn-outline-dark mt-5'>
                        <Link to='/' className='text-decoration-none'>Go back to main page</Link>
                    </button>
                </div>
            )}
        </>
    )
}
