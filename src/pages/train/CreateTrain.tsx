import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {errorResponseParse} from "../../utils/parseError";
import {useCreateTrainMutation, useUpdateTrainMutation} from "../../store/services/train.api";
import {trainCreateUpdateValidation} from "./../train/validations/trainCreateUpdate.validation";
import {trainFields} from "./constants";
import {TrainFormValues} from "./interfaces/trainCreateUpdate.form";


const CreateTrain: FC = () => {
    const navigate = useNavigate();
    const [createTrain] = useCreateTrainMutation();
    const formik = useFormik<TrainFormValues>({
        initialValues: {
            name:'',
            startCity: '',
            endCity: '',
            departure: '',
            arrival: '',
            availableSeats: 0,
            price: 0,
        },
        validationSchema:trainCreateUpdateValidation,
        onSubmit: async (values) => {
            try {
                await createTrain(values).unwrap();
                toast.success('Train created successfully');
                navigate('/');
            } catch (err: any) {
                const errorParsed = errorResponseParse(err)
                toast.error(errorParsed.message || 'Error during edit train');
            }
        },
    });

    const handleGoBack = () => navigate(-1);

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center">
            <div className="p-4 shadow-lg w-75">
                <button className="btn btn-dark mb-4" onClick={handleGoBack}>
                    Back
                </button>
                <h1 className="text-center text-3xl font-weight-bold">Create Train</h1>
                <form className="mt-4" onSubmit={formik.handleSubmit}>
                    {trainFields.map(({ name, label, type }) => {
                        const fieldKey = name as keyof typeof formik.values;
                        return (
                            <div key={name} className="mb-3">
                                <label htmlFor={name} className="form-label font-weight-semibold">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    id={name}
                                    name={name}
                                    className={`form-control ${formik.touched[fieldKey] && formik.errors[fieldKey] ? 'is-invalid' : ''}`}
                                    value={formik.values[name as keyof typeof formik.initialValues]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched[fieldKey] && formik.errors[fieldKey] && (
                                    <div className="invalid-feedback">{formik.errors[fieldKey]}</div>
                                )}
                            </div>
                        )
                    })}
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTrain;
