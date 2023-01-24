import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase.config'

export async function checkUser(name: string) {
    const usersRef = doc(db, "users", `${name}`)
    const docSnap = await getDoc(usersRef)
    if (docSnap.exists()){
        console.log("Document data:", docSnap.data())
        return true
    } else {
        await setDoc(doc(db, "users", `"${name}"`), {
            username: name.substring(0, name.lastIndexOf("@")),
            balance: 10000,
            img: 1,
            email: name
        })
    }
}
