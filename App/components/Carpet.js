import { StyleSheet, Text, View, Alert} from 'react-native';
const ROW_NUMBER = 6;

const Cell = (props) => {
    const _style = [style.cell];
    if(props.inrow == 3) {
        _style.push(style.cellStronger);
    } else if(props.inrow != 1 ){
        _style.push(style.cellLeft);
    }
    let letter = String.fromCharCode(props.number + 64);
    if(letter == "W") {
        letter = "X";
    } else if(letter == "X") {
        letter = "Y";
    }
    return (
        <View style={_style}>
            <View style={style.cellText}>
                <Text style={style.cellNumber}>{props.number}</Text>
                <Text style={style.cellLetter}>{letter}</Text>
            </View>
        </View>
    )
}

const Row = (props) => {
    const _style = [style.row];
    if(props.number != 5) {
        _style.push(style.rowBorder);
    }
    let start = (ROW_NUMBER * 4 + 1) - (4 * props.number);
    const cells = []
    for(let a = 4; a >= 1; a--) {
        cells.push(<Cell inrow={a} number={start - a} />)
    }
    return (
        <View style={_style}>
            {cells}
        </View>
    )
}

export default () => {

    const rows = [];
    for(let a = 0; a < ROW_NUMBER; a++) {
        rows.push(<Row side="left" key={"row-" + a} number={a} />)
    }
    let found = [];
    return (
        <View style={style.carpet}>
            {rows}
        </View>
    )
}

const style = StyleSheet.create({
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