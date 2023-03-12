import { Types } from "mongoose";
import { Subject } from "../interfaces/subject.interface";
import SubjectModel from "../models/subject";

const insertSubject=async(item:Subject)=>{
    const responseInsert=await SubjectModel.create(item);
    return responseInsert;
};

const getSubjects=async()=>{
    const responseItem=await SubjectModel.find({}).populate('users');
    return responseItem;
};

const getSubject=async(id:string)=>{
    const responseItem=await SubjectModel.findOne({_id:id}).populate('users');
    return responseItem;
};

const updateSubject=async(id:string,data:Subject)=>{
    const responseItem=await SubjectModel.findOneAndUpdate(
        {_id:id},
        data,
        {
            new:true,
        }
    ).populate('users');
    return responseItem;
};

const deleteSubject=async(id:string)=>{
    const responseItem=await SubjectModel.deleteOne({_id:id});
    return responseItem;
}

const matriculateSubject=async(idUser:string,idSubject:string)=>{
    const responseItem = await SubjectModel.findOneAndUpdate(
        {_id:idSubject},
        {$addToSet: {users: new Types.ObjectId(idUser)}},
        {new: true}
    ).populate('users');
    console.log(responseItem?.users);
    return responseItem;
};

const subjectByUser =async (idUser:string) => {
    // Buscamos todas las asignaturas en las que está matriculado el usuario
    const subjects = await SubjectModel.find({ idUser });

    // Mostramos la lista de asignaturas
    console.log('Asignaturas matriculadas:');
    subjects.forEach((subject) => {console.log(`- ${subject.name} (semestre ${subject.semester}, dificultad ${subject.difficulty})`);});
    return subjects;
}


export { insertSubject, getSubject, getSubjects, updateSubject, deleteSubject, matriculateSubject };
