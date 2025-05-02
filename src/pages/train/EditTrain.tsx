import { FC, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useGetTrainByIdQuery, useUpdateTrainMutation } from '../../store/services/train.api';
import { errorResponseParse } from "../../utils/parseError";
import {trainFields} from "./../train/constants";

const schema = yup.object().shape({
    startCity: yup.string().required('Start City is required').min(3, 'Start City must be at least 3 characters'),
    endCity: yup.string().required('End City is required').min(3, 'End City must be at least 3 characters'),
    departure: yup.string().required('Departure is required'),
    arrival: yup.string().required('Arrival is required'),
    availableSeats: yup.number().required('Available Seats is required').min(1).max(600),
    price: yup.number().required('Price is required').min(10).max(3000),
});

const EditTrain: FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { data: trainInfo, isLoading } = useGetTrainByIdQuery(id!);
    const [updateTrain] = useUpdateTrainMutation();

    const initialValues = useMemo(() => ({
        name: trainInfo?.name || '',
        startCity: trainInfo?.startCity || '',
        endCity: trainInfo?.endCity || '',
        departure: trainInfo?.departure || '',
        arrival: trainInfo?.arrival || '',
        availableSeats: trainInfo?.availableSeats || 0,
        price: trainInfo?.price || 0,
    }), [trainInfo]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                await updateTrain({ id: id!, train: values }).unwrap();
                toast.success('Train updated successfully');
                navigate('/');
            } catch (err: any) {
                const errorParsed = errorResponseParse(err);
                toast.error(errorParsed.message || 'Error during edit train');
            }
        },
    });

    const handleGoBack = () => navigate(-1);

    if (isLoading || !trainInfo) return <h1>Loading...</h1>;



    const renderField = (name: string, label: string, type: string) => {
        const fieldKey = name as keyof typeof formik.values;
        return (
            <div key={name} className="mb-3">
                <label htmlFor={name} className="form-label">{label}</label>
                <input
                    id={name}
                    name={name}
                    type={type}
                    className={`form-control ${formik.touched[fieldKey] && formik.errors[fieldKey] ? 'is-invalid' : ''}`}
                    value={formik.values[name as keyof typeof formik.values]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched[fieldKey] && formik.errors[fieldKey] && (
                    <div className="invalid-feedback">{formik.errors[fieldKey]}</div>
                )}
            </div>
        );
    };

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center">
            <div className="p-4 shadow-lg w-75">
                <button className="btn btn-dark mb-4" onClick={handleGoBack}>Back</button>
                <h1 className="text-center mb-4">Edit Train Info</h1>
                <form onSubmit={formik.handleSubmit}>
                    {trainFields.map(({ name, label, type }) => renderField(name, label, type))}
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTrain;
