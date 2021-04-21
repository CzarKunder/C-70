import React,{Component} from 'react'
import {View,Text,TouchableOpacity,TextInput} from 'react-native'
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'
export default class BookTransactionScreen extends Component{
    constructor(){
        super()
        this.state={
            hasCameraPermission:null,
            scanData:'',
            scan:false,
            buttonState:'normal',
            scanBookId:'',
            scanStudentID:'',
        }
    }
    GetCameraPermission=async(id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission:status==='granted',
            buttonState:id,
            scan:false
            
        })
        
    }
    HandleBarcodeScan=async({type,data})=>{
        const {buttonState}=this.state
        if(buttonState==='BookId'){
            this.setState({
                scan:true,
                scanBookId:data,
                buttonState:'normal'
            })
        }
        else if(buttonState==='StudentId'){
            this.setState({
                scan:true,
                scanStudentId:data,
                buttonState:'normal'
            })
        }
    }
    render(){
        if (this.state.buttonState!=='normal' && this.state.hasCameraPermission){
            return(
                <BarCodeScanner
                onBarCodeScanned={this.state.scan?undefined:this.HandleBarcodeScan}
                style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(this.state.buttonState==='normal'){
        
        
        return(
            <View>
                <TextInput placeholder='Book ID'/>
                <TouchableOpacity
                onPress={()=>{this.GetCameraPermission('BookId')}}
                >
                    <Text>Scan book ID</Text>
                </TouchableOpacity>
                <TextInput placeholder='Student ID'/>
                <TouchableOpacity
                onPress={()=>{this.GetCameraPermission('StudentId')}}
                >
                    <Text>Scan student ID</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>
                        submit
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}   
}