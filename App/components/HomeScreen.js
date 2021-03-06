import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image,} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { render } from 'react-dom';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

class DeviceList extends Component {
	constructor(props) {
    	super(props);
		this.originalText = "Haetaan laitteita ..."
    	this.state = {
    		devices: [],
			text: this.originalText
    	}
		this.nameInc = "Muistijooga";
		this.manager = new BleManager();
		
	}
	async scanDevices() {
		this.setState({devices: [], text: this.originalText});
		//Look for devices which name includes this.nameInc
		this.manager.startDeviceScan(null, null, (error, device) => {
			if(device != null && device.name != null) {
				if(this.state.devices.indexOf(device.name) == -1 && device.name.includes(this.nameInc)) {
					console.log("Device: " + device.name)
					this.state.devices.push(device.name);
					this.setState({devices: this.state.devices, text:"Vapaat laitteet"});
				}
			}
		})
	}
	componentDidMount() {
		BluetoothStateManager.getState().then((bluetoothState) => {
			if(bluetoothState == "PoweredOff") {
				this.setState({text: "Bluetooth ei ole päällä"})
			} else if(bluetoothState == "PoweredOn") {
				this.scanDevices();
			}
		});
		BluetoothStateManager.onStateChange((bluetoothState) => {
			// do something...
			if(bluetoothState == "PoweredOn") {
				this.scanDevices();
			}
			if(bluetoothState == "PoweredOff") {
				this.setState({
					devices: [],
					text: "Bluetooth ei ole päällä"
				})
			}
		}, true /*=emitCurrentState*/);
		this.props.navigation.addListener("focus", () => {
			this.manager = new BleManager();
			this.scanDevices();
		})
		this.props.navigation.addListener("beforeRemove", () => {
			this.stop();
			this.manager.destroy();
			delete this.manager;
		})
	}
	stop() {
		this.manager.stopDeviceScan();
	}
	openDevicePage(deviceName) {
		this.props.navigation.navigate("Device", {deviceName: deviceName})
	}
	updateDevices() {
		this.setState({
			devices: [],
			text: "Päivitetään ..."
		})
		setTimeout(() => {
			this.setState({text: this.originalText})
		}, 5000)
	}
	render() {
    	return (
      		<View style={styles.container}>
				<Text onPress={() => this.updateDevices()} style={styles.updateBtn}>Päivitä</Text>
				<Text style={styles.text}>{this.state.text}</Text>
				
				{
					this.state.devices.length == 0 &&
					<Image style={styles.loader} source={require('../assets/loader.gif')} />
				}
				{this.state.devices.map((deviceName, index) => {
        			return (<Text key={deviceName} onPress={() => this.openDevicePage(deviceName)} style={styles.device}>{deviceName}</Text>);
      			})}
      		</View>
    	)
	}
}

export default class Home extends Component {
	render() {
		return (
    		<DeviceList navigation={this.props.navigation}/>
  		);
	}
}

const styles = StyleSheet.create({
	updateBtn: {
		position: "absolute",
		left: 20,
		top: 15,
		textAlign: "center"
	},
	container: {
		alignItems: "center",
		flex: 1,
		paddingTop: 39
	},
	device: {
		borderStyle: "solid",
		borderColor: "#E2E2E2",
		fontSize: 12,
		borderWidth: 1,
		width: "70%",
		textAlign: "center",
		padding: 20,
		color: "#464646",
		marginTop: 0,
		marginBottom: 10,
		backgroundColor: "#ffffff"
	},
	text: {
		paddingBottom: 25
	},
	loader: {
		width: 40,
		height: 40,
	}
});
