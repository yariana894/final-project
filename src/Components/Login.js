import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Context/authContext";
import {getAuth} from "firebase/auth";

function Login() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {login} = useAuth()

    const navigate = useNavigate()

    let handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await login(mail, password)

            const auth = getAuth();
            const user = auth.currentUser.uid;
            //console.log(login)

            if (login != null) {
                navigate("/")
                console.log(user)
            }
        } catch (error) {
            setError(error.message)
            if (error.code === "auth/internal-error") {
                setError('Campo de contraseña sin cubrir')
            } else if (error.code === "auth/weak-password") {
                setError('Contraseña inválida')
            } else if (error.code === "auth/email-already-in-use") {
                setError('Cuenta de email existente')
            } else if (error.code === "auth/invalid-email") {
                setError('Cuenta de email inválido')
            } else if (error.code === "auth/missing-email") {
                setError('Campo de email sin cubrir')
            } else if (error.code === "auth/user-not-found") {
                setError('Usuario no registrado')
            } else if (error.code === "auth/wrong-password") {
                setError('Contraseña incorrecta')
            }
        }
    }


    return <section className="bg-image y-4 mb-5 position-relative h">

        <img className="position-absolute h-full w-full"
             src="  https://eveniments.es/wp-content/uploads/2019/03/fondos-abstractos-para-paginas-web-wallpaper-hd-para-bajar-gratis-elegant-3d-abstract-wallpaper-2018-wallpapers-hd-en-2018-of-fondos-abstractos-para-paginas-web-wallpaper-hd-para-bajar-grati.jpg"
             alt="Imagen de fondo"/>

        <div className="jumbotron d-flex justify-content-center">
            <div
                className="formulario position-relative m-2 bg-gray-800 shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 text-red-500">
                {error && <p>{error}</p>}

                <form className="space-y-6" action="#">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Iniciar Sesión</h3>
                    <div>
                        <label htmlFor="email"
                               className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Tu
                            email</label>
                        <input type="email" name="mail" id="mail" value={mail} onChange={(event => {
                            setMail(event.target.value)
                        })}
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                               placeholder="name@gmail.com" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password"
                               className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Tu
                            contraseña</label>
                        <input type="password" id="password" placeholder="••••••••" name="contrasenha" value={password}
                               onChange={(event => {
                                   setPassword(event.target.value)
                               })}
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                               required=""/>
                    </div>
                    <button type="submit" onClick={handleSubmit}
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Acceder
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        ¿No estás registrado? <a href="http://localhost:3000/register"
                                                 className="text-blue-700 hover:underline dark:text-blue-500">Crear
                        cuenta</a>
                    </div>
                </form>
            </div>
        </div>

    </section>
}

export default Login;