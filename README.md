# Fedora Community App

This application talks about articles in Fedora Magazine, queries related to Fedora through Ask Fedora, things going on in Fedora community through Social section and lets you to avail the information of various Fedora meetings.

This is the source for the Fedora App. It is available on the Google Play Store. You can install it in your device from from [here](https://play.google.com/store/apps/details?id=com.fedoraqa.fedora)

## Pre-requisites

* [Download the installer](https://nodejs.org/) for Node.js 6 or greater.
* Install the ionic CLI globally: `npm install -g ionic`
* Install some packages, required by native addons:
  * [GCC, G++ and make](https://developer.fedoraproject.org/tech/languages/c/c_installation.html)
    - `sudo dnf install gcc gcc-c++ make`
  * [GNU Autotools](https://developer.fedoraproject.org/tech/languages/c/autotools.html)
    - `sudo dnf install autoconf automake`
  * libpng headers
    - `sudo dnf install libpng-devel`

## Getting Started

* Clone this repository: `git clone https://github.com/sumantro93/Fedora-Community-App.git`.
* Run `npm install` from the project root.
* Run `ionic serve` in a terminal from the project root.
* Open http://localhost:8100 to preview your app.
* Profit. :tada:

_Note: You may need to add “sudo” in front of any global commands to install the utilities. See [npm documentation](https://docs.npmjs.com/getting-started/fixing-npm-permissions) for more details._

## Deploying

* PWA - Run `npm run ionic:build --prod` and then push the `www` folder to your favorite hosting service
* Android - Run `ionic cordova run android --prod`
  * If you are deploying to Android 4.4 or below we recommend adding crosswalk: `cordova plugin add cordova-plugin-crosswalk-webview`
* iOS - Run `ionic cordova run ios --prod`
