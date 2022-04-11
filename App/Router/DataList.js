import React,{ useEffect}           from 'react';
import {  View, FlatList, Text, TouchableWithoutFeedback,Image } from 'react-native';
import {ButtonSingle}               from '../Component/Buttons';
import {useRecoilValue}             from "recoil";
import {useData}                    from "../Storage/UseData";
import AsyncStorage                 from '@react-native-async-storage/async-storage';
import {getDataStorage}             from "../Storage/DataState";
import {AntDesign, Ionicons}        from '@expo/vector-icons';
import {DataAdd}                    from "./DataAdd";
import SnackBar                     from 'react-native-snackbar-component'


export default function App(props) {

    const dataHook                          = useData();
    const getAllData                        = useRecoilValue(getDataStorage);
    const [modalVisible, setModalVisible]   = React.useState(false);
    const [snackState, setSnackState]       = React.useState({
        status: false,
        text : ""
    });

    /* Json Service Request & Save Device Storage */
    const getServiceDefaultData = () => fetch("https://5fc9346b2af77700165ae514.mockapi.io/simpsons")
        .then(res=>res.json())
        .then(async res => {
            res.map(({id, avatar, description, job, name}) => {
                dataHook.addData( name, avatar, job, description, parseInt(id));
            });
            setSnackState({
                text:"Default Characters Loaded",
                status:true
            });
        })
        .catch((err)=> {
            setSnackState({
                text:"Default Characters Loading Error",
                status:true
            });
        });


    useEffect(async () => {

        /* if storage is empty then load data from provider */
       const getServiceProvider = await AsyncStorage.getItem("SimpSonsData");

       if(getServiceProvider === null || undefined){
            await getServiceDefaultData()
        }else{
           if(getServiceProvider.toString().length === 2){
               await getServiceDefaultData()
           }
       }

    },[]);


    const Item = ({item,data}) => (
        <TouchableWithoutFeedback onPress={()=>   props.navigation.navigate('DataView', item) }>
            <View key={item.id} style={{ width:"100%", alignItems:"center", marginBottom:5}} >
                <View style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderRadius:6,  width:"95%", height:50, backgroundColor:"white", marginBottom:5, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4}} >
                    <View style={{width: 20,alignItems:"center", justifyContent:'center', height: 50}}>
                        <Text>{data.index}</Text>
                    </View>
                    <View style={{width:40, alignItems:"center", justifyContent:"center"}}>
                        <Image source={{uri:item.avatar}} style={{resizeMode:"contain", width: 30, height: 30}}/>
                    </View>
                    <View style={{flex:1}}>
                        <Text>{item.name}</Text>
                    </View>
                    <View style={{width:150, flexDirection:"row"}} >
                        <TouchableWithoutFeedback onPress={()=>{
                            dataHook.listing(data.index,"+");
                            setSnackState({
                                text:"Ranking Updated",
                                status:true
                            });
                        }}>
                            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                                <AntDesign name="caretup" size={24} color="green" />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{
                            dataHook.listing(data.index,"-");
                            setSnackState({
                                text:"Ranking Updated",
                                status:true
                            });
                        }} >
                            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                                <AntDesign name="caretdown" size={24} color="orange" />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{
                            dataHook.delData(item.id);
                            setSnackState({
                                text:"Removed",
                                status:true
                            });
                        }}>
                            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                                <Ionicons name="remove-circle" size={24} color="red" />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );


    return (
        <View style={{ flexDirection: "column",height:"100%", backgroundColor:"white"}}>
            <View style={{flex:1}}>

                <View style={{width:"100%", height:90, justifyContent:"center", alignItems:"center"}}>
                    <Text style={{fontSize:25}}>SimpSons</Text>
                </View>

                <FlatList
                    data={getAllData}
                    renderItem={(data) => <Item data={data} item={data.item} />}
                    keyExtractor={item => item.id} />
            </View>
            <View style={{ height:100, alignItems:"center", justifyContent:"center"}}>
                <ButtonSingle onPress={()=>{
                    setModalVisible(true)
                }} text={"Add Character"} />
            </View>

            <DataAdd visible={modalVisible} onChange={(res) => setModalVisible(res)}/>

            <SnackBar
                visible={snackState.status}
                textMessage={snackState.text}
                actionHandler={()=>{ setSnackState({...snackState,status:false}) }}
                actionText="DISMISS"
            />

        </View>
    );
}

