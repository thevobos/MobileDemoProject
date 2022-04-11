import {atom, selector} from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DataState = atom({
    key: "DataState",
    default: selector({
        key: 'DefaultStorageData',
        get: async ()=> {

            const getData = await AsyncStorage.getItem("SimpSonsData");

            if(getData)
                return JSON.parse(getData).length > 0  ? JSON.parse(getData) : [];

            if(!getData)
                return [];
        }
    })
});

export const getDataStorage = selector({
    key: 'DataStateGet',
    get: ({get}) => get(DataState)
});