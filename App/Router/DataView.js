
import React,{useState, useEffect} from 'react';
import {  View, ScrollView, Text,Image, Modal, Pressable } from 'react-native';
import {ButtonSingle} from "../Component/Buttons";

export default function App({ navigation, route }) {

    const {params} = route
    return (
        <View style={{flex:1, backgroundColor:"#ffffff"}}>

            <View style={{flex:1, height:"100%", flexDirection:"column",  justifyContent:"space-around"}}>
                <ScrollView style={{ flex:1, height:"100%"}}>
                    <View style={{ flexDirection: "column", alignItems:"center", flex:1}}>

                        <Image source={{uri:params.avatar}} style={{resizeMode:"contain",  height: 250, width:250,marginTop:30, marginBottom:30}}/>

                        <Text style={{width:"90%", textAlign:"center", fontSize:36}}>{params.name}</Text>
                        <Text style={{width:"90%", textAlign:"center", fontSize:19, marginTop:5}}>{params.job}</Text>
                        <Text style={{width:"90%", textAlign:"center", fontSize:14,marginTop:25}}>{params.description}</Text>

                    </View>
                </ScrollView>
                <View style={{  height:90, alignItems:"center"}}>
                    <ButtonSingle style={{backgroundColor:"#ff2626", height:45, width: "90%", marginTop:20}} onPress={()=>  navigation.goBack()} text={"Go SimpSons"} />
                </View>
            </View>
        </View>
    );

}