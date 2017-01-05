'use strict';

  var path = require('path');
const exec = require('child_process').exec;
const main = require('electron-process').main;
const electron = require('electron');
const app = electron.app; 
const AutoLaunch = require('auto-launch');
let mainWindow = null;

app.on('ready', function() {
    var pidrun; 
    var killtask;
    var read
    var data=1;
        kill(pidrun,killtask,function(err){
            if (err) {
              console.log("ERROR : ",err);            
            } else { 
                  var AutoLaunch = require('auto-launch');     
                 //Autolaunching            
                 AutoLaunch = new AutoLaunch({
                    name: 'electronapp',
                   // path: app.getPath('file://'+__dirname+'/electronapp.exe'),
                    isHidden: true,
                });
                 
                AutoLaunch.enable();
                AutoLaunch.isEnabled()
                .then(function(isEnabled){
                    if(isEnabled){
                        return;
                    }
                    AutoLaunch.enable();
                })
                .catch(function(err){
 
                });
                
               const BrowserWindow = electron.BrowserWindow;
                const backgroundhtml = 'file://' + __dirname + '/background.html';
                const backgroundProcessHandler = main.createBackgroundProcess(backgroundhtml);
                mainWindow = new BrowserWindow({width: 1280, height: 600,frame:false , backgroundColor :"#F5F5F5"});
                backgroundProcessHandler.addWindow(mainWindow);
                  
                mainWindow.loadURL('file://'+__dirname+'/new.html');
                mainWindow.loadURL('file://' + __dirname + '/local.html');
               mainWindow.webContents.openDevTools();
                
               
            }
        });
    
});


function kill(pidrun,killtask,callback){
    if(process.platform == 'win32'){
      
            exec('tasklist /v /fo csv | findstr /i "electronapp.exe"', (error, stdout, stderr) => {
                if (error){
                    console.error(`exec error: ${error}`);
                    callback(error);
                } else{
                    //pidrun = stdout[16]+stdout[17]+stdout[18]+stdout[19]+stdout[20];
                    var str = stdout.toString().split("Running");
                    if(str.length<=2){callback(null);}else{
                        var pidrun = stdout.toString().split('"');
                            killtask = "Taskkill /FI \"PID eq "+pidrun[3]+"\" /F";   
                            exec(killtask, (error, stdout, stderr) => {
                                if (error) {
                                    console.error('exec error: ${error}');
                                    callback(error);
                                }

                                callback(null);                  
                            });  
                      
                    }

                    }
                });
                  
           }
           
           
           
     if(process.platform == 'linux'){
  
        exec('pidof electronapp', (error, stdout, stderr) => {
            if (error){
                console.error(`exec error: ${error}`);
                callback(error);
            } else{
                //pidrun = stdout[16]+stdout[17]+stdout[18]+stdout[19]+stdout[20];
                stdout= stdout.split(" ");
                
                if(stdout.length<=6){callback(null);}else{
                        console.log("stdout is "+stdout);
                       
                        killtask = "kill -9 "+stdout[stdout.length-1];   
                        exec(killtask, (error, stdout, stderr) => {
                            if (error) {
                                console.error('exec error: ${error}');
                                callback(error);
                            }
                                                 
                            console.log("process killed");
                            
                            callback(null);
                        });  
                  
                }
                                                             
                    

                }
            });
              
       }
      
 }
    