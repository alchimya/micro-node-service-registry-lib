/**
 * Created by domenicovacchiano on 04/07/16.
 */

var mongoose = require('mongoose');

function ServiceRegistrySchema() {

    return mongoose.Schema({
        serviceId:String,
        serviceHost:String,
        servicePort:Number,
        serviceProtocol:String,
        endpointId:String,
        endpointPath:String,
        endpointUrl:String,
        ts:String
    });

}

module.exports=ServiceRegistrySchema;
