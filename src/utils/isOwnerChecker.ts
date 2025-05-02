import {IUser, IUserData} from "../interfaces/types/types";

export const isOwnerChecker = (trainOwnerId:string,user:IUserData)=>user && trainOwnerId===user.id;