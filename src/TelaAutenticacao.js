import React, {useState, useRef, useEffect} from 'react';
import { 
    Button, View, Text, StyleSheet, KeyboardAvoidingView, FlatList, TouchableWithoutFeedback, Modal, filterCountries
} from 'react-native';


import { TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Countries } from './Countries';

export function TelaAutenticacao({ navigation }) {
    let textInput = useRef(null)
    const defaultCodeCountry = "+55"
    const [phoneNumber, setPhoneNumber] = useState();
    const [focusInput, setFocusInput] = useState(true);
    const [modalVisible, setModalVisible] = useState(false)
    const [dataCountries, setDataCountries] = useState(Countries)
    const [codeCountry, setCodeCountry] = useState(defaultCodeCountry)

    const onShowHideModal = () => {
        setModalVisible(!modalVisible)
    }

    const onChangePhone = (number) => {
        setPhoneNumber(number);
    }

    const onPressContinue = () => {
        if(phoneNumber) {
            navigation.navigate('InputOTP')
        }
    }

    const onChangeFocus =() => {
        setFocusInput(true);
    }

    const onChangeBlur =() => {
        setFocusInput(false);
    }

    useEffect(() => {
        textInput.focus();
    },[]) 

    const filterInputStyle = (value) => {
        if(value){
            const countryData = dataCountries.filter((obj) => (obj.en.indexOf > -1 || obj.dialCode.indexOf(value) > -1))
            setDataCountries(countryData)
        } else {
            setDataCountries(Countries )
        }
    }

    const onCountryChange = (item) => {

    }

    let renderModal = () => {
        return (
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.modalContainer}>
                        <View style={styles.filterInputContainer}>
                            <TextInput
                                autoFocus={true}
                                onChangeText={filterCountries}
                                placeholder={'Filter'}
                                focusable={true}
                                style={styles.filterInputStyle}

                            />
                        </View>
                        
                        <FlatList
                        style={{flex: 1}}
                        data={dataCountries}
                        extraData={dataCountries} 
                        keyExtractor={(intem, index) => index.toString()}
                        renderItem={
                            ({item}) => (
                                <TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                                    <View style={styles.countryModalStyle}>
                                        <View style={styles.modalItemContainer}>
                                            <Text style={styles.modalItemName}>{item.en}</Text>
                                            <Text style={styles.modalItemDialCode}>{item.dialCode}</Text>                                      
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }
                    />
                    </View>

                    <TouchableOpacity onPress={onShowHideModal} style={styles.closeButtonStyle}>
                        <Text style={styles.closeTextStyle}>
                            {'CLOSE'}
                        </Text>
                    </TouchableOpacity>
                    
                </SafeAreaView>

            </Modal>
        )
    }
     
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
            KeyboardVerticaloffset={50}
            behavior={'padding'}
            style={styles.containerAvoiddingView}
        >
            <Text style={styles.textTitle}>{"Por favor insira seu numero de telefone"}</Text>
            <View style={[
                styles.containerInput,
                {
                    borderBottomColor: focusInput ? '#244DB7' : '#ffffff'
                }
                
                ]}>
                <TouchableOpacity onPress={onShowHideModal}>
                <View style={styles.openDialogView}>
                    <Text>
                        {"+84  |"}
                    </Text>
                </View>
                </TouchableOpacity>
                {renderModal()}
                <TextInput
                    ref={(input) => textInput = input}
                    style={styles.phoneInputStyle}
                    placeholder="902 291 011"
                    keyboardType="numeric"
                    value={phoneNumber}
                    onChangeText={onChangePhone}
                    secureTextEntry={false}
                    onFocus={onChangeFocus}
                    onBlur={onChangeBlur}
                    autoFocus={focusInput}
                />
            </View>

            <View style={styles.viewBottom}>
                <TouchableOpacity onPress={onPressContinue}>
                    <View style={[
                            styles.btnContinue,
                            {
                                backgroundColor: phoneNumber? '#244DB7' : 'gray'
                            }
                        ]}>
                        <Text style={styles.textContinue}>
                            Continue
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
      </View>
    );
  }

  const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        containerAvoiddingView: {
            flex: 1,
            alignItems: 'center',     // Alinha os filhos horizontalmente ao centro
            padding: 5
        },
        textTitle: {
            marginBottom: 50,
            marginTop: 50,
            fontSize:16
        },
        containerInput: {
            flexDirection: 'row',
            paddingHorizontal: 12,
            borderRadius: 10,
            backgroundColor: 'white',
            alignItems: 'center',
            borderBottomWidth: 1.5
        },
        openDialogView: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'

        },
        phoneInputStyle: {
            marginLeft: 5,
            flex: 1,
            height: 50  
        }, 
        viewBottom: {
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 50,
            alignItems: 'center'
        },
        btnContinue: {
            width: 150,
            height: 50,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        textContinue: {
            color: '#ffffff',
            alignItems: 'center'
        },
        modalContainer: {
            paddingTop: 15,
            paddingLeft: 25,
            paddingRight: 25,
            flex: 1,
            backgroundColor: 'white'
        },
        filterInputStyle: {
            flex: 1,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: '#fff',
            color: '#424242'
        },
        countryModalStyle: {
            flex: 1,
            borderColor: 'black',
            borderColor: 'black',
            borderTopWidth: 1,
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        modalItemContainer: {
            flex: 1,
            paddingLeft: 5,
            flexDirection: 'row'
        },
        modalItemName: {
            flex: 1,
            fontSize: 16
        },
        modalItemDialCode: {
            fontSize: 16
        },
        filterInputContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        closeButtonStyle: {
            padding: 12,
            alignItems: 'center'
        },

        closeTextStyle: {
            padding: 5,
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold'
        }

        
  })