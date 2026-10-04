import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// CRITICAL: Connection test as per instructions
export async function testFirestoreConnection() {
  try {
    // Attempt to read a dummy doc to verify connection and rules
    await getDocFromServer(doc(db, 'system', 'connection_test'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or internet connection.");
    }
    // "Missing or insufficient permissions" is expected if the doc doesn't exist or rules are working
    console.log("Connection test finished (Expected 'Permission Denied' or 'Not Found')", error);
  }
}
