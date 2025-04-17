function parseUplink(device, payload)
{
    // Obtener payload como JSON
    
    var data = payload.asJsonObject();
    var bat = device.endpoints.byAddress(1);
    var temp = device.endpoints.byAddress(2);
    var rssi = device.endpoints.byAddress(3);
    var angle = device.endpoints.byAddress(4);
    var cvx = device.endpoints.byAddress(5);
    var cvy = device.endpoints.byAddress(6);
    var barrstatus = device.endpoints.byAddress(7);

    //const jsonPayload = payload.asParsedObject();
    //const jsonPayload = payload.asString();
    //const jsonPayload = payload.asBytes();

    // No se puede deserializar el payload como json, salir.
    if (!data) { return; }

    if(data.DevEUI_uplink.payload != null){
        if(data.DevEUI_uplink.payload.batteryLevel != null ){
            var barBattery = Math.trunc(data.DevEUI_uplink.payload.batteryLevel,0);
            device.updateDeviceBattery({ percentage: barBattery});
            bat.updateGenericSensorStatus(barBattery);
        }
        
        if(data.DevEUI_uplink.payload.temperatureMeasure != null){
            temp.updateTemperatureSensorStatus(data.DevEUI_uplink.payload.temperatureMeasure);
        }

        if(data.DevEUI_uplink.payload.bleBssids != null){
            if(data.DevEUI_uplink.payload.bleBssids[0].rssi != null){
                if(data.DevEUI_uplink.payload.bleBssids.length >= 1){
                    var varRSSI = data.DevEUI_uplink.payload.bleBssids[0].rssi;
                    device.updateDeviceRssi({ type: rssiType.bluetooth, strength: varRSSI})
                    rssi.updateGenericSensorStatus(varRSSI);
                }
            }
        }
        
        if(data.DevEUI_uplink.payload.angleDetection != null){
            if(data.DevEUI_uplink.payload.angleDetection.criticalVector != null){
                if(data.DevEUI_uplink.payload.angleDetection.criticalVector.length >= 2){
                    var varcvx = data.DevEUI_uplink.payload.angleDetection.criticalVector[1];
                    cvx.updateGenericSensorStatus(varcvx);
                    var varcvy = data.DevEUI_uplink.payload.angleDetection.criticalVector[0];
                    cvy.updateGenericSensorStatus(varcvy);
                    var varAngle = Math.abs(Math.round(Math.atan(varcvx / varcvy) * 180 / Math.PI, 2));

                    angle.updateGenericSensorStatus(varAngle);
                }
            }                        
            
        }
        
        if(data.DevEUI_uplink.payload.angleDetection != null){
            if(data.DevEUI_uplink.payload.angleDetection.criticalVector != null){
                if(data.DevEUI_uplink.payload.angleDetection.criticalVector.length >= 2){
                    var varcvx = data.DevEUI_uplink.payload.angleDetection.criticalVector[1];
                    cvx.updateGenericSensorStatus(varcvx);
                    var varcvy = data.DevEUI_uplink.payload.angleDetection.criticalVector[0];
                    cvy.updateGenericSensorStatus(varcvy);
                    var varAngle = Math.abs(Math.round(Math.atan(varcvx / varcvy) * 180 / Math.PI, 2));
                    if(varAngle <= 90 && varAngle >= 70){
                        var varBarrstatus = 0;}
                        else if(varAngle < 70 && varAngle >= 15){
                            varBarrstatus = 1;}
                        else if(varAngle < 15 && varAngle >= 0){
                                varBarrstatus = 2;}
                        else if(varAngle > 90 || varAngle < 0){
                                    varBarrstatus = 3;
                                }
                            }
                        }
                    }
                
                    barrstatus.updateGenericSensorStatus(varBarrstatus);
    }
}
   