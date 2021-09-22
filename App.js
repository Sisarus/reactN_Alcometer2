import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { Picker } from '@react-native-picker/picker';


export default function App() {
    const [weight, setWeight] = useState(null);
    const [bottles, setBottles] = useState(1);
    const [time, setTime] = useState(1);
    const [gender, setGender] = useState('male');
    const [promilles, setPromilles] = useState(0);

    const genders = [
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'}
    ];

    const bottlesList = [
        {label: '1 bottle', value: 1},
        {label: '2 bottles', value: 2},
        {label: '3 bottles', value: 3},
        {label: '4 bottles', value: 4},
        {label: '5 bottles', value: 5},
        {label: '6 bottles', value: 6},
        {label: '7 bottles', value: 7},
        {label: '8 bottles', value: 8},
        {label: '9 bottles', value: 9},
        {label: '10 bottles', value: 10},
    ];

    const timeList = [
        {label: '1 hour', value: 1},
        {label: '2 hours', value: 2},
        {label: '3 hours', value: 3},
        {label: '4 hours', value: 4},
        {label: '5 hours', value: 5},
        {label: '6 hours', value: 6},
        {label: '7 hours', value: 7},
        {label: '8 hours', value: 8},
        {label: '9 hours', value: 9},
        {label: '10 hours', value: 10},
    ];


    function calculate() {
        let  promilles = 0;

        if(weight === '0' || weight === null){
            setPromilles(promilles);
        } else {
            let litres = bottles * 0.33;
            let grams = litres * 8 * 4.5;
            let burning = weight / 10;
            let leftGrams = grams - burning * time;
    
            if (gender === 'male'){
                promilles = leftGrams/ (weight * 0.7);
            } else {
                promilles = leftGrams/ (weight * 0.6);
            }
    
            if(promilles > 0){
                setPromilles(promilles);
            }else{
                setPromilles(0);
            }
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.field}>
                <Text>Weight</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setWeight(text)}
                    value={weight}
                    placeholder="in kilograms"
                    keyboardType='numeric'
                ></TextInput>
            </View>
            <View style={styles.field}>
                <Text>Bottles</Text>
                <Picker
                onValueChange={(itemValue) => setBottles(itemValue)} selectedValue={bottles}>
                    {bottlesList.map((bottle, index) => (
                    <Picker.Item key={index} label={bottle.label} value={bottle.value}/>))
                }
                </Picker>

            </View>
            <View style={styles.field}>
                <Text>Time</Text>
                <Picker
                onValueChange={(itemValue) => setTime(itemValue)} selectedValue={time}>
                    {timeList.map((bottle, index) => (
                    <Picker.Item key={index} label={bottle.label} value={bottle.value}/>))
                }
                </Picker>

            </View>
                <View style={styles.field}>
                <Text>Gender</Text>
                <RadioForm
                style={styles.radio}
                buttonSize={10}
                radio_props={genders}
                initial={0}
                onPress={(value) => {setGender(value)}}/>
            </View>
            <View style={styles.field}>
                <Text>Promilles</Text>
                <Text>{promilles.toFixed(2)}</Text>
            </View>

            <Pressable onPress={calculate}>
                <Text style={styles.press}>Calculate</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    radio: {
        marginTop: 10,
        marginBottom: 10,
    },
    press:{
        textAlign: 'center',
        marginTop: 20,
        color: '#5bc0de',
        
        },
    field: {
        margin: 10,
    },
    input:{
        marginLeft: 5,
    },
});
