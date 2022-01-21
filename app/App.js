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

  const buttonSize = useRef(1).current;

  const boopIn = () => {
    Animated.timing(buttonSize, {
      toValue: 1.1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const boopOut = () => {
    console.log("fadeourt");
    Animated.timing(buttonSize, {
      toValue: 1,
      useNativeDriver: false,
      duration: 300
    }).start();
  };






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
  console.log(unitList);


    const views = [];
    for ( var i =0; i<unitList.length; i++){
     views.push(
       
        <Pressable
        nativeID = {unitList[i].toString()}
         onPress ={ () => {                                // TODO https://stackoverflow.com/questions/39488876/passing-values-to-a-method-by-triggering-onpress-in-react-native 
          console.log("native id:"+self.nativeID);
          setUnit(self.nativeID);
          fadeOut();
          }}
          style={{width: vw(80)}}><Text>{unitList[i]}</Text></Pressable>
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
        three Bananaas long
      </Text></Pressable>
    </Animated.View>
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
  }
});
