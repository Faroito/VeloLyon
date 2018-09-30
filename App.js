import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

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

    componentWillMount(){
        this.updateVeloData();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.basicText}>Today total bikes in Lyon:</Text>
                <AnimatedCircularProgress
                    style={styles.bikeCircle}
                    size={160}
                    width={10}
                    fill={100}
                    backgroundColor="#BFC0C0"
                    tintColor="#3E7CB1"
                    onAnimationComplete={() => console.log('onAnimationComplete')}>
                    {
                        () => (
                            <Text style={[styles.basicText, styles.bikesNumber]}>
                                { this.state.veloCount }
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#80A1C1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bikeCircle: {
        margin: 20
    },
    basicText: {
        fontSize: 25,
        color: '#D9F0FF'
    },
    bikesNumber: {
        fontSize: 30
    }
});
