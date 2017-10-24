# Create an Alexa skill using Watson Conversation and Node.js



Setting up the Amazon Alexa Application
-------

1. Sign in/Sign up to your Amazon Developer Console https://developer.amazon.com/. 

2. On the top you would see Alexa alongside the Dashboard, Apps & Services. Select that. 

3. Next you will see Alexa Skills Set. Click Get Started on that. 

4. On Top Right, click on Add a New Skill. 

5. In the skill, add the name and invocation as shown. 

![alt text](https://github.com/prav10194/alexa-integration-with-watson/blob/master/screenshots/skill-information.png "Watson")

6. Go to Next and enter the details from screenshots

![alt text](https://github.com/prav10194/alexa-integration-with-watson/blob/master/screenshots/intent-schema.png "Watson")

![alt text](https://github.com/prav10194/alexa-integration-with-watson/blob/master/screenshots/slots.png "Watson")

![alt text](https://github.com/prav10194/alexa-integration-with-watson/blob/master/screenshots/sample-utterances.png "Watson")

7. Go to Next and enter the endpoint details. For domain address you need to look at ngrok setup explained below in README.md. 

![alt text](https://github.com/prav10194/alexa-integration-with-watson/blob/master/screenshots/endpoint.png "Watson")


8. Click Next and enter the certification details
![alt text](https://github.com/prav10194/alexa-integration-with-watson/blob/master/screenshots/certificate.png "Watson")

9. Click Next. 

You are done with the setup of your Alexa app. 
 

    

Setting up the Node.js application
-------

1. Clone/Download zip of repository. 

2. Extract content of the zip.

3. Open cmd to run the following code - 
```cmd
cd "folderpath where zip is extracted"
npm install
```

4. After the installation, run -  
```cmd
npm start
```

Setting up the .env file
-------

1. You need to register for google geoencoder api from here - https://developers.google.com/maps/documentation/geocoding/get-api-key?authuser=1

Copy the API KEY in the .env file. 

2. You also need to have a bluemix account and should have credentials for the Weather API. You can get it from here - https://console.bluemix.net/catalog/services/weather-company-data

Copy the Username and Password of the SERVICE (as shown in image) in the .env file.

![alt text](https://github.com/prav10194/alexa-integration-with-watson/blob/master/screenshots/weather.png "Weather Service in Bluemix")

Setting up the ngrok 
-------

1. In Amazon Alexa, you need an endpoint so that it can connect to your app locally. For this we will install ngrok. Download from here - https://ngrok.com/download

2. Run your app using npm start as explained above in Setting up the Node.js application. 

3. Open another terminal and run the following command - 

```cmd
ngrok http 8080
```
8080 is the port number on which your Nodejs app is running. 

4. Copy the Forwarding domain from the ngrok terminal. E.g. Your domain would look something like - https://c90db8b2.ngrok.io 

Paste it in the Amazon Alexa Endpoint Configuration. 

The final endpoint will be - https://c90db8b2.ngrok.io/weather

Testing
-------

Here is a sample conversation flow using Alexa - 

- User: Alexa, ask watson to tell me the weather in New York .
- Alexa/Watson: The weather in New York is 68 degrees Farenheit. 
