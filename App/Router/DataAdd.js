import {Modal, Text, TextInput, View}           from "react-native";
import {ButtonSingle}                           from "../Component/Buttons";
import React, {useState}                        from "react";
import {useData}                                from "../Storage/UseData";
import {urlCheck}                               from "../Helper/Validations";
import SnackBar                                 from "react-native-snackbar-component";


export const DataAdd = (props) => {

    const [modalVisible, setModalVisible]   = React.useState(props.visible);
    const [name,        setName]            = useState('');
    const [avatar,      setAvatar]          = useState('');
    const [job,         setJob]             = useState('');
    const [description, setDescription]     = useState('');
    const dataHook                          = useData();
    const [snackState, setSnackState]       = React.useState({
        status: false,
        text : ""
    });

    React.useEffect(()=> setModalVisible(props.visible) ,[props.visible])

    return(<Modal
        presentationStyle="pageSheet"
        animationType="slide"
        visible={modalVisible}>

        <View style={{width: "100%", height:"100%", alignItems:"center", paddingTop:20}}>

            <View style={{width:"100%", height:90, justifyContent:"center", alignItems:"center"}}>
                <Text style={{fontSize:25}}>Add New Character</Text>
            </View>

            <TextInput
                style={{paddingLeft:20,marginBottom:20, height: 55, fontSize:15, borderRadius:6, borderWidth: 1, borderColor:"#515151", width: "90%"}}
                placeholder="Name Surname"
                onChangeText={newText => setName(newText)}
                defaultValue={name}
            />
            <TextInput
                style={{paddingLeft:20,marginBottom:20, height: 55, fontSize:15, borderRadius:6, borderWidth: 1, borderColor:"#515151", width: "90%"}}
                placeholder="Job Title"
                onChangeText={newText => setJob(newText)}
                defaultValue={job}
            />
            <TextInput
                style={{paddingLeft:20,marginBottom:20, height: 55, fontSize:15, borderRadius:6, borderWidth: 1, borderColor:"#515151", width: "90%"}}
                placeholder="About Him/Her"
                onChangeText={newText => setDescription(newText)}
                defaultValue={description}
            />
            <TextInput
                style={{paddingLeft:20,marginBottom:20, height: 55, fontSize:15, borderRadius:6, borderWidth: 1, borderColor:"#515151", width: "90%"}}
                placeholder="Image Link!"
                onChangeText={newText => setAvatar(newText)}
                defaultValue={avatar}
            />

            <ButtonSingle onPress={()=>{

                if(name.length < 3 || job.length < 3 || description.length < 3 || !urlCheck(avatar))
                    return;

                // Hide
                setModalVisible(false);

                // Add Storage New Character
                dataHook.addData(name,  avatar, job, description,  (Math.random().toString().split(".")[1]).slice(0,4))

                setSnackState({
                    text:"Character Added",
                    status:true
                });

                // Clear State
                setName("");
                setJob("");
                setDescription("");
                setAvatar("");


            }} text={"Create Character"} />


            <ButtonSingle textStyle={{color:"#ee1f1f"}} style={{backgroundColor:"#ffffff", height:70, width: "50%", marginTop:10}} onPress={()=>{

                // Hide
                setModalVisible(false);
                props.onChange(false)

            }} text={"Close Modal"} />

        </View>

        <SnackBar
            visible={snackState.status}
            textMessage={snackState.text}
            actionHandler={()=>{ setSnackState({...snackState,status:false}) }}
            actionText="DISMISS"
        />
    </Modal>)
}