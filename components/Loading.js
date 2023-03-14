import { View, StyleSheet, ActivityIndicator} from 'react-native'

export default function Loading() {

    return (
        <View style={styles.box}>
            <ActivityIndicator size="large" color= '#61daab'/>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 50
    }
})