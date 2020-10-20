# App

Android: [![Android Build status](https://build.appcenter.ms/v0.1/apps/ed581ffa-690c-474f-84c3-2bc4dc47a125/branches/master/badge)](https://dev.azure.com/GurooSolutions/_git/App)
iOS: [![iOS Build status](https://build.appcenter.ms/v0.1/apps/ffb08211-7d5b-46cb-acde-48d5a3e2d44b/branches/master/badge)](https://dev.azure.com/GurooSolutions/_git/App)

App is a React Native app that builds to iOS, Android and Web. It is the user interface the customer uses to interact with the Guroo platform.

This is an expo app with [CRNA](https://facebook.github.io/react-native/blog/2017/03/13/introducing-create-react-native-app), [Native Base](https://nativebase.io/), [React Navigation](https://reactnavigation.org/), [Redux](https://redux.js.org/), [Redux-Thunk](https://github.com/reduxjs/redux-thunk) and with backend interaction using [axiosjs](https://github.com/axios/axios). It combines the best React-Native development practices and pattern to helps you boot a new React Native mobile application and stay productive by providing the development and automation tools needed for the most common tasks.

## Features

* Makes use of [Redux](https://redux.js.org/), [Redux-Thunk](https://github.com/reduxjs/redux-thunk), [Native Base](https://nativebase.io/) and [React Navigation](https://reactnavigation.org/)
* Integrated with CRNA and Expo
* Full interaction with a Backend API using [AxiosJs](https://github.com/axios/axios)
* A shared React and React Native structure and code base for both IOS and Android
* Code Linting
* Test and coverage, using [Jest](https://facebook.github.io/jest/) and [Enzyme](https://github.com/airbnb/enzyme)
* Easy Routing and Navigation using [React Navigation](https://reactnavigation.org/)

## Development Environment Setup

Note: Using yarn results in a much easier setup for this app. Whenever a step gives you a choice between yarn and npm, choose yarn.

### System Requirements

#### NodeJS

* Make sure you have a recent version (8.11 or later) of [node] (<https://nodejs.org/en/>) installed globally.

#### React Native Developer Tools

* Ensure that [react-native CLI] development tools (<https://facebook.github.io/react-native/docs/getting-started.html>) and their prerequisites are installed globally.
The instructions are a bit different depending on your operating system (MacOS, Windows, Linux) and the target development environment (Android, OS).
You must follow the guide in the tab labeled [Building Projects with Native Code] (<https://facebook.github.io/react-native/docs/getting-started.html>). The basic tutorial explaining the main principles of React Native is also very useful for a first start of React Native.

#### Expo

* Globally installed [Expo](https://expo.io/) : Run `npm install -g expo` in your terminal

## Launching the application

### Pro-tip

You can simply double-click start-server.bat, then start.bat to run the app. Otherwise, you can do any of the following:

### Launch on iOS

* In your terminal, run the following command to launch the app in an IOS Emulator:

```sh
$ yarn ios
or
$ npm run ios
```

OR:

* Run the following command to launch the app and Scan the QR code in your Expo app:

```sh
$ yarn start
or
$ npm run start
```

### Launch on Android

* You must open the Android emulator manually or connect your device to USB debug mode.
* In your terminal, run

```sh
$ yarn android
or
$ npm run android
```

OR:

* In your terminal, run the following and then Scan the QR code in your Expo app:

```sh
$ yarn start
or
$ npm run start
```

## Regenerating service types

### Global Setup

Run once per machine:

npm install @openapitools/openapi-generator-cli -g

### Command Prompt

1. Download the latest version of the service interface
    -Go to the swagger url of the service
    -Right-click the "/swagger/project_name/swagger.json" link right under the main title of the page
    -Choose "Save As" and overwrite the existing swagger.json documentation file in the respective service folder
    -Optionally, you may also want to clean the directory out of any other files; everything but the new swagger.json file can be deleted
2. Open a command prompt and navigate to the directory of this file
3. Find the service you want to generate a client for below, and execute the command

(Tools > Command Line > Developer Command Prompt or cmd + P)

#### Account

```sp
openapi-generator-cli generate -i src\services\account\swagger.json -g typescript-axios -o src\services\account
```

#### Credential

```sp
openapi-generator-cli generate -i src\services\credential\swagger.json -g typescript-axios -o src\services\credential
```

#### Customer

```sp
openapi-generator-cli generate -i src\services\customer\swagger.json -g typescript-axios -o src\services\customer
```

#### Member

```sp
openapi-generator-cli generate -i src\services\member\swagger.json -g typescript-axios -o src\services\member
```

## Developer Notes

The generator is currently generating an AnyType that cannot be recognized, and the fix has been to overwrite it as an Object. There is a bug in the generator that has been fixed, and the details are here:

<https://github.com/OpenAPITools/openapi-generator/issues/6332>

## Deployment

<https://developer.android.com/studio/publish/app-signing#sign_release>

## Removing mock behavior

Open the this file `src/utils/api.js` and comment this block:

```javascript
var mock = new MockAdapter(axios, { delayResponse: 50 });

mock.onGet('/auth').reply(200, profileData);
mock.onPost('/auth').reply(200);
mock.onGet('/password').reply(200);
mock.onGet('/expenses').reply(200, expensesData);
mock.onGet('/expenses?q=data&&_page=1&_limit=15').reply(200, expensesData);
mock.onGet('/categories').reply(200, categoriesData);
mock.onPost('/categories').reply(200);
mock.onPost('/expenses').reply(200);
```
