## Using Watson Assistant with Alexa

In this Code Pattern, we will create an Alexa skill as a vocal interface towards IBM Watson Assistant. We will make use of Node-Red to act as a service for integration. As a final result of this Code Pattern you will be able to talk to Amazon Alexa and ask for weather information on a specific location using your own chatbot and weather services.

![](https://github.com/yvesdebeer/alexa-watson/blob/master/images/flow.png?raw=true)

# Flow

1. User says "Alexa, ask Watson...".
2. Alexa invokes a Web Service with input text on Node-Red.
3. The Node-Red flow calls Watson Assistant and stores a session ID within Node-Red.
4. Watson Assistant reports back to Alexa with a response, either a message or a response from a weather service.
5. In case of a weather information request, Watson Assistant will call a Cloud Function which will then call a custom weather web service, also defined in Node-Red.

# Included components

* [Watson Assistant](https://www.ibm.com/watson/ai-assistant/): Create a chatbot with a program that conducts a conversation via auditory or textual methods.
* [OpenWhisk](https://cloud.ibm.com/openwhisk): Execute code on demand in a highly scalable, serverless environment.
* [Node-Red](https://nodered.org/): An open-source programming tool for wiring together hardware devices, APIs and online services.

# Steps

### 1. Clone the repo

Clone the `alexa-Watson` repo locally.
In a terminal, run:

`git clone https://github.com/yvesdebeer/alexa-watson.git`

### 2. Create a Watson Assistant workspace

Sign up for an [IBM CLoud](https://ibm.biz/BdzMQp) if you don't have an IBM Cloud account yet.

Create the Watson Assistant service by following this link and hitting `Create`:

* [Watson Assistant](https://cloud.ibm.com/catalog/services/conversation)

Import the Assistant workspace.json:

* Find the Assistant service in your IBM Cloud Dashboard.
* Click on the service - take a note of the credeantials 'API Key' and 'URL' as you will need these later.
* To start building the skill, click on `Launch Watson Assistant`.
* Go to the `Skills` tab.
* Click `Create Skill` and click `Next`
* Click the `Import Skill` tab.
* Click `Choose JSON File`, go to your cloned repo dir, and `Open` the 'workspace.json' file
* Select `Everything (Intents, Entities, and Dialog)` and click Import.

Create an Assistant:

* Go to the `Assistants`tab
* Click `Create Assistant`
* Name your assistant: e.g. 'Watson Assistant' and click `Create assistant`
* Click `Add dialog skill`
* Select the previously created skill - 'Alexa sample'

To find the 'Assistant ID' for Watson Assistant:

* Go back to the `Assistants` tab.
* Click on the three dots in the upper right-hand corner of the card and select `Settings`.
* Next, click on the 'API Details'
* Copy the `Assistant ID` and save it in a note or a text editor as you will need it later.

Now you can already test the chatbot by clicking on the `Alexa Sample` skill.
This will allow you to modify the Intents, Entities and Dialog.

Click on `Try it` in the top right corner of the screen and start your first conversation. For example you could ask 'What do you know about me' or 'What's the weather'.

### 3. Create a Node-Red development environment

* On the IBM Cloud Dashboard, click `Catalog` on the top bar and search for 'Node-RED'.
* Select the `Node-RED Starter` tile
* Give the 'App name' a unique name e.g. '\<your initials\>-nodered' and click `Create`

The deployment takes a couple of minutes to complete, so be patient...
Once the deployment is successfully completed, go to the Node-Red URL by clicking on the `Visit App URL`.

Next, complete the Node-RED initial set-up wizard. Click `Next` on the first screen and choose a userid and password on the second one to secure your Node-RED environment. Click `Next` and `Next` again to go to the final overview page of the wizard. Click `Finish`to complete it.

Login with your Node-RED credentials (the userid/password you specified in the wizard). You are presented with the drawing canvas, that you'll need to create your Node-RED flows.

Import a Node-Red flow into the canvas:

* Select `Import` - `Clipboard` from the top right menu ('hamburger'-icon)
* Click `select a file to import`
* Select `alexawebhookflow.json` from the cloned repository and click `Import`
* Configure the Watson Assistant node 'Alexabot' by double clicking on the node in the flow
* Fill in the 'API Key', Service Endpoint, and 'Assistant ID' with the values you noted earlier.
* Finally hit the red `Deploy' button on the top.

### 4. Create an Alexa skill

Sign up for an Amazon Developer Portal account [here](https://developer.amazon.com/).

Go to [https://developer.amazon.com/alexa/console/ask](https://developer.amazon.com/) and click the `Create Skill` button.

* Enter a 'Skill name' e.g. 'Watson' and click `Create skill`
* Select the 'Start from scratch' template and hit the `Choose` button.
* Provide an invocation name 'Watson' or 'weather channel'
* Add a custom slot type: In the left sidebar menu, click on 'Slot Types (#)' and hit '+ Add'.
* Use the name 'BAG_OF_WORDS' and hit the `Create custom slot type` button.
* Now 'BAG_OF_WORDS' needs a slot value. Just enter `Hello World` and hit the plus sign so that it has a slot value.
* Add a custom intent type: In the left sidebar menu, click on 'Intents (#)' and hit '+ Add'.
* Use the name 'EveryThingIntent' and hit the `Create custom intent` button.
* Add {EveryThingSlot} under Sample Utterances. Use the plus sign to create the EveryThingSlot.
* Scroll down to 'Intent Slots (#)'
* Use the 'Select a slot type' pulldown to give 'EveryThingSlot' the slot type 'BAG_OF_WORDS'.

**Configure the endpoint:**

* Click on `Endpoint` in the sidebar.
* Select HTTPS as the Service Endpoint Type.
* For the Default Region enter the HTTPS service endpoint which is the URL of your Node-Red App and add '/alexa' to the URL.
* Use the pull-down to select 'My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority'.
* Click the `Save Endpoints` button on the top!

### 5. Talk to it

* Use the `Test` tab in the Amazon developer console.

* Use the drop-down to enable your skill for testing in `Development`. You can type or talk and test the skill in the test UI.

* Once enabled, you can run the sample via Alexa enabled devices, or the Echo simulator.

You can invite others to test it with the beta test feature. In order to be eligible for beta test, you must fill out most of the publishing information.

You probably shouldn't publish this example, but you are now ready to create and publish your own Alexa skill.

### 6. Create you own weather information service

Most weather API's require geo coordinates in order to provide detailed weather information. This makes it hard to enter via a chatbot. Therefore we will make use of a Geo Coding API which will convert a named location into lat/lon coordinates. For the weather service, we can make use of the Weather Company API. This service is available for free for registered IBM Cloud users (not Lite accounts). Alternatively access to this API is granted during the 'CallForCode' challenge (until October 13,2019).

**Here is what you need to do, to get access to the weather API:**

* Register on [Welcome to The Weather Company API Platform Site Powering the best Weather Apps & Sites](https://callforcode.weather.com/)
* You will get a mail with the apikey
* Then you can use the [documentation](https://weather.com/swagger-docs/call-for-code) to access the API

**Import a Node-Red flow and configure the weather services API's:**

* Go back to your Node-Red canvas
* Select `Manage Palette` via the top right 'hamburger'-icon menu
* Install a module 'node-red-contrib-gzip'
* Select `Import` - `Clipboard` from the top right 'hamburger'-icon menu
* Click `select a file to import`
* Select 'weatherserviceflow.json' from the cloned repository and click `Import`
* Configure the node 'API Weather.com' by double clicking on the node in the flow
* Replace the 'API Key' with your key within the URL parameter
* Finally hit the red `Deploy' button on the top.

You can now test the weather service flow by injecting some data via the inject nodes and verifying the results within the debug panel of Node-Red.

### 7. Create a Cloud Functions for access the weather service from within the Watson assistant

* Goto the IBM Cloud Dashboard and select `Functions`from the top left 'Hamburger-icon' menu
* Click `Actions` from the left menu
* Click `Create` and `Create Action`
* Give the action a name e.g. 'getWeather' and click `Create`
* Replace the Node.js code with the code from the cloned repo file: 'getWeather.js'
* Click on `Endpoints`from the menu on the left and click `Enable as Web Action`
* Note down the HTTP Method URL: e.g. 'https://eu-gb.functions.cloud.ibm.com/api/v1/web/IBMBelgium_dev/default/getWeather.json'

Now you can test the Cloud function  via the `Invoke`button, but first you need to specify an input:

* Click on `Change Input` and add following JSON : 
	{
    	"location":"Brussels"
	}
* Click `Apply`
* Now click `Invoke` and check the result
* Additionally you can check the 'Debug' window within Node-Red and watch the result of this service being called.

### 8. Configure the Watson Assistant dialog to call the weather Cloud function

* Open the Watson Assistant skill 'Alexa Sample' and select the `Dialog`tab
* Click the 'Weather'-node
* Goto the section 'Then respond with' and click the 'Customize Response' button (Small wheel icon next to '$location' - IF ASSISTANT RECOGNIZES)
* Click the 3 dots next to 'Then set context' and `Open JSON editor`
* Modify the action name and replace it with the one you noted down in the previous step (only use the portions of the URL after .../api/v1/web/)
* Click `Save` and test either using the `Try it` button or directly via Alexa Echo or Simulator.




