import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect } from 'react';
import {BackHandler, Animated, StyleSheet, Text, View, Dimensions, TextInput, Pressable, ScrollView, Alert  } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function vh(percentage: number) {
  return ((percentage * windowHeight) / 100);
}

function vw(percentage: number) {
  return ((percentage * windowWidth) / 100);
}

export default function App() {

  const refObj = require('./refObjs.json');
  const units = require('./units.json');
  

  var unitType: string  = "Length";
  var endValue: number = 0;

  const [value, onChangeText] = React.useState('100');
  const [unit, setUnit] = React.useState('Meters');
  const [comparasonText, setComparasonText] = React.useState('Three bananananana long');

  const buttonSize = useRef(new Animated.Value(1)).current;

  

  const boopIn = () => {
    console.log("boop");
    Animated.timing(buttonSize, {
      toValue: 1.1,
      duration: 50,
      useNativeDriver: false,
    }).start();
    newExample();
  };

  const boopOut = () => {
    Animated.timing(buttonSize, {
      toValue: 1,
      useNativeDriver: false,
      duration: 50
    }).start(); 
  };


  const newExample = () => {

    if (Number(value) == NaN){ Alert.alert(
        'Invalid Number',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      ); return; }

    if (units["length"][unit] !== undefined) {
      unitType = "length";
    }else if (units["mass"][unit] !== undefined) {
      unitType = "mass";
    }
    var randomObject = refObj["list"][Math.floor(Math.random() * refObj["list"].length)];
    endValue = Number(value)*units[unitType][unit];

    var name: string


    if (endValue == 1){name = randomObject[0];}else{name = randomObject[1];} // choseing name betwene sing and plural

    if (unitType = "length") {
      endValue = endValue/randomObject[3];
        setComparasonText(endValue+" "+name+" long")
    }else if (unitType = "mass") {
      endValue = endValue/randomObject[3];
        setComparasonText(endValue+" "+name+" in weight")
    }
  
    

    console.log("unit: " + unit);
    console.log("value:"+ endValue);



  }




  const zAnim = useRef(new Animated.ValueXY({ x: vw(10), y: vh(100) })).current;
  const fadeIn = () => {

    Animated.timing(zAnim, {
      toValue: { x: vw(10), y: vh(10) },
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    console.log("fadeourt");
    Animated.timing(zAnim, {
      toValue: { x: vw(10), y: vh(100) },
      useNativeDriver: false,
      duration: 300
    }).start();
  };

  useEffect(() => {
    const backAction = () => {
      fadeOut()
      if (zAnim.x != zAnim.y) {
      return true
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  var unitList = Object.keys(units["length"]);
  unitList = unitList.concat(Object.keys(units["mass"]));
  console.log(unitList);



    const views = [];
    for ( var i =0; i<unitList.length; i++){
     views.push(
        <Pressable
        key = {unitList[i].toString()}
         onPress ={ () => { 
          console.log("setUnit")
          fadeOut();
          }}
          style={{width: vw(80)}}><Text style={styles.optionButtonText}>{unitList[i]}</Text></Pressable>
        );
    } // % buttons are created. 
    



  return (
    <View style={styles.container}>
    <Animated.View style={{ ...styles.buttonicantthinkofaname,
        transform: [{ scale: buttonSize }],
      }}
      
      >
      <Pressable 
      style = {{flex: 1, padding: vw(3), width: vw(70), alignItems:'center', justifyContent:'center'}}
      onPressIn = {() => { boopIn() }}
        onPressOut={() => { boopOut() }}
        ><Text>
        {comparasonText}
      </Text></Pressable>
    </Animated.View>
    <Animated.View style={[
          styles.unitMenu, zAnim.getLayout()
        ]}>
        <ScrollView>
        <Text>Units</Text>
        {views}
        </ScrollView>
        
        </Animated.View>
      <View style={styles.topBox}>
      <View style={styles.input}>
      <TextInput
      style={{ height: 50, borderColor: 'gray', borderWidth: 0, width: vw(30) }}
      keyboardType='number-pad'
      onChangeText={text => onChangeText(text)}
      value={value}
    />
    <Pressable style={styles.unitPressable}
    onPressOut={() => {
          fadeIn()
        }}
    ><Text>{unit}</Text></Pressable>
    </View></View>
      <View style={styles.bottomBox}></View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBox: {
    height: vh(50),
    width: vw(100),
    backgroundColor: 'white',
    alignItems:'center',
    justifyContent:'center'
  },
  bottomBox: {
    height: vh(50),
    width: vw(100),
  },
  input: {
    flexDirection: "row",
    width: vw(80),
    borderRadius: 100,
    elevation: 5,
    paddingLeft: 40,
    paddingRight: 0,
    backgroundColor: 'white', 
  },
  unitPressable: {
    flex: 1,
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
    alignItems:'center',
    justifyContent:'center'
  },
  unitMenu: {
    position: 'absolute',
    height: vh(90),
    width: vw(80),
    backgroundColor: '#fff',
    zIndex: 2,
    elevation: 5,
  }, buttonicantthinkofaname: {
    position: 'absolute',
    top: vh(50),
    left: vw(15),
    width: vw(70),
    backgroundColor: '#fff',
    elevation: 5,
    // padding: vw(3),
    alignItems: "center",
    justifyContent: "center",
  }, optionButtonText: {
    paddingLeft: vw(2),
    fontSize: vw(6),
  }
});
