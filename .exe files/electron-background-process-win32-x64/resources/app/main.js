'use strict';

 const electron = require('electron');
const main = require('electron-process').main;
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const AutoLaunch = require('auto-launch');


const fs = require('fs'); 
let mainWindow = null;


/*let myWindow = null

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

if (shouldQuit) {
  app.quit()
}*/



app.on('ready', function() {
    var AutoLaunch = require('auto-launch');

     AutoLaunch = new AutoLaunch({
                    name: 'electron-background-process',
                    //path: app.getPath('Q:/Honeywell/test4honwl/releases/electron-background-process.exe'),
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
                // handle error 
                });
         
    const backgroundhtml = 'file://' + __dirname + '/background.html';
    const backgroundProcessHandler = main.createBackgroundProcess(backgroundhtml);
    mainWindow = new BrowserWindow({width: 1280, height: 600});
    backgroundProcessHandler.addWindow(mainWindow);
  
    mainWindow.loadURL('file://'+__dirname+'/foreground2.html');
    mainWindow.loadURL('file://' + __dirname + '/foreground.html');
    mainWindow.webContents.openDevTools()
});   
    





