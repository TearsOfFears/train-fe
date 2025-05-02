import {FC} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {BsTrash} from 'react-icons/bs';
import {toast} from 'react-toastify';
import {useDeleteTrainMutation, useGetTrainListQuery, useUpdateTrainStatusMutation} from '../store/services/train.api';
import {PageParamsTrains, SortDirectionTypes, SortFieldTypes} from '../interfaces/pageParams';
import {IResponseTrain} from '../interfaces/types/types';
import {useAuth, useUser} from "../hooks/useAuth";
import {isOwnerChecker} from "../utils/isOwnerChecker";
import {DEFAULT_PAGINATION} from "../defaults/pagination";
import {TrainStatusEnum} from "../interfaces/trainStatus.enum";

const Trains: FC = () => {
    const navigate = useNavigate();
    const user = useUser();
    const [urlSearchParams, setSearchParams] = useSearchParams();

    const page = Number(urlSearchParams.get('page')) || DEFAULT_PAGINATION.page;
    const limit = Number(urlSearchParams.get('limit')) || DEFAULT_PAGINATION.limit;
    const query = urlSearchParams.get('query') || '';
    const sortBy = urlSearchParams.get('sortBy') as SortFieldTypes || SortFieldTypes.NAME;
    const sortingOrder = urlSearchParams.get('sortingOrder') as SortDirectionTypes || SortDirectionTypes.ASC;

    const [deleteTrain] = useDeleteTrainMutation();
    const [updateTrainStatus] = useUpdateTrainStatusMutation();

    const pageParams: PageParamsTrains = {
        page,
        limit,
        query,
        sortBy,
        sortingOrder
    };

    const { data,isLoading } = useGetTrainListQuery(pageParams);

    const handleTrainClick = (train: IResponseTrain) => {
        const isOwner = isOwnerChecker(train.ownerId,user);
        if (isOwner){
            navigate(`/${train.id}/edit`);
        }else{
            navigate(`/${train.id}`);
        }
    };

    const requestSort = (field: SortFieldTypes) => {
        const newDirection =
             sortingOrder === SortDirectionTypes.ASC
                ? SortDirectionTypes.DESC
                : SortDirectionTypes.ASC;

        setSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            query,
            sortBy: field,
            sortingOrder: newDirection,
        });
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 rounded-md">
                <div className="d-flex justify-content-between mb-4">
                    <h1 className="mb-0">UKRZALIZNUTCIA</h1>
                    {
                        user && <button className="btn btn-dark" onClick={() => navigate('/create')}>
                            Add Train
                        </button>
                    }
                </div>

                <div className="mb-3">
                    <label htmlFor="cityInput" className="form-label">
                        Search by Name:
                    </label>
                    <input
                        type="text"
                        id="cityInput"
                        className="form-control"
                        value={query}
                        onChange={(e) =>
                            setSearchParams({
                                page:'1',
                                limit: limit.toString(),
                                query: e.target.value,
                                sortBy,
                                sortingOrder,
                            })
                        }
                    />
                </div>

                <table className="table">
                    <thead>
                    <tr>
                        <th onClick={() => requestSort(SortFieldTypes.NAME)} style={{ cursor: 'pointer' }}>
                            Name {sortBy === SortFieldTypes.NAME ? (sortingOrder === SortDirectionTypes.ASC ? '↑' : '↓') : ''}
                        </th>
                        <th>Start City</th>
                        <th>End City</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th
                            onClick={() => requestSort(SortFieldTypes.AVAILABLE_SEATS)}
                            style={{ cursor: 'pointer' }}
                        >
                            Seats{' '}
                            {sortBy === SortFieldTypes.AVAILABLE_SEATS
                                ? sortingOrder === SortDirectionTypes.ASC
                                    ? '↑'
                                    : '↓'
                                : ''}
                        </th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(data?.items ?? []).map((train: IResponseTrain, index: number) => (
                        <tr
                            key={index}
                            onClick={() => handleTrainClick(train)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{train.name}</td>
                            <td>{train.startCity}</td>
                            <td>{train.endCity}</td>
                            <td>{train.departure}</td>
                            <td>{train.arrival}</td>
                            <td>{train.availableSeats}</td>
                            <td>{train.price}</td>
                            <td>
                                {isOwnerChecker(train.ownerId, user) && (
                                    <div className="d-flex align-items-center gap-2">
                                        <BsTrash
                                            style={{ cursor: 'pointer' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteTrain(train.id);
                                                toast.success('Train deleted');
                                            }}
                                        />
                                        <select
                                            className="form-select form-select-sm"
                                            style={{ width: 'auto' }}
                                            value={train.status}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={async (e) => {
                                                const newStatus = e.target.value as TrainStatusEnum;
                                                try {
                                                    await updateTrainStatus({ id: train.id, status: newStatus });
                                                    toast.success('Train status updated');
                                                } catch (error) {
                                                    toast.error('Failed to update train status');
                                                }
                                            }}
                                        >
                                            {Object.values(TrainStatusEnum).map((status) => (
                                                <option key={status} value={status}>
                                                    {status.replace('_', ' ')}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="mt-4 d-flex justify-content-center">
                    {[...Array(data?.meta?.totalPages || 1)].map((_, idx) => (
                        <button
                            key={idx}
                            className={`btn mx-1 ${page === idx + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() =>
                                setSearchParams({
                                    page: (idx + 1).toString(),
                                    limit: limit.toString(),
                                    query,
                                    sortBy,
                                    sortingOrder,
                                })
                            }
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trains;
