import * as yup from "yup";


export const trainCreateUpdateValidation = yup.object({
    name: yup.string().required('Name is required'),
    startCity: yup.string().required('Start City is required').min(3, 'Must be at least 3 characters'),
    endCity: yup.string().required('End City is required').min(3, 'Must be at least 3 characters'),
    departure: yup.string().required('Departure is required'),
    arrival: yup.string().required('Arrival is required'),
    availableSeats: yup
        .number()
        .required('Available Seats is required')
        .min(1, 'Minimum 1 seat')
        .max(600, 'Maximum 600 seats'),
    price: yup
        .number()
        .required('Price is required')
        .min(10, 'Minimum price is 10')
        .max(3000, 'Maximum price is 3000'),
});