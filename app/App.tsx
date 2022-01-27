import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect, Component, useState } from 'react';
import {BackHandler, Animated, StyleSheet, Text, View, Dimensions, TextInput, Pressable, ScrollView, Alert, Keyboard } from 'react-native';


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
  

  let unitType: string  = "Length";
  let endValue: number = 0;
  
  const [unicode, setUnicode] = React.useState('');
  const [numberOfUnicode, setNumberOfUnicode] = React.useState(10);
  const [value, onChangeText] = React.useState('100');
  const [unit, setUnit] = React.useState('Meters');
  const [comparasonText, setComparasonText] = React.useState('');

  const buttonSize = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setNumberOfUnicode(0);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      newExample();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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

  const rounding = (value: number) => {
    console.log("og value: " + value);
    if (value > 99) {
      return Math.round(value);
    } else if (value < 0 && value > 0.1) {return Math.round(value*1000)/1000
    } else if (value < 0.1 && value > 0.01) {return Math.round(value*10000)/10000
    } else if (value > 1 && value < 20) {return Math.round(value*100)/100
  }else if (value >20 && value < 100) {return Math.round(value*10)/10}else if (value < 0.01){return value}
}

  const newExample = () => {
console.log("new example");
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
endValue = Number(rounding(endValue/randomObject[3]));

      for (let i: number = 0; i < 20; i++) {
      let randomNum: number = Math.floor(Math.random() * 2)
                if (randomNum == 0) {setComparasonText(endValue+" "+name+" in length"); i = 20;}
        if (i >= 19) {
        setComparasonText(endValue+" "+name+" long"); i = 20;
        
        }
      }

      
    }else if (unitType = "mass") {
      endValue = Number(rounding(endValue/randomObject[2]));
        setComparasonText(endValue+" "+name+" in weight"+unicode)
    }
    
    if (endValue > 30) {endValue = 30;}
    if (endValue < 1) {endValue = 1;}
    setUnicode(randomObject[4]);
    setNumberOfUnicode(Math.round(endValue));
    
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


  let unicodeCheracters: any = [];
  for ( var i =0; i<numberOfUnicode; i++){
   unicodeCheracters.push(
      <Text
      key = {"unicode"+i}
      style = {{position: "absolute", top: vh(Math.floor(Math.random() * 50)-5),
      left: vw(Math.floor(Math.random() * 100)), fontSize: vw((Math.floor(Math.random() * 50)+10)/(numberOfUnicode/4)),
      transform: [{ rotate: Math.floor(Math.random() * 361).toString()+"deg" }]
    }}
    >{unicode}</Text>
    );
  } // % buttons are created. 
  
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
    
    
    
    const onScreenLoad = () => {
      newExample();
  }
  useEffect(() => {
      // write your code here, it's like componentWillMount
      onScreenLoad();
  }, [])
    
    return (
    <View style={styles.container}>
    <Animated.View style={{ ...styles.buttonicantthinkofaname,
        transform: [{ scale: buttonSize }],
      }}
      
      >
      <Pressable 
      style = {{flex: 1, padding: vw(3), width: vw(70), alignItems:'center', justifyContent:'center'}}
      onPressIn = {() => { boopIn() }}
        onPressOut={() => { boopOut()}}
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
    /><Text style = {{fontSize: vh(4)}}>|</Text>
    <Pressable style={styles.unitPressable}
    onPressOut={() => {
          fadeIn()
        }}
    ><Text>{unit}</Text></Pressable>
    </View></View>
      <View style={styles.bottomBox}>
        {unicodeCheracters}
      </View>
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
    alignItems:'center',
    justifyContent:'center',
  },
  input: {
    alignItems:'center',
    justifyContent:'center',
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
