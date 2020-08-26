const express = require('express');
const app = express();
const cors = require('cors');
const fileMiddleware = require('express-multipart-file-parser');
const bodyParser = require('body-parser');
const path = require('path');
const firebase = require('firebase');
const admin = require('firebase-admin');
require('@firebase/storage')
require('dotenv').config();
//__________________________________________________________________________________________________________________________//
// Data Base

// const bodyParser = require('body-parser');
// const config = {
//     apiKey: 'xxxxxx',
//     authDomain: 'xxxxxx',
//     databaseURL: 'xxxxx',
//     storageBucket: 'xxxxxx',
    
//   };
// firebase.initializeApp(config);
// admin.initializeApp({
//     // credential: admin.credential.applicationDefault(),
//     // databaseURL: 'https://makan-5c9d1.firebaseio.com',
//     // projectId: 'makan-5c9d1',
//     databaseURL: 'https://makan-5c9d1.firebaseio.com',
//     credential: admin.credential.cert({
//         projectId: 'makan-5c9d1',
//         clientEmail: 'firebase-adminsdk-2jwii@makan-5c9d1.iam.gserviceaccount.com',
//         privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC81fh+UvKtJjHT\nily6wNqBhQ9lhmJSZJhyR/Tcr0fJEBOKzYwMN/9M6kRxJiQJ4g88VqL61Mu76t6V\nwJ+s5CjSFOdCuhbjP9W/hHFjs8sBNF5e82zr46Le94JVXaHuRhJlGqXBmRN/yUQA\nwerfxCYwU6djg6U/WZnBGxRrjOAS3wSqdE1bWBiLmCbtRSFCP0NbNt/OIK5UI+i0\nwuGQ8r5a6Z2stH3yXGn8z03qdIELhxgq1r7OcxDXoSB718g9hUNt37wKdpX8rG3C\nWKbnXpTDyOM+Hg1R9Ugb2NBswkepGp1UR4f2Ti20yuY4cYmavmb42Tpo0eDcj9wm\n7q9oG3FzAgMBAAECggEASY6Nv+NevXzRzuWoLmT+GJK0xybcON0PlwCZjLdIXrVA\n74IWyhGsBJGCvJKPWjwxFB9pWAy5GcepEatZZ5buobrbxJ3JWZcdk38rThuUebEl\nC5aF+LMQ2AqQveD9uVuZQcHqDGos8st7DlJ7Q9Pbzlpfqz92CKHF5zc9spFLHX4P\nH+T56GOlcUQKdyy+qe0AnpU9fgvqePXOiGrElzVTQMn+HIqchMnBTvA7p/sEqB0s\nVfsqn//cbAiIcbOo+q7Pv91AjStu28br0BPLCw+t5FCC12FETXJoL6+/6/i6uH9N\nGvM5TGhfEMmFfoIZkmayOPeXrvDu8vCxFcRLIeix+QKBgQDveLiyudJ6IdavC6cx\nJs+sakGCNeTQPjgaz1eO4lan+692nsA+mo4d67YHqtfxnYTHEJm9d3ZjvlfQ5J5q\nqaGJcBJRerPD0A6w0KwJ1UVns/gZ2JPknMBoUucBwSBfIRwMvOkv1OW3MmAqA3pB\nBWUD7rved/PTpmUA9oCEJ3UkmQKBgQDJ3o30GN/wD+E/7tJcZyaUiy+Ea5R+r3eY\nQ56LxEk9y8NJXCfALH9FPFvwjU/UYD9QCwF3x2f4vG//yl2qRLm9bJtbdxZWxwy4\n3h+kxMZwvvIX2hL220F2hmeD1Y7bsrfvv+ImYA5r9VjY79T4zjmv5cUgTxq7cIEB\nrp53AIhB6wKBgQCQcTamxyLHfCWsC9Fa+lgFXUoKKkvLt9vLgAkGLEuso0kguXyn\nxj22mnh/g3MhT6vJDqBNAgOtAiCh5WQQXiULa0gBUYugrpxN1nAOtk9Yz9r0bAg4\nurvrsSWZj03hU21B2ailqzqsF3ydmt9g3MojZxp2g8/Ud+cwf37hN5OW8QKBgA0f\n+DDHsT+leKq0d17kogCEcCl26Se3dtoig1to/q4S4naRlFANVJUG0J96QJd5ToSA\nwq6r+1mTvuBtottgLodfWVaADqbDuFMIthv7Yz+PWqQsXJFKPh5brL1IlEo6e3UO\nD8EY+7cPM6CfL0Sh++Qw1zk7i2xmayzV0p3AHhvTAoGASb7Cjt1hsShhh9elIBrA\nKjgBr/aEGnfgIU75k0s5MUWFiKF/0fkily2U/Fe8fVcmY9i3AAy2b2ZN82uhIqDg\n4IspZ+YfImtKD4BAyPR0wXITuO78MpBQ/PVypIGtHlWnxOKnNmLq8gRJqX5cQQxB\nWp/iBToz4GIedvEOGEZrPH8=\n-----END PRIVATE KEY-----\n",
//         serviceAccountId: '101406919800803995219@my-makan-5c9d1.iam.gserviceaccount.com'
//     })
//   });
//   console.log(admin.auth())
// const id =() => {
//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//             console.log(user); // It shows the Firebase user
//             console.log(firebase.auth().user); // It is still undefined
//             user.getIdToken().then(function(idToken) {  // <------ Check this line
//                console.log(idToken); // It shows the Firebase token now
//             });
//         }
//     });
// }
// id();

//   admin.auth().createCustomToken('21CmaeNNwXhZrdlL8guaUqtLtiv1')
//   .then(function(customToken) {
//     console.log(customToken)
//   })
//   .catch(function(error) {
//     console.log('Error creating custom token:', error);
//   });


//   const token = firebase.auth().currentUser.getIdToken()
//   return admin
//         .auth()
//         .verifyIdToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU5NzI1Njk1OSwiZXhwIjoxNTk3MjYwNTU5LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay0yandpaUBtYWthbi01YzlkMS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLTJqd2lpQG1ha2FuLTVjOWQxLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiMjFDbWFlTk53WGhacmRsTDhndWFVcXRMdGl2MSJ9.cehxgAP8Xrg7CnJF1OSlQz0pfHciHPs8o5W4qMJokWA_b3wBqzFf0o8uK3pXoD0ifTOaMV9PwbLYLGEIvH76jgD_ZL9DKD9JB5cEN3TpJuKvZnuosK6A5ZjNWlLs-cU0LXA6uufhJvQQh87fOh0HybcCpR5GBev88owlKth4pjz1nTDdeEvFVQdKAN02_vT84y-D8mddc-CUbn-jgq8bXlVc1NJ2w-glCWHYfZU5CUXrfWeSbVNE0ckk0dN3nXzicp654rjdsvuFkZx7Qk_zirSOKLXNNTXJQp3iOnzZ_wXi0BzU6INzi-xW2txIsUZNMg9Y5-xA8mW_aMtweNck4w')
//         .then(function(decodedToken) {
//             var uid = decodedToken.uid;
//             console.log("uid ->", uid);
//             return uid;
//         })
//         .catch(function(error) {
//             console.log("error ->", error);

//             // Handle error
//         });
// //   const defaultApp = admin.auth().verifyIdToken('hi');
//   console.log(defaultApp)

// const storage = firebase.storage();

//______________________________________________________________________________________________________________________________________//



//___________________________________________________________________________________________________________________________
// Middle ware

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileMiddleware);


//___________________________________________________________________________________________________________________________________________
// end points



const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))