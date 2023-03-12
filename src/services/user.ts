//In charge to connect with the dB
import { Subject } from "../interfaces/subject.interface";
import { User } from "../interfaces/user.interface";
import SubjectModel from "../models/subject";
import UserModel from "../models/user";

const insertUser = async(item: User) => {
    const responseInsert = await UserModel.create(item);
    return responseInsert;
};

const getUsers = async() => {
    const responseItem = await UserModel.find({});
    return responseItem;
};

const getUser = async(id: string) => {
    const responseItem = await UserModel.findOne({_id: id});
    return responseItem;
};

const updateUser = async(id: string, data: User) => {
    const responseItem = await UserModel.findOneAndUpdate({_id: id}, data,{new: true});
    return responseItem;
};

const deleteUser = async(id: string) => {
    const responseItem = await UserModel.findOneAndRemove({_id: id});
    return responseItem;
}

const usersBySubject = async (idSubject:string) => {
    const responseItem:any = await SubjectModel.findOne({_id: idSubject});
    responseItem?.users.forEach((user:any) => {console.log(user);});
    return responseItem?.users;
}


export {insertUser, getUser, getUsers, updateUser, deleteUser};
