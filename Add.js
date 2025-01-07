import React, {useState} from 'react'
import {TextInput, View, Text, Button} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Add = ({navigation, route}) => {
    const [PokName, setPokName] = useState('')
    const [PokNum, setPokNum] = useState('');
    const [type, setType] = useState('EX Rarity');

    const setData = async(value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home");
    }

    // const setData = async () => {
    //     try {
    //         let datastr = await AsyncStorage.getItem("alphadata");
    //         let currentData = datastr ? JSON.parse(datastr) : numbers; // Use existing data or fallback
    //
    //         const entry = {
    //             name: PokName,
    //             key: PokNum,
    //         };
    //         let indexNum = type === "EX Rarity" ? 0 : 1;
    //
    //         // Add new entry to the correct section
    //         currentData[indexNum].data.push(entry);
    //
    //         // Save updated data to AsyncStorage
    //         await AsyncStorage.setItem("alphadata", JSON.stringify(currentData));
    //         navigation.navigate("Home");
    //     } catch (error) {
    //         console.error("Error adding data:", error);
    //     }
    // };

    return (
        <View style={{padding: 10, marginTop: 50}}>


            <View style={{padding: 10}}>
                <Text style={{fontWeight:'bold'}}>Pokemon Name:</Text>
                <TextInput style={{borderWidth: 1}}
                           onChangeText={(text)=> setPokName(text)}


                />
            </View>



            {/*Pokemon Number input*/}
            <View style={{padding: 10}}>
                <Text style={{fontWeight:'bold'}}>Pokemon No.: (Check the 151 Scarlet & Violet Promotion in the Pokemon website, bottom left of a pokemon card)</Text>
                <TextInput style={{borderWidth: 1}}
                           onChangeText={(text)=> setPokNum(text)}
                           maxLength={3}  //Restrict to max of 300 number


                />
            </View>

            {/*Rarity Type selection input*/}
            <View style={{padding: 10}}>
                <Text style={{fontWeight:'bold'}}>Choose Rarity:</Text>
                <RNPickerSelect
                    value={type}
                    onValueChange={(value) => setType(value)}
                    items={[
                        {label: "EX Rarity", value: "EX Rarity"},
                        {label: "Illustration Rare", value: "Illustration Rare"}
                    ]}
                />
            </View>


            {/*Submitting all the info from input boxes above*/}
            <Button title="SUBMIT"
                    onPress={async () => {
                        let mydata = JSON.parse(await AsyncStorage.getItem("alphadata")) || numbers; // let mydata = JSON.parse(route.params.datastring);

                        const entry = {
                            name: PokName,
                            key: PokNum
                        };

                        let indexNum = type === "EX Rarity" ? 0 : 1;

                        mydata[indexNum].data.push(entry);
                        let stringdata = JSON.stringify(mydata);
                        await AsyncStorage.setItem("alphadata", stringdata); // Update AsyncStorage
                        navigation.navigate("Home"); // Navigate back to Home
                    }}/>
        </View>
    );
};
export default Add;
