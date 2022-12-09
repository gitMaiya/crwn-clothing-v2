import {initializeApp} from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAf8lvS51Lg5tT9p9rX0BLu3-xL8qCdOZk",
    authDomain: "crwn-clothing-db-85950.firebaseapp.com",
    projectId: "crwn-clothing-db-85950",
    storageBucket: "crwn-clothing-db-85950.appspot.com",
    messagingSenderId: "1050616443063",
    appId: "1:1050616443063:web:7d1d0851314eeb7feb5d32"
  };
  
  // Initialize Firebase
const firbaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    // databse, collection, identifier
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        } catch(error) {
            console.log('error crewating the user', error.message);
        }
    }
    return userDocRef;
}