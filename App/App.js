import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Carpet from "./components/Carpet"
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();
const DeviceListItem = (props) => {
  return (
    <Text style={styles.device}>{props.name}</Text>
  )
}
const DeviceList = () => {
  const [devices, setState] = useState([]);

  useEffect(() => {
    let isMounted = true
    manager.startDeviceScan(null, null, (error, device) => {
      if(device != null && device.name != null && devices.indexOf(device.name) == -1) {
        console.log(device.name)
        devices.push(device.name);
        setState(devices)
      }
    })
  })

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Muistijooga</Text>
      {devices.map((deviceName, index) => {
        return (<DeviceListItem key={deviceName} name={deviceName}/>);
      })}
    </View>
  )
}

export default function App() {
  return (
    <DeviceList />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 65
  },
  header: {
    fontSize: 35,
    paddingBottom: 40,
    color: "#009BFF"
  },
  device: {
    borderStyle: "solid",
    borderColor: "#E2E2E2",
    fontSize: 18,
    borderWidth: 1,
    width: "70%",
    textAlign: "center",
    padding: 20,
    color: "#464646",
    marginTop: 15,
    marginBottom: 15
  }
});
