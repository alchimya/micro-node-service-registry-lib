/**
 * Created by domenicovacchiano on 07/07/16.
 */

var serviceSchema=require('./service-registry-schema')();
/*
 config={
     "name":"db_name",
     "user":"db_user",
     "password":"db_password",
     "host":"db_server_host",
     "port":db_server_port,
     "connectionPool":connection pool number
     "schema":"object_schema"
 }
 */

function ServiceRegistry(config) {

    var db=require('micro-node-mongo-lib').mongodb({
            name:config.name,
            user:config.user,
            password:config.password,
            host:config.host,
            port:config.port
        }),
        serviceModel = db.model('services', serviceSchema);

    return{
        register:function (service,callback) {

            this.find(service.serviceId,service.endpointId,function (err,found) {
                if (!found){
                    serviceItem = new serviceModel({
                            serviceId:service.serviceId,
                            serviceHost:service.serviceHost,
                            servicePort:service.servicePort,
                            serviceProtocol:service.serviceProtocol,
                            endpointId:service.endpointId,
                            endpointPath:service.endpointPath,
                            endpointUrl: service.serviceProtocol + "://" + service.serviceHost + ":" + service.servicePort + "/" + service.endpointPath ,
                            domain: service.serviceProtocol + "://" + service.serviceHost + ":" + service.servicePort,
                            ts:Date().toString()
                        }
                    );
                } else {
                    found.ts=Date().toString();
                    serviceItem=found;
                }
                serviceItem.save(function (err, item) {
                    callback(err,item);
                });
            });
        },
        unregister:function (serviceId, endpointId,callback) {
            db.collections.services.remove({
                serviceId: serviceId,
                endpointId:endpointId
            },function (err,item) {
                callback(err,item);
            });
        },
        find:function (serviceId, endpointId,callback) {
            serviceModel.findOne({
                serviceId: serviceId,
                endpointId:endpointId
            }, callback);
        }
    };
}

module.exports=ServiceRegistry;