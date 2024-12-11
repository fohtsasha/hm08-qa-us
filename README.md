Project Sprint 8- hm08-qa-us

In this project, i tested the Urban Routes app for:
1.Setting the address
2.Selecting Supportive plan
3.Entering the phone number
4.Adding a credit card.
5.Writing a message for the driver
6.Ordering a Blanket and handkerchiefs 
7.Ordering 2 Ice creams
8.The car search modal appears
9.Waiting for the driver info to appear in the modal

Tools
I used java script Module.exports in the page.js to organzie my code, in order to organize my buttons/modules, I used locators and selectors through the DevTools.
Everything was ran in the VS Code, using WedDriver. I used Mocha to write the maing code in createAndOrder. 

Instructions
1.Install VS code
2.Instal WedDriver Io
3.Open hm08-qa-us using GITHub
4.Install node.js (npm will automatically install)
5.Run npm init --yes to start npm.
6.Then npm install
7.Start the server and copy the link to wdio.config.js in "" after baseurl: then press save.
8.Open createAnOrder.js, open terminal and run npm run wdio (if you want all of them to run together).
TO run the test seperately use add .only after 'it' of any test you want to run.
