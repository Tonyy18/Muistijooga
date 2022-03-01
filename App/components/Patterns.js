import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';


class Pattern1 {
    static patternName = "Pattern 1";
    static backwards = false;
    static getSteps() {
        let step = 0;
        let results = []
        for(let a = 1; a <= 6; a++) {
            step++;
            results.push(step);
            step = step + 2;
            results.push(step);
            step--;
            results.push(step);
            step = step + 2;
            results.push(step);
        }
        return results;
    }
}

class Pattern2 {
    static patternName = "Pattern 2";
    static backwards = false;
    static getSteps() {
        let step = 0;
        let results = []
        for(let a = 1; a <= 6; a++) {
            if(a%2 != 0) {
                if(a == 1) {
                    step++;
                    results.push(step);
                } else {
                    step = step + 3;
                    results.push(step);
                }
                step = step + 3;
                results.push(step);
                step = step - 2;
                results.push(step);
                step++;
                results.push(step);
            } else {
                step = step + 5;
                results.push(step);
                step = step - 3;
                results.push(step);
                step = step + 2;
                results.push(step);
                step--;
                results.push(step);
            }
        }
        return results;
    }
}

class Pattern3 {
    static patternName = "Pattern 3";
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
}

class Pattern4 {
    static patternName = "Pattern 4";
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
}

class Patterns {
    constructor() {
        this.objects = [Pattern1, Pattern2, Pattern3, Pattern4];
    }
}
export {Pattern1, Pattern2, Pattern3, Pattern4}
export default new Patterns();