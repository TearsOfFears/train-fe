import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTrainByIdQuery } from "../store/services/train.api";
import {useUser} from "../hooks/useAuth";

const Tickets: FC = () => {
    const user = useUser();
    const ticketsPerPage = 36;
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { id } = useParams<{ id: string }>();

    const { data: trainInfo, isLoading } = useGetTrainByIdQuery(id || '');

    if (isLoading) {
        return <h1 className="text-center mt-5">Loading...</h1>;
    }

    if (!trainInfo) {
        return <h1 className="text-center mt-5 text-danger">Train data not found.</h1>;
    }

    const totalPages = Math.ceil(trainInfo.availableSeats / ticketsPerPage);
    const startIndex = (currentPage - 1) * ticketsPerPage;
    const endIndex = startIndex + ticketsPerPage;

    const ticketData: string[] = Array.from({ length: trainInfo.availableSeats }, (_, index) => `Ticket ${index + 1}`);
    const currentTickets = ticketData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className='container mt-5 mb-5'>
            <div className='d-flex justify-content-between mb-4'>
                <button className='btn btn-dark' onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>

            <h2 className='mb-4'>{trainInfo.startCity} - {trainInfo.endCity}</h2>

            <div className='d-flex flex-wrap justify-content-start'>
                {currentTickets.map((ticket, index) => (
                    <button
                        key={startIndex + index}
                        className='btn btn-outline-secondary m-2'
                        onClick={() => console.log(`${ticket} clicked`)}
                    >
                        {ticket}
                    </button>
                ))}
            </div>

            <div className='pagination-container mt-4'>
                <nav aria-label='Page navigation'>
                    <ul className='pagination justify-content-center'>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li
                                key={index}
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                <button
                                    className='page-link'
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Tickets;
