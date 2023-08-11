import React, {useState, useEffect, useRef} from 'react';
import { Button, View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

export function InputOTPScreen({ navigation }) {
    let textInput = useRef(null)
    let clockCall = null
    const lengthInput = 6;
    const defaultCountdown = 30;
    const [internalVal, setInternalVal] = useState(""); // Corrigido para V maiúsculo

    const [countdown, setCountdown] = useState(defaultCountdown)
    const [enableResend, setEnableResend] = useState(false)

    useEffect(() =>{
        clockCall = setInterval(() => { // Corrigido para setInterval
            decrementClock();
        }, 1000);
        return () => {
            clearInterval(clockCall);
        };
    });
    

    const decrementClock = () => {
        if (countdown === 0) {
            setEnableResend(true)
            setCountdown(0)
            clearInterval(clockCall)
        } else {
            setCountdown(countdown -1)
        }
        
    }

    const onChangeText = (val) => {
        setInternalVal(val)
        if (val.length === lengthInput) {
            navigation.navigate('Home')
        }
    }

    const onResendOTP = () => {
        if(enableResend) {
            setCountdown(defaultCountdown)
            setEnableResend(false)
            clearInterval(clockCall)
            clockCall = setInternalVal(() => {
                decrementClock()
            }, 1000)
        }             
    }

    const onChangeNumber = () => {
        setInternalVal("")
    }
    
    useEffect(() => {
        textInput.current.focus(); // A mudança está aqui
    }, []);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                KeyboardVerticaloffset={50}
                behavior={'padding'}
                style={styles.containerAvoiddingView}
           >
                <Text style={styles.titleTile}>
                    {"Insira o código enviado via SMS"}
                </Text>
                <View>
                <TextInput
                    ref={textInput} // Definir a referência diretamente
                    onChangeText={onChangeText}
                    style={{ width: 1, height: 1 }} // Defina uma largura e altura mínima
                    value={internalVal}
                    maxLength={lengthInput}
                    returnKeyType="done"
                    keyboardType="numeric"
                />
                    <View style={styles.containerInput}> 
                    {
                        Array(lengthInput).fill().map((data, index) => (
                            <View key={index.toString()} style={[
                                styles.cellView,
                                {
                                    borderBottomColor: index === internalVal.length ? '#FB6C6A': '#234DB7'
                                }
                                ]}>
                                <Text style={styles.cellText}
                                    onPress={() => textInput.focus()}
                                >
                                    {internalVal && internalVal.length > 0 ? internalVal[index]: ""}
                                </Text>
                            </View>))
                    }

                        
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <TouchableOpacity onPress={onChangeNumber}>
                        <View style={styles.btnChangeNumber}>
                            <Text>
                                <Text style={styles.textChange}>Alterar</Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onResendOTP}>
                        <View style={styles.btnResend}>
                            <Text>
                                <Text style={[
                                    styles.textResend,
                                    {
                                        color: enableResend ? '#234DB7' : 'gray'
                                    }
                                    ]}>Reenviar ({countdown}) </Text>
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
    titleTile: {
        marginTop: 50,
        marginBottom: 50,
        fontSize: 16
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cellView: {
        paddingVertical: 11,
        width: 40,
        margin: 5,
        justifyContent: 'center',
        alignItems:'center', 
        borderBottomWidth: 1.5
    },
    cellText: {
        textAlign: 'center',
        fontSize: 16
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Espalhe os botões uniformemente
        marginBottom: 50,
        paddingHorizontal: 10 // Adicione algum preenchimento horizontal para separá-los das bordas
      },

    btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center', // Alinhe o texto no centro
    justifyContent: 'center',
    borderWidth: 1, // Adicione uma borda
    borderColor: '#234DB7' // Cor da borda
  },

    textChange: {
    color: '#234DB7',
    fontSize: 15
  },

    btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center', // Alinhe o texto no centro
    justifyContent: 'center',
    borderWidth: 1, // Adicione uma borda
    borderColor: '#234DB7' // Cor da borda
  },
    textResend: {
        fontSize: 15
    }
  })