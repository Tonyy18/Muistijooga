import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';


class Pattern1 {
    static patternName = "Pattern1";
    static steps = [1,2,3,4]
}

class Patterns {
    constructor() {
        this.allObjects = [Pattern1];
        this.all = {};
        for(let a = 0; a < this.allObjects.length; a++) {
            this.all[this.allObjects[a].name] = this.allObjects[a];
        }
    }
}
export {Pattern1}
export default new Patterns();