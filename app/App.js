import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect } from 'react';
import {BackHandler, Animated, StyleSheet, Text, View, Dimensions, TextInput, Pressable  } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function vh(percentage) {
  return ((percentage * windowHeight) / 100);
}

function vw(percentage) {
  return ((percentage * windowWidth) / 100);
}

export default function App() {

  const units = require('./units.json');

  

  const [value, onChangeText] = React.useState('');
  const [unit, setUnit] = React.useState('M');

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
      if (zAnim.y._value < 100) {
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
  unitList = unitList.concat(Object.keys(units["surfaceArea"]));
  console.log(unitList);


    const views = [];
    for ( var i =0; i<unitList.length; i++){
     views.push(
        <Pressable onPress ={ () => {

          fadeOut();
          }}
          style={{width: vw(80)}}><Text>{unitList[i]}</Text></Pressable>
        );
    } // % buttons are created. 
    








  return (
    <View style={styles.container}>
    <Animated.View style={[
          styles.unitMenu, zAnim.getLayout()
        ]}>
        {views}
        </Animated.View>
      <View style={styles.topBox}>
      <View style={styles.input}>
      <TextInput
      style={{ height: 50, borderColor: 'gray', borderWidth: 0, width: vw(40) }}
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
  }
});
