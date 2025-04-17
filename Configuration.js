function getConfiguration(config)
{
  // This function allows you to indicate general configuration values
  // for all devices of this model.

  // Depending on the meaning of the "device address" in this device, 
  // you may want to change the label that is used to refer to the 
  // address in the user interface.
  // For instance, if the address of the device is actually a MAC 
  // address, you may want to use the code below.
  
  config.addressLabel = {en: "DevEUI", es: "DevEUI"};
}


function getEndpoints(deviceAddress, endpoints)
{
   var Bat = endpoints.addEndpoint("1", "Battery Level", endpointType.genericSensor);
   Bat.variableTypeId = 1007;
   endpoints.addEndpoint("2", "Temperature Measure", endpointType.temperatureSensor);
   var RSSI = endpoints.addEndpoint("3", "RSSI", endpointType.genericSensor);
   RSSI.variableTypeId = 1008;
   var angle = endpoints.addEndpoint("4", "Angle", endpointType.genericSensor);
   angle.variableTypeId = 1009;
   var cvx = endpoints.addEndpoint("5", "Critical Value X", endpointType.genericSensor);
   cvx.variableTypeId = 1008;
   var cvy = endpoints.addEndpoint("6", "Critical Value Y", endpointType.genericSensor);
   cvy.variableTypeId = 1008;
   var barrstatus = endpoints.addEndpoint("7", "Status Barrera", endpointType.genericSensor);
   barrstatus.variableTypeId = 1010;
}


function validateDeviceAddress(address, result)
{
  // This function allows you to validate the address of a device, when
  // the user is creating it. If your device has special validation rules
  // for the address, you can check them here, and return an error message
  // in case the address format is incorrect.

  // In the code below, a validation is made to ensure that the address 
  // is exactly 10 characters long.
  
  if (address.length != 16) {
     result.ok = false;
     result.errorMessage = {
       en: "The address must be 16 characters long", 
       es: "La dirección debe tener exactamente 16 caracteres"
     };
   }
}

function updateDeviceUIRules(device, rules)
{
  // This function allows you to specify UI rules at the device level.
  // For instance, you can make it possible to enable or disable adding
  // endpoints manually to the device after it was created.
  
  // In the code below, adding endpoints manually is disabled in the
  // user interface. This means that the device will be limited to the 
  // endpoints defined by function getEndpoints() above.
  
  // rules.canCreateEndpoints = false;
}

function updateEndpointUIRules(endpoint, rules)
{
  // This function allows you to specify UI rules at the endpoint level.
  // For instance, you can make it possible to delete certain endpoints, 
  // or edit their endpoint subtype, if applicable.

  // In the code below, the following rules are defined:
  // - Endpoints cannot be deleted.
  // - The endpoint subtype can be changed, but only for the second 
  //   endpoint.
  
   rules.canDelete = true;
   rules.canEditSubType = (endpoint.address == "7");
}