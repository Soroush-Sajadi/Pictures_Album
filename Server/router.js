const express = require('express');
const app = express();
const cors = require('cors');
const fileMiddleware = require('express-multipart-file-parser');
const bodyParser = require('body-parser');
const path = require('path');
const firebase = require('firebase');
const admin = require('firebase-admin');
const { auth } = require('firebase');
const serviceAccount = require('./ServiceAccountKey.json');
const { response } = require('express');
require('@firebase/storage')
require('dotenv').config();
//__________________________________________________________________________________________________________________________//
// Data Base

const config = {
    apiKey: "AIzaSyDueJ-kqLC7Bo45DPRcItBY9jbEjziUGcY",
    authDomain: "smile-400af.firebaseapp.com",
    databaseURL: "https://smile-400af.firebaseio.com",
    projectId: "smile-400af",
    storageBucket: "smile-400af.appspot.com",
    
  };
firebase.initializeApp(config);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

//______________________________________________________________________________________________________________________________________//



//___________________________________________________________________________________________________________________________
// Middle ware

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileMiddleware);


//___________________________________________________________________________________________________________________________________________
// end points

app.get('/', (req, res) => {
    const rootRef = firebase.database().ref().child('test');
    rootRef.once('value', snap => {
    res.json(snap.val());
})
})

app.get('/signup/:email/:password', (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
        // .catch(e => console.log(e.message));
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            const uid = firebaseUser.uid;
                const usersRef = firebase.database().ref().child(`users/${uid}`);
                usersRef.set ([{
                    name:`Ennia`,
                }])
        } else {
            res.json('Err'); 
        }
    })
})

app.get('/login/:email/:password', (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise
        .then(key => res.json(key.user.uid))
        .catch(() => res.json('Err'))
})

app.get('/signout', (req, res) => {
    firebase.auth().signOut();
    res.json('done');
})

app.get('/data/:token', (req, res) => {
    const token = req.params.token;
    const auth = firebase.auth();
    const myRef = firebase.database().ref().child(`users/${token}`)
    myRef.once('value', snapshot => {
        res.json([snapshot.val()])
    })
    
})


//___________________________________________________________________________________________________________________________________________________
const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))


