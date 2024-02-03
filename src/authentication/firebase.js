import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBbKQwlmY_JazZsoIKy1K1wINIkfHesC4E",
  authDomain: "clubhub-app-46bd8.firebaseapp.com",
  projectId: "clubhub-app-46bd8",
  storageBucket: "clubhub-app-46bd8.appspot.com",
  messagingSenderId: "272102174754",
  appId: "1:272102174754:web:275dd077fcc84d9b331a7b",
  measurementId: "G-SJYN1EGZTC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const storage = getStorage(app)

export { auth, app, storage }
