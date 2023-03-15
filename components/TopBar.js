import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Alert, Modal } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign'

const TopBar = (props) => {
    const [userDetails, setUserDetails] = useState({ name: "", email: "" })

    const [showModal, setShowModal] = useState(false)
    const handleLogoutIconClick = () => {
        Alert.alert('Alert', "Are you sure to logout?", [
            {
                text: 'Cancel',
                onPress: () => {
                    // console.log("Cancelled delete")
                },
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: () => {
                    handleLogout()
                }
            }
        ],
            {
                cancelable: true,
                onDismiss: () => {
                    // console.log("Alert was dismissed by clicking outside the Alert box")
                }
            },
        )
    }

    const { handleLogout, setShowAddNote } = props

    const fetchUserDatails = async () => {
        try {
            const name = await AsyncStorage.getItem('username')
            const email = await AsyncStorage.getItem('useremail')
            setUserDetails({ name: name, email: email })
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchUserDatails()
    }, [])

    return (
        <>
            <Modal
                visible={showModal}
                transparent
                onRequestClose={() => {
                    setShowModal(false)
                }}
                animationType='slide'
                hardwareAccelerated
            >
                <View style={styles.centerd_modal}>
                    <View style={styles.modal__container}>
                        <View style={styles.modal__content}>
                            <Text style={{ fontSize: 26, textAlign: 'center', marginVertical: 10 }}>Logged in as </Text>
                            <Text style={{ textAlign: 'center' }}><FontAwesome name='user-circle' size={38} color="#581a70" style={{ marginRight: 7 }} /></Text>
                            <Text style={{ color: '#581a70', fontSize: 20, textAlign: 'center', marginVertical: 5 }}>{userDetails.name}</Text>
                            <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 13 }}>{userDetails.email}</Text>
                            <View style={styles.button_container}>
                                <Button onPress={() => { setShowModal(false) }} ><AntDesign name='closecircleo' size={16} onPress={() => { setShowModal(false) }} /> Close</Button>
                                <Button mode='contained' onPress={() => { handleLogoutIconClick() }} ><AntDesign name='logout' size={16} onPress={() => { handleLogoutIconClick() }} /> Logout</Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.topbar}>
                <View style={styles.topbar}>
                    <AntDesign name='addfile' size={30} style={{ marginLeft: 10 }} color="#581a70" onPress={() => { setShowAddNote((prevVal) => !prevVal) }} />
                    {/* <TextInput/> */}
                    <View style={styles.topbar__rightbtns}>
                        <FontAwesome name='user-circle' size={28} color="#581a70" onPress={() => { setShowModal(true) }} style={{ marginRight: 12 }} />
                        <AntDesign name='logout' size={26} color="#581a70" onPress={() => { handleLogoutIconClick() }} />
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    topbar: {
        flex: 1,
        marginTop: 8,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    topbar__rightbtns: {
        flexDirection: 'row',
    },
    centerd_modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000099'
    },
    modal__container: {
        position: 'absolute',
        top: 68,
        right: 10,
        // width: '85%',
        backgroundColor: '#fff',
        borderRadius: 7

    },
    modal__content: {
        // width: '96%',
        marginHorizontal: 22
    },
    button_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 6,
        gap: 5
    },

})


export default TopBar
