import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity, TouchableWithoutFeedbackBase} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { render } from 'react-dom';
import base64 from 'react-native-base64'
import Carpet from "./Carpet.js";

class DataList extends Component {
    constructor(props) {
        super(props);
        this.deviceName = this.props.route.deviceName;
        this.found = false;
        this.serviceUUID = "0000180c-0000-1000-8000-00805f9b34fb";//Specified in arduino code
        this.service = null;
        this.charactUUID = "2A56";
        this.charact = null //characteristic object to read
        this.device = null;
        this.transactionId = this.deviceName;
        this.subscriptions = [];
        this.state = {
            data: "",
            stateText: ""
        }
        this.manager = new BleManager();
    }
    async findDevice(name) {
        this.setState({
            data: [],
            stateText: "Yhdistetään..."
        })
		this.manager.startDeviceScan(null, null, (error, device) => {
            //Find device with matching name 
			if(device != null && device.name != null) {
				if(device.name == this.deviceName && this.found == false) {
                    this.manager.stopDeviceScan();
                    this.found = true;
                    console.log("device found: " + this.deviceName);
                    //Connect to the device found
                    device.connect().then((device) => {
                        this.setState({
                            stateText: "Haetaan palveluita..."
                        })
                        console.log("Connected");
                        return device.discoverAllServicesAndCharacteristics()
                    }).then((device) => {
                        this.device = device;
                        device.services().then((services) => {
                            for(let a = 0; a < services.length; a++) {
                                const service = services[a];
                                //Look for the specific service
                                if(service.uuid == this.serviceUUID) {
                                    this.service = service;
                                    this.setState({
                                        stateText: "Haetaan ominaisuuksia..."
                                    })
                                    device.characteristicsForService(this.serviceUUID).then((chars) => {
                                        //Find and read from characteristic
                                        if(chars.length > 0) {
                                            this.charactUUID = chars[0]["uuid"];
                                            service.readCharacteristic(this.charactUUID, null).then((charact) => {
                                                this.charact = charact;
                                                this.setState({
                                                    stateText: "Odotetaan sensori dataa ..."
                                                })
                                                //Add a monitorin to the caracteristic to receive data automatically
                                                this.subscriptions.push(charact.monitor((error, charact) => {
                                                    if(charact == null) return;
                                                    const value = base64.decode(charact.value);
                                                    this.setState({
                                                        data: value,
                                                        stateText: ""
                                                    })
                                                }));
                                            }).catch(() => {})
                                        }
                                    })
                                }
                            }
                        }).then(() => {
                            this.subscriptions.push(device.onDisconnected(() => {
                                this.found = false;
                                this.findDevice();
                            }));
                        })
                    }).catch(() => {})
                }
			}
		})
    }
    removeSubscriptions() {
        for(let a = 0; a < this.subscriptions.length; a++) {
            this.subscriptions[a].remove();
        }
    }
    destroy () {
        //Destory manage properly
        if(this.device != null) {
            this.removeSubscriptions();
            this.device.cancelConnection().then(() => {
                console.log("disconnected");
            }).catch(() => {
                //To avoid stupid warnings
            });
        }
        this.manager.stopDeviceScan();
        this.manager.destroy();
        delete this.manager;
    }
    componentDidMount() {
        //Start device scanning automatically
		this.props.navigation.addListener("focus", () => {
			this.manager = new BleManager();
			this.findDevice();
		})
		// this.props.navigation.addListener("beforeRemove", () => {
        //     this.destroy();
		// })
	}
    componentWillUnmount() {
        this.destroy();
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.data.length == 0 &&
                    <Image style={styles.loader} source={require('../assets/loader.gif')} />
                }
                {
                    this.state.stateText.length != 0 &&
                    <Text style={styles.stateText}>{this.state.stateText}</Text>
                }
                {
                    this.state.data.length != 0 &&
                    <Carpet data={this.state.data}/>
                }
            </View>
        )
    }
}

export default class DeviceScreen extends Component {
    render() {
        return <DataList route={this.props.route.params} navigation={this.props.navigation}/>
    }
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		alignItems: "center",
	},
    dataText: {
        fontSize: 30
    },
    stateText: {
        paddingTop: 10
    },
    loader: {
		width: 40,
		height: 40,
        marginTop: 39
	}
})
