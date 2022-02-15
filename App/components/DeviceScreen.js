import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { render } from 'react-dom';
import base64 from 'react-native-base64'

class DataList extends Component {
    constructor(props) {
        super(props);
        this.deviceName = this.props.route.deviceName;
        this.found = false;
        this.serviceUUID = "0000180c-0000-1000-8000-00805f9b34fb";
        this.service = null;
        this.charactUUID = "2A56";
        this.charact = null //characteristic object to read
        this.device = null;
        this.transactionId = this.deviceName;
        this.subscription = null;
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
			if(device != null && device.name != null) {
				if(device.name == this.deviceName && this.found == false) {
                    this.found = true;
                    console.log("device found: " + this.deviceName);
                    device.connect().then((device) => {
                        this.setState({
                            stateText: "Haetaan palveluita..."
                        })
                        this.manager.stopDeviceScan();
                        console.log("Connected");
                        return device.discoverAllServicesAndCharacteristics()
                    }).then((device) => {
                        this.device = device;
                        device.services().then((services) => {
                            for(let a = 0; a < services.length; a++) {
                                const service = services[a];
                                if(service.uuid == this.serviceUUID) {
                                    this.service = service;
                                    this.setState({
                                        stateText: "Haetaan ominaisuuksia..."
                                    })
                                    service.readCharacteristic(this.charactUUID, this.transactionId).then((charact) => {
                                        this.charact = charact;
                                        this.subscription = charact.monitor((error, charact) => {
                                            if(charact == null) return;
                                            const value = base64.decode(charact.value);
                                            this.setState({
                                                data: value,
                                                stateText: ""
                                            })
                                        })
                                    }).catch(() => {})
                                }
                            }
                        })
                        device.characteristicsForService(this.serviceUUID).then((chars) => {
                            if(chars.length > 0) {
                                this.charactUUID = chars[0]["uuid"];
                                setInterval(() => {

                                })
                            }
                        })
                    })
                }
			}
		})
    }
    componentDidMount() {
		this.props.navigation.addListener("focus", () => {
			this.manager = new BleManager();
			this.findDevice();
		})
		this.props.navigation.addListener("beforeRemove", () => {
            clearInterval(this.interval);
            if(this.device != null) {
                if(this.subscription != null) {
                    this.subscription.remove();
                }
                this.device.cancelConnection().catch(() => {
                    //To avoid stupid warnings
                });
            }
			this.manager.stopDeviceScan();
			this.manager.destroy();
			delete this.manager;
		})
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
                <Text style={styles.dataText}>{this.state.data}</Text>
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
		paddingTop: 39
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
	}
})
