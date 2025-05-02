import {TrainStatusEnum} from "../trainStatus.enum";

export interface IUser {
    id: string;
    email: string;
    token: string;
}

export interface IUserLoginData {
    email: string;
    password: string;
}

export interface IUserData {
    email: string;
    name: string;
    surname: string;
    id:string,
}

export interface IResponseUser {
    email: string;
    password: string;
    name: string;
    surname: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IResponseUserData {
    token: string;
    user: IResponseUser;
}

export interface IRegisterData {
    email: string

    password: string

    name: string

    surname: string
}

export interface ITrain {
    startCity: string;
    endCity: string;
    departure: string;
    arrival: string;
    availableSeats: number;
    price: number;
}

export interface ITrainData {
    id: number;
    startCity: string;
    endCity: string;
    departure: string;
    arrival: string;
    availableSeats: number;
    price: number;
    ownerId:string
    status:TrainStatusEnum
}

export interface IResponseTrain {
    name: string;
    startCity: string;
    endCity: string;
    departure: string;
    arrival: string;
    availableSeats: number;
    price: number;
    id: string;
    createdAt: string;
    updatedAt: string;
    ownerId:string
    status:TrainStatusEnum
}

export interface IResponseTrainData {
    train: IResponseTrain;
}