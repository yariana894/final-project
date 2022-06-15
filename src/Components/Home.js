import {useEffect, useState} from "react";
import {auth, db} from "../Services/firebase";
import {addDoc, collection, getDocs, query, where} from "@firebase/firestore";
import {getAuth} from "firebase/auth";
import {MultiSelect} from 'react-multi-select-component';
import swal from 'sweetalert2'

function Home() {
    const [title, setTitle] = useState('')
    const [data, setData] = useState([])
    const [results, setResults] = useState(0)
    const [selected, setSelected] = useState([])

    const options = [
        {label: "Películas", value: "movies"},
        {label: "Series", value: "series"}
    ]

    console.log(auth.currentUser)

    useEffect(() => {

        setResults(data.length)

    }, [selected, data])

    let handleSubmit = async e => {
        e.preventDefault()

        async function callAPI() {

            const req = await fetch('https://www.omdbapi.com/?s=' + title + '&apikey=ff01f1bd')
            const res = await req.json();
            console.log(res.Search)

            setData(res.Search)

            selected.map(element => {
                let tipo = element.value

                if (tipo === 'series') {
                    const series = res.Search.filter(element => element.Type === 'series')
                    setData(series)
                } else if (tipo === 'movies') {
                    const movie = res.Search.filter(element => element.Type === 'movie')
                    setData(movie)
                }
            })
            console.log("array grande", data)
        }

        callAPI()
    }

    let handleClick = async i => {

        const auth = getAuth();
        const usuario = auth.currentUser.uid;

        data.map(async (f, index) => {
            if (i === index) {
                const titulo = f.Title
                let anho = f.Year
                let tipo = f.Type
                let imagen = f.Poster

                if (imagen == null || imagen === 'N/A') {
                    console.log("no hay imagen")
                    imagen = "https://st4.depositphotos.com/14953852/24651/v/600/depositphotos_246517344-stock-illustration-no-image-available-icon-vector.jpg"
                }
                console.log(titulo)

                const q = query(collection(db, usuario), where("titulo", "==", titulo));

                const querySnapshot = await getDocs(q);

                if (querySnapshot.docs.length === 0) {
                    console.log("No está guardada en tu lista")

                    await addDoc(collection(db, usuario), {titulo, anho, tipo, imagen})
                    await swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Guardada!',
                        showConfirmButton: false,
                        timer: 900
                    })
                } else {
                    await swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ya has guardado la película en tu lista!',
                    })
                }
            }
        });
    }

    const handleChange = e => {
        const {name, value} = e.target;
        if (name === "title") setTitle(value);
    }

    return <div role="main">
        <section className="bg-image w-100 h-100 y-4 mb-5 position-relative">
            <img className="position-absolute opacity-20 fondo"
                 src="https://fondosmil.com/fondo/35152.jpg" alt="Imagen de fondo"/>

            <div className="position-relative container">
                <div className="text-white mb-2 text-center">
                    <p className="parrafo">
                        <span>Buscador</span>
                        &mdash; Películas y Series &mdash;
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row align-items-center w-auto">

                        <div className="row align-items-center">

                            <div className="mb-3 mt-6 w-auto">
                                <span className="mr-2 text-white text-xl">Inserta el título: </span>
                                <input className="py-1 px-2 shadow bg-white rounded" type="text" name="title"
                                       onChange={handleChange}/>
                            </div>

                            <div className="mb-3 mt-6 w-auto text-white">
                                <button className="boton btn-1 " name="buscar">Buscar</button>
                            </div>
                        </div>

                        <div className="mb-3 mt-6 w-25">
                            <MultiSelect options={options}
                                         value={selected}
                                         onChange={setSelected}
                                         labelledBy="Select"/>
                        </div>
                    </div>
                </form>

                <div className="py-3 text-white text-xl">
                    <span>Se encontraron <b>{results}</b> resultados</span>
                </div>
            </div>

        </section>

        <div className="jumbotron pt-4 position-relative w-full">

            <div className="row pb-4 text-center">
                {data.map((t, index) =>

                    <ul className="col-md-4">
                        <li key={index}>
                            <div>
                                <img id="img" src={t.Poster} alt="Imagen pelicula"
                                     className="mx-auto max-h-40"/>
                            </div>
                            <p id="titulo" className="text-monospace text-truncate pt-4">{t.Title} (<span
                                id="anho">{t.Year}</span>)</p>

                            <p id="tipo">{t.Type}</p>
                            <p id="imdbID" className="hidden">{t.imdbID}</p>

                            <button className="boton btn-2 text-dark" onClick={e => handleClick(index)}>Guardar
                            </button>

                        </li>
                        <hr className="featurette-divider"/>
                    </ul>
                )}
            </div>

            <div className="carousel-card">
                <div className="icon-cards mt-3">

                    <div className="icon-cards__content">

                        <div className="icon-cards__item d-flex align-items-center justify-content-center">

                            <div className="">
                                <img className="first-slide imagen-carousel"
                                     src="https://s1.eestatic.com/2017/01/27/actualidad/actualidad_189245206_129755622_1706x960.jpg"
                                     alt="First slide"/>
                                <div className="carousel-caption text-left">
                                    <h1>Guarda</h1>
                                    <p>Podrás guardar tus películas en una lista personalizada</p>
                                    <p><a className="btn btn-lg btn-primary" href="http://localhost:3000/saveFilms"
                                          role="button">Ir a películas guardadas</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="icon-cards__item d-flex align-items-center justify-content-center">
                            <div className="">
                                <img className="second-slide imagen-carousel"
                                     src="https://media.gq.com.mx/photos/611170a3e5749b2d5a47bf26/16:9/w_2560%2Cc_limit/pan's%2520labrynth.jpg"
                                     alt="Second slide"/>
                                <div className="carousel-caption">
                                    <h1>Busca</h1>
                                    <p>Aquí podrás buscar fácilmente dónde tus películas y Series.</p>
                                    <p><a className="btn btn-lg btn-primary" href="#" role="button">Ir al
                                        Buscador</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="icon-cards__item d-flex align-items-center justify-content-center">
                            <div className="">
                                <img className="third-slide imagen-carousel"
                                     src="https://imagenes.elpais.com/resizer/c222sh89e2kpFZETxd208IGztAw=/1960x1103/cloudfront-eu-central-1.images.arcpublishing.com/prisa/Z7OXACA63JB57PNTW4S4BFJQCQ.jpg"
                                     alt="Third slide"/>
                                <div className="carousel-caption text-right">
                                    <h1>Regístrate</h1>
                                    <p>Guarda tus películas favoritas</p>
                                    <p><a className="btn btn-lg btn-primary" href="http://localhost:3000/register"
                                          role="button">Registrarse</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Home;