// JavaScript source code

import firebase from 'firebase'

//Not sure how to connect to your FireBase so I created a new one to test the DB, can always change back earlier

// const config = {
//     apiKey: "AIzaSyDQt8p6FFBxIGrQjYVRVagXEQS78-J_mwc",
//     authDomain: "user-auth-test-83e25.firebaseapp.com",
//     databaseURL: "https://user-auth-test-83e25.firebaseio.com",
//     projectId: "user-auth-test-83e25",
//     storageBucket: "user-auth-test-83e25.appspot.com",
//     messagingSenderId: "710771467285"
// };

//this is for my firebase login:

const config = {
	apiKey: "AIzaSyAYTJYQ5DVL3pWZrvNl4t7vduY6e0WHGrc",
    authDomain: "fintechdb-53af2.firebaseapp.com",
    databaseURL: "https://fintechdb-53af2.firebaseio.com",
    projectId: "fintechdb-53af2",
    storageBucket: "fintechdb-53af2.appspot.com",
    messagingSenderId: "44938465969"
}

firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;