import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';


class Test {
    static patternName = "Testi askelkuvio"
    static getSteps() {
        return [8,9,10,11,12,13]
    }
    static getLeftSteps() {
        return [8,10,12]
    }
    static getRightSteps() {
        return [9,11,13]
    }
    static getLowerSteps() {
        return [];
    }
}
class Pattern1 {
    static patternName = "Askelkuvio 1";
    static getSteps(back = false) {
        const up = [1,3,2,4,5,7,6,8,9,11,10,12,13,15,14,16,17,19,18,20,21,23,22,24];
        const down = [23,21,20,18,19,17,16,14,15,13,12,10,11,9,8,6,7,5,4,2,3,1];
        if(back == false) {
            return up;
        } else if(back == true) {
            return down;
        } else if(back == null){
            return up.concat(down);
        }
    }
    static getSideSteps(start) {
        let results = [];
        for(let a = 1; a <= 6; a++) {
            results.push(start);
            start++;
            results.push(start);
            start = start + 3;
        }
        return results;
    }
    static getLeftSteps() {
        return this.getSideSteps(1);
    }
    static getRightSteps() {
        return this.getSideSteps(3);
    }
    static getLowerSteps() {
        let results = []
        let step = 1;
        for(let a = 0; a <= 6; a++) {
            results.push(step);
            step = step + 2;
            results.push(step);
            step = step + 2;
        }
        return results;
    }
}

class Pattern2 {
    static patternName = "Askelkuvio 2";
    static getSteps(back) {
        const up = [1,4,2,3,8,5,7,6,9,12,10,11,16,13,15,14,17,20,18,19,24,21,23,22];
        const down = [17,20,18,19,16,13,15,14,9,12,10,11,8,5,7,6,1,4,2,3];
        if(back == false) {
            return up;
        } else if(back == true) {
            return down;
        } else if(back == null){
            return up.concat(down);
        }
    }
    static getLeftSteps() {
        return Pattern1.getSideSteps(1);
    }
    static getRightSteps() {
        return Pattern1.getSideSteps(3);
    }
    static getLowerSteps() {
        let results = []
        let step = 1;
        for(let a = 0; a <= 6; a++) {
            results.push(step);
            step = step + 3
            results.push(step);
            step = step + 1;
        }
        return results;
    }
}

class Pattern3 {
    static patternName = "Askelkuvio 3";
    static backwards = true;
    static getSteps(back = false) {
        const up  = [1, 6, 9, 14, 17, 22];
        const down = [23, 20, 15, 12, 7, 4];
        if(back == false) {
            return [1, 6, 9, 14, 17, 22];
        } else if(back == true) {
            return [23, 20, 15, 12, 7, 4];
        } else if(back == null) {
            return up.concat(down);
        }
    }
    static getLeftSteps(back = null) {
        if(back == false) {
            return [6, 14, 22]
        } else if(back == true) {
            return [20,12,4]
        } else if(back == null) {
            return [6,14,22,20,12,4];
        }
    }
    static getRightSteps(back = null) {
        if(back == false) {
            return [1,9,17]
        } else if(back == true) {
            return [23,15,7]
        } else if(back == null) {
            return [1,9,17,23,15,7];
        }
    }
    static getLowerSteps() {
        return [];
    }
}

class Pattern4 {
    static patternName = "Askelkuvio 4";
    static backwards = true;
    static getSteps(back = false) {
        const up = [2,3,4,1,7,6,5,8,10,11,12,9,15,14,13,16,18,19,20,17,23,22,21,24];
        const down = [18,19,20,17,15,14,13,16,10,11,12,9,7,6,5,8,2,3,4,1];
        if(back == false) {
            return up;
        } else if(back == true) {
            return down;
        } else if(back == null) {
            return up.concat(down);
        }
    }
    static getSideSteps(start) {
        let results = [];
        let step = start;
        for(let a = 1; a <= 6; a++) {
            results.push(step);
            step = step + 2;
            results.push(step);
            step = step + 2;
        }
        return results;
    }
    static getLeftSteps() {
        return this.getSideSteps(1)
    }
    static getRightSteps() {
        return this.getSideSteps(2)
    }
    static getLowerSteps() {
        let results = []
        let step = 2;
        for(let a = 0; a <= 6; a++) {
            results.push(step);
            step++;
            results.push(step);
            step = step + 3;
        }
        return results;
    }
}

class Patterns {
    constructor() {
        this.objects = [Pattern1, Pattern2, Pattern3, Pattern4,Test];
    }
}
export {Pattern1, Pattern2, Pattern3, Pattern4,Test}
export default new Patterns();