# micro-node-service-registry-lib
An utility library that helps to implements a service registry, server-side discovery, for NodeJs microservices.

# What is this?
Developing a NodeJs Microservices Architecture, most of the time, you need to do some tedious operations.
<br/>
This library will help you with the implementation of  the service registry using the server-side discovery pattern with a NodeJs microservice.
<br/>
# How to install
The library is depending of micro-node-mongo-lib, so it is required to setup throught npm:
<br>
<b>sudo npm install</b>

# How to use
Well, it is intended that you are familiar with Microservices Architectures, Service Registry and Discovery Patterns.
<br/>
The basic idea of this library is very similar to the solution proposed by Auth0 (https://auth0.com/blog/2015/10/02/an-introduction-to-microservices-part-3-the-service-registry/)
<br/>
You must register your service after that the server is up and will be unregistered when the server instance wille be destroyed.
<br/>
It is quite clear that, depending of your requirements, you can implement a watchdog system that auto-update the service registry.

```javascript
   var address = require('network-address'),
    serviceRegistry = require ('micro-node-service-registry-lib')({
        name:"my_service_registry_db",
        user:"my_db_user",
        password:"my_db_passwor",
        host:"my_host_db",
        port:27018,
        connectionPool:1000
    }),
    serverConfig={
        server:{
            port:8080
        }
    },
    serverId="my_login_ms",
    endpointId="login"

    var server = require ('micro-node-net-lib').server(serverConfig);

    server.create(function (err,server) {
        if (err){
            console.log(err);
        }else {

            serviceRegistry.register({
                serviceId:serverId,
                serviceHost:address(),
                servicePort:serverConfig.server.port,
                serviceProtocol:"https",
                endpointId:endpointId,
                endpointPath:"api/account/login"
            }, function (err,item) {
                console.log(err);
                console.log(item);
            });

            console.log("Server is listening");
        }
    });

    server.registerExitHandler(function () {
         serviceRegistry.unregister(serverId,endpointId,function (err,item) {
            if (!err){
                process.exit();
            }
         });
    });
```
