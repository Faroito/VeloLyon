import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default class VeloLyonApp extends React.Component {
    constructor() {
        super();
        this.state = {
            veloCount: 0
        }
    }

    updateVeloData = () => {
        fetch('https://download.data.grandlyon.com/ws/rdata/pvo_patrimoine_voirie.pvocomptagevelo/all.json')
            .then(response => response.json())
            .then(data => {
                var veloNb = 0;
                data.values.forEach(function (site) {
                    if (site.counts !== "None")
                        veloNb += Number(site.counts);
                })
                this.setState({veloCount: veloNb});
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Today total vélo in Lyon: { this.state.veloCount }</Text>
                <Button title="Update!" onPress={this.updateVeloData}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
