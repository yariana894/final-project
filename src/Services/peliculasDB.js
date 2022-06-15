import {db} from './firebase'
import {addDoc, collection} from "@firebase/firestore";

const saveForm = async form => addDoc(collection(db, 'peliculas'), form)

export {saveForm}
