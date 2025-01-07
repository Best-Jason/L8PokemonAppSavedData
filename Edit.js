import React, { useState } from 'react';
import { TextInput, View, Text, Button,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Edit = ({ navigation, route }) => {

    let mydata = route.params?.datastring
        ? JSON.parse(route.params.datastring) // Safely parse datastring
        : []; // Fallback to an empty array if datastring is undefined

    let myIndex = route.params.index;

    const [name, setName] = useState(route.params.name); //
    const [PokNum, setPokNum] = useState(route.params.key); //

    const setData = async(value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home");
    }

    return (
        <View style={{ padding: 10, marginTop: 50 }}>

            {/* Pokemon Name INPUT (Unable to verify if name matches the number)(Unless I have the whole datasheet of 151 name,img,num,type */}

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Pokemon Nane:</Text>

                <TextInput
                    value={name}
                    style={{ borderWidth: 1}}
                    onChangeText={(text) => setName(text)}
                />
            </View>



            {/* Pokemon Num/img INPUT */}

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Pokemon Number:</Text>
                <Text style={{fontWeight:400 }}>(Check the 151 Scarlet & Violet Promotion in the Pokemon website.) </Text>
                <Text style={{fontWeight:200 }}>Bottom left of a pokemon card</Text>
                <TextInput
                    value={PokNum}
                    maxLength={3}
                    style={{ borderWidth: 1}}
                    onChangeText={(text) => setPokNum(text)}
                />
            </View>




            {/* BUTTONS */}
            <View style={{ padding: 10,flexDirection: 'row', justifyContent: 'space-between' }}>

                {/* SAVE BUTTON */}
                <View style={{flex:1, margin: 10}}>
                    <Button title="SAVE"
                            onPress={() => {
                                let indexNum=1
                                if (route.params.type == 'PokemonEx') {
                                    indexNum = 0
                                }
                                mydata[indexNum].data[route.params.index].key = PokNum;
                                mydata[indexNum].data[route.params.index].name = name;
                                let stringdata = JSON.stringify(mydata);
                                setData(stringdata);
                            }}/>
                </View>

                {/* DELETE BUTTON */}
                <View style={{flex:1, margin: 10}}>
                    <Button title="DELETE"
                            onPress={() => {
                                let indexNum=1
                                if (route.params.type == 'PokemonEx') {
                                    indexNum = 0
                                }
                                Alert.alert("Are you sure?", '',
                                    [{text:'Yes', onPress: () => {
                                            mydata[indexNum].data.splice(route.params.index, 1);
                                            let stringdata = JSON.stringify(mydata);
                                            setData(stringdata);                                        }},
                                        {text: 'No'}])
                            }}
                    />
                </View>

            </View>




        </View>
    );
};

export default Edit;
