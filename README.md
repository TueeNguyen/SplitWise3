Hi, welcome to **SplitWise**, a web app that allows you to split bills between friends

# About the repo:

The repo at the moment only contains a front-end app built using vanila React and Material UI.

The repo tries to follow monorepo structure. Most of the code will be in `src/` and other configurations or Docker-related stuff will be in the root folder.

# Features and roadmap (to be added)

# How to run this locally:

- `npm install` at root
- After installing, `src/api/src/firebase/configs.ts` will be created (this is where you add your Firebase credentials) which looks like this

```ts
const adminCredentials = {
  // TODO: add firebase admin credentials here, you also need to convert JSON file to Javascript Object
};
const firebaseCredentials = {
  // TODO: add firebase SDK credentials here
};
export { adminCredentials, firebaseCredentials };
```

Next, you **must** have:

- Firebase SDK credentials
- Firebase Admin or Service Account credentials

## Firebase SDK credentials:

You can follow this official guide: https://firebase.google.com/docs/web/setup

- Basically, create a new project in Firebase console and get the credentials needed. As long as, when going to project settings, if you have this type of credentials => you're Gucci

![Screenshot 2022-09-08 235916](https://user-images.githubusercontent.com/58532267/189269116-eeaa8f84-d033-403c-a6ee-491a024a40fc.png)

- Add it to `firebaseCredentials` in `src/api/src/firebase/configs.ts`

## Firebase Admin or Service Account credentials:

- Head to `service account` tab in Firebase console project setting, click `Generate new key`

![image](https://user-images.githubusercontent.com/58532267/189269948-1a50995e-89b9-47f6-9015-5b69b04ec968.png)

- It'll download a `.json` file => copy the content of the file and convert it to JS Object (using an online tool is probably the easiest way)
- Add it to `adminCredentials` in `src/api/src/firebase/configs.ts`

---

# How to run this locally (continue):

## Normal way:

- `cd src/api`
- `npm run dev`
- `cd ../web`
- `npm run start`

## Docker:

You need `Docker` and `docker-compose` in your system

- `npm run services:up`

## For fun:

Join my expense:

- expenseId: 22ia71590l7tx7019
- password: l7tx701a

To communicate easier, please join Discord: https://discord.gg/fz7RtW3AVM
