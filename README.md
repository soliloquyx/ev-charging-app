## Setup and run instructions

1. Install project dependencies:

    `npm i`

2. To start the app with Expo Go, there are following commands:

    `npm start` - starts the development server and generates QR code that can be used to run the app on a physical device (Expo Go must be installed on the device).

    `npm run ios` - starts the development server and opens the app on an iOS simulator (Xcode must be installed).

    `npm run android` - starts the development server and opens the app on an Android emulator (Android Studio must be installed).

## Technologies used

I tried to keep it as simple as possible, using Expo to ease the development process.

Other notable dependencies:

`@gorhom/bottom-sheet` - used to display charging station info and charging session, if active.

`@expo-google-fonts/inter` - font detailed in the CVI.

`prettier`- for unified code formatting in the project.

`eslint-config-expo` - ESLint support.

## Room for improvements

1. Due to the simplicity of the app (1 screen), routing was not needed. It would be added as complexity grows.

2. Same with global state management.

3. In production, errors should be logged centrally (Crashlytics, Sentry etc).

4. I hardcoded text values to components in english. In a production app, texts would be separated into language files and a library like i18n would be used.

5. Dataset in my app is quite small, so not much thought was put into optimizing list component performance. This would be done as needed, when issues surface.

6. Production app would benefit from a search/filtering component.

7. In production, stations would have GPS coordinates, shown on a map and distance from user could be calculated if allowed.

8. Live activity widget could be added to show progress even when the app is on the background.
