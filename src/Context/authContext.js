import {createContext, useContext} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../Services/firebase";


export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw  new Error('There is not auth provider')
    return context
}

export function AuthProvider({children}) {

    const signup = async (email, password) => await createUserWithEmailAndPassword(auth, email, password)
    const login = async (email, password) => await signInWithEmailAndPassword(auth, email, password)


    return (
        <authContext.Provider value={{signup, login}}>
            {children}
        </authContext.Provider>
    )
}
