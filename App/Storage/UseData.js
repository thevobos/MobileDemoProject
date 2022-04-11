import React from "react";
import {useRecoilState} from "recoil";
import {DataState} from "./DataState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {arrayMoveImmutable} from 'array-move';

export const useData = ()  =>{

    const [data,setData] = useRecoilState(DataState);

    const getData = (id) => {
        return data.filter((item) => item.id === id).length > 0 ? data.filter((item) => item.id === id) : false
    };

    const addData =  (name,avatar,job,description,id) =>{

        if(getData(id))
            return;

        setData( (data) => {
            const newList = [...data,{
                name: name,
                avatar: avatar,
                job: job,
                description: description,
                id: id
            }];
            AsyncStorage.setItem("SimpSonsData",JSON.stringify(newList)).then(()=>console.log("eklendi"));
            return newList;
        });
    }

    const delData = async (id) => {
        const result = data.filter((item) => item.id !== id);
        await AsyncStorage.setItem("SimpSonsData",JSON.stringify(result));
        setData(result);
    }

    const listing = async (index,status) => {

        const newList = [];

        data.map((arr) => newList.push(arr));

        if(status === "+" && index >= 1){
            const array1 = arrayMoveImmutable(newList, index, index-1);
            AsyncStorage.setItem("SimpSonsData",JSON.stringify(array1))
            setData(array1);
        }

        if(status === "-" && (index < data.length - 1)){
            const array1 = arrayMoveImmutable(newList, index, index+1);
            AsyncStorage.setItem("SimpSonsData",JSON.stringify(array1))
            setData(array1);
        }

    }


    return {data,getData,addData,delData,listing};

};

