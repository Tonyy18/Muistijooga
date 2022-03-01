import { StyleSheet, Text, View, Alert, Image} from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import Patterns from "./Patterns"
const ROW_NUMBER = 6;

class Cell extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let _style = [style.cell];
        if(this.props.inrow == 3) {
            _style.push(style.cellStronger);
        } else if(this.props.inrow != 1 ){
            _style.push(style.cellLeft);
        }
        let letter = String.fromCharCode(this.props.number + 64);
        if(letter == "W") {
            letter = "X";
        } else if(this.letter == "X") {
            letter = "Y";
        }
        let data = this.props.data.split(":") //Data from sensor
        let pattern = this.props.pattern //Pattern in use
        let image = <Image style={style.stepImage} source={require('../assets/step-right.png')} />;
        if(data.indexOf(String(this.props.number)) > -1) {
            image = <Text>Pressed</Text>
        }
        return (
            <View style={_style}>
                <View style={style.cellText}>
                    <Text style={style.cellNumber}>{this.props.number}</Text>
                    <Text style={style.cellLetter}>{letter}</Text>
                </View>
                <View style={style.imageParent}>{image}</View>
            </View>
        )
    }
}

class Row extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let _style = [style.row];
        if(this.props.number != 5) {
            _style.push(style.rowBorder);
        }
        let start = (ROW_NUMBER * 4 + 1) - (4 * this.props.number);
        let cells = []
        for(let a = 4; a >= 1; a--) {
            cells.push(<Cell inrow={a} number={start - a} key={a} data={this.props.data} pattern={this.props.pattern}/>)
        }
        return (
            <View style={_style} key={this.props.number}>
                {cells}
            </View>
        )
    }
}

export default class Carpet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pattern: Patterns.objects[0]
        }
        this.pickerItems = [];
        for(let a = 0; a < Patterns.objects.length; a++) {
            const pattern = Patterns.objects[a].patternName;
            this.pickerItems.push(<Picker.Item label={pattern} value={Patterns.objects[a]}/>)
        }
    }

    

    render() {
        let rows = [];
        for(let a = 0; a < ROW_NUMBER; a++) {
            rows.push(<Row side="left" key={"row-" + a} number={a} data={this.props.data} pattern={this.state.pattern}/>)
        }
        return (
            
            <View style={style.carpet}>
                <Picker style={style.picker}
                selectedValue={this.state.pattern} 
                onValueChange={(item, index) => {this.setState({pattern:item})}}>
                    {this.pickerItems}
                </Picker>
                <Text>{this.props.data}</Text>
                {rows}
            </View>
        )
    }
}

const style = StyleSheet.create({
    picker: {
        marginBottom: 20,
        borderStyle: "solid",
		borderColor: "black",
		borderWidth: 1,
    },
    imageParent: {
        height: "45%",
        width: "45%",
        flex: 1,
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto"
    },
    stepImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "contain"
    },
    carpet: {
        padding: 20,
        flex: 1,
        flexDirection: "column"
    },
    row: {
        flex: 1,
        flexDirection: "row"
    },
    rowBorder: {
        borderBottomColor: "#E2E2E2",
        borderStyle: "solid",
        borderBottomWidth: 1
    },
    cell: {
        width: "25%",
        padding: 10,
    },
    cellStronger: {
        borderRightColor: "#B3B3B3",
        borderRightWidth: 2,
        borderStyle: "solid",
    },
    cellLeft: {
        borderRightColor: "#E2E2E2",
        borderStyle: "solid",
        borderRightWidth: 1
    },
    cellText: {
        flex: 1,
        flexDirection: "row",
        position: "absolute",
        top: 10,
        right: 10,
    },
    cellNumber: {
        marginRight: 5
    }
})