import {useEffect, useState} from "react";
import {db} from "../Services/firebase";
import {collection, deleteDoc, doc, getDocs, query, where} from "@firebase/firestore";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import {getAuth} from "firebase/auth";
import {useNavigate} from "react-router-dom";

function ListFilm() {
    const [films, setFilms] = useState([]);
    const [usuario, setUsuario] = useState('');

    const navigate = useNavigate()

    useEffect(() => {

        handleArray()
    }, [usuario])

    let handleUsuario = async () => {

        try {
            const auth = await getAuth();
            console.log("usuario", auth.currentUser.uid)
            console.log("email", auth.currentUser.email)
            const user = auth.currentUser.uid
            setUsuario(user)

            return usuario
        } catch (e) {
            await swal.fire({
                title: 'Necesitas loguearte o registrarte.',
                icon: 'info',
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff url(https://sweetalert2.github.io/#examplesimages/trees.png)',
                backdrop: `rgba(0,0,123,0.4)
                                 url("https://sweetalert2.github.io/#examplesimages/nyan-cat.gif") 
                                left top
                                no-repeat`
            })
            navigate("/login")
        }
    }

    let handleArray = async () => {

        const array = [];

        const arrayColeccion = await getDocs(query(collection(db, usuario)));
        //const arraySnapshot = await getDocs(arrayColeccion);

        await arrayColeccion.forEach(doc => array.push(doc.data()))
        console.log(array)

        if (array.length === 0) {
            await swal.fire({
                title: 'No has guardado ninguna película.',
                icon: 'info',
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff url(https://sweetalert2.github.io/#examplesimages/trees.png)',
                backdrop: `rgba(0,0,123,0.4)
                                 url("https://sweetalert2.github.io/#examplesimages/nyan-cat.gif") 
                                left top
                                no-repeat`
            })
        }

        setFilms([...array])

        return films;
    }

    let handleRemove = async (film, index) => {

        try {
            let filmId = ''
            const q = await query(collection(db, usuario), where("titulo", "==", film.titulo));
            const querySnapshot = await getDocs(q);

            await querySnapshot.forEach((res) => {
                filmId = res.id
            });


            Swal.fire({
                title: '¿Seguro que quieres eliminarla?',
                showDenyButton: true,
                confirmButtonText: 'Eliminar',
                denyButtonText: `No eliminar`,

            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Eliminada!', '', 'success')
                    deleteDoc(doc(db, usuario, filmId))

                    let nuevoArrayWords = films;
                    nuevoArrayWords = nuevoArrayWords
                        .filter((w, i) => i !== index)
                    setFilms(nuevoArrayWords);
                } else if (result.isDenied) {
                    Swal.fire('No se ha realizado ningún cambio', '', 'info')
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    return <section className="bg-image y-4 mb-5 position-relative h">
        <button onClick={handleUsuario}>

            <img className="position-absolute h-full w-full"
                 src="https://www.xtrafondos.com/descargar.php?id=4615&vertical=1"
                 alt="Imagen de fondo"/>

        </button>

        <div className="jumbotron">

            <div className="container mb-5 text-center text-white text-shadow ">
                <h1 className="font-italic position-relative ">Películas guardadas</h1>
            </div>

            <div className="container">
                <div onSubmit={handleUsuario}
                     className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">
                    {films.map((film, index) =>

                        <div className="col m" key={index}>
                            <div className="card shadow p-0 border-0 w-full h-full">
                                <img src={film.imagen} className="card-img-top max-h-60 w-full " alt="..."/>
                                <div className="card-body text-center row">
                                    <div className="mb-4">
                                        <h5 className="card-title text-truncate">{film.titulo} ({film.anho})</h5>
                                    </div>
                                    <div>
                                        <button className="boton btn-3 text-black-50 font-weight-bold"
                                                onClick={() => handleRemove(film, index)}>Borrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>
}

export default ListFilm;