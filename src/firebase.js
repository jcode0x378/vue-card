import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB4dl9j98erwCAYLyoQiAn3_qYTRJKdqrY',
  authDomain: 'vue-cards-58028.firebaseapp.com',
  projectId: 'vue-cards-58028',
  storageBucket: 'vue-cards-58028.appspot.com',
  messagingSenderId: '504031143102',
  appId: '1:504031143102:web:ee0c6e4ddeec5300c36aef',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
