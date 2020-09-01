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
const { uuidv4 } = require('./helper_functions/uuid')
// const { response } = require('express');
require('@firebase/storage')
require('dotenv').config();
global.XMLHttpRequest = require("xhr2");
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
const storage = firebase.storage();

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

app.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    console.log(username)
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
        // .catch(e => console.log(e.message));
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            const uid = firebaseUser.uid;
                const usersRef = firebase.database().ref().child(`users/${uid}`);
                usersRef.set ([{
                    name:`${username}`,
                }], function (err)  {
                    if (err) {
                        res.end('err')
                    } else {
                        res.end('done')
                    }
                })
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

app.get('/data/:uid', (req, res) => {
    const token = req.params.uid;
    const auth = firebase.auth();
    const myRef = firebase.database().ref().child(`users/${token}`)
    myRef.once('value', snapshot => {
        res.json([snapshot.val()])
    })
    
})

app.post('/update/user/image', (req, res) => {
    if (req.files) {
        const uid = req.files[0].originalname.split(',')[1];
        const imageName = req.files[0].originalname.split(',')[0];
        const uploadImage = storage.ref(`users/${uid}/profile/${imageName}_profile_image.jpg`).put(req.files[0].buffer)
        uploadImage.on('state_changed',
        (snapshot) => {

        },
        (error) => {
            console.log(error)
        },
        () => {
            storage.ref(`users/${uid}/profile`).child(`${imageName}_profile_image.jpg`).getDownloadURL().then(downloadURL => {
                if ( downloadURL ) {
                    const usersRef = firebase.database().ref().child(`users/${uid}/0/profileImage`);
                    usersRef.set(
                        `${downloadURL}`
                    )
                }
            })
            .then(() => res.send('Its done'))
            .catch(() => res.send('something went wrong'))
        });
    } else {
        res.send('image only')
    }
});

app.post('/add/user/image', (req, res) => {
    if (req.files) {
        console.log(req.files[0], uuidv4())
        const imageCode = uuidv4();
        const uid = req.files[0].originalname.split(',')[1];
        const imageName = req.files[0].originalname.split(',')[0] + imageCode;
        const index = req.files[0].originalname.split(',')[2];
        console.log(uid, imageName, index)
        const uploadImage = storage.ref(`users/${uid}/images/${imageName}.jpg`).put(req.files[0].buffer)
        uploadImage.on('state_changed',
        (snapshot) => {

        },
        (error) => {
            console.log(error)
        },
        () => {
            storage.ref(`users/${uid}/images`).child(`${imageName}.jpg`).getDownloadURL().then(downloadURL => {
                if ( downloadURL ) {
                    const usersRef = firebase.database().ref().child(`users/${uid}/0/images/${index}`);
                    usersRef.set({
                        image: `${downloadURL}`,
                        description: 'fake',
                        date:'2222/22/22'
                    }
                        
                    )
                }
            })
            .then(() => res.send('Its done'))
            .catch(() => res.send('something went wrong'))
        });
    } else {
        res.send('image only')
    }
})


//___________________________________________________________________________________________________________________________________________________
const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))


