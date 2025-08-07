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

`expo-sqlite` - for data handling.

`@gorhom/bottom-sheet` - used to display charging station info and charging session, if active.

`@expo-google-fonts/inter` - font detailed in the CVI.

`prettier`- for unified code formatting in the project.

`eslint-config-expo` - ESLint support.

`jest/jest-expo/react-test-renderer` - for testing.

## Testing

`npm run tests` - runs all tests

Tests are not comprehensive due to time running out, but I covered:

1. Data transformations from raw db data to UI shape.

2. Few smaller stateful components

## Room for improvements

1. Due to the simplicity of the app (1 screen), routing was not needed. It would be added as complexity grows.

2. Same with global state management. At the end, prop drilling was becoming a bit annoying, but not enough to rework.

3. In production, errors should be logged centrally (Crashlytics, Sentry etc).

4. Didn't test with different screen sizes and platforms. Relied on my iPhone 14 Pro and 15 Pro simulator.

5. I hardcoded text values to components in english. In a production app, texts would be separated into language files and a library like i18n would be used.

6. Dataset in my app is quite small, so not much thought was put into optimizing list component performance. This would be done as needed, when issues surface.

7. Production app would benefit from a search/filtering component.

8. In production, stations would have GPS coordinates, shown on a map and distance from user could be calculated if allowed.

9. Live activity widget could be added to show progress even when the app is on the background.
