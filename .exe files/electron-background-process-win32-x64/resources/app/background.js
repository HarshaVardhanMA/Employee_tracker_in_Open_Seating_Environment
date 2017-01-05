//var $ = require('jQuery');

 $(document).ready(function(){
var prevEmac = 0;
var macid ;
var Emac;
function backgroundprocess(){
    var getmac = require('getmac');
    var remote = require('electron').remote
    var main = remote.require('./main.js');
    var myip = require('quick-local-ip');
    var MacAddress = require('get-mac-address');
    var network = require('network');
    var arp = require('node-arp');
    
     //ipAddr = myip.getLocalIP4();
     
    getmac.getMac(function(err,macAddress){
    if (err)  throw err
    console.log(macAddress)
    Emac = macAddress;
})
    network.get_active_interface(function(err, obj){
        
        gtip = obj.gateway_ip;
        //alert ("gatewayip is :"+gtip);
        
        arp.getMAC(gtip, function(err, mac) {
            if (!err) {
                macid=mac;
               // alert("mac address is :"+macid);
               console.log("mac address of router :"+macid);
               console.log("prevIp is :"+prevEmac);
               console.log("ipAddr is :"+Emac);
                        if (prevEmac != Emac){
                            console.log("ajax");
                            $.post("http://localhost:3000/present_loc",{mac:Emac,ip:macid},function(data){
                                console.log(data);
                            });
                               
                        }
                    // }
                    
                 prevEmac=Emac;
               
               
            }
            else{
                console.log("Problem in getting the mac address of router .."+ err);
            }
            
            
        });
       
    });
    
    
    
    
    /*
        */
      

    }
setInterval( backgroundprocess, 5000);
 
});  















