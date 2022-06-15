import {useEffect, useState} from "react";

function RankingTV() {

    const [data, setData] = useState([])
    const [dataImg, setDataImg] = useState("")


    useEffect(() => {

        console.log(data)
        handleSubmit()


    }, [])


    let handleSubmit = async e => {

        async function callAPI() {

            const req = await fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=3d394d515ac4b2c8e6f6727887a4a175&language=es-ES')
            const json = await req.json();

            setData(json.results)
            console.log(json.results)
            setDataImg("https://image.tmdb.org/t/p/w500")
        }

        callAPI()
    }


    return <section className="bg-image y-4 mb-5 position-relative h">

        <img className="position-absolute h-full w-full"
             src="https://img.freepik.com/foto-gratis/viejo-fondo-negro-textura-grunge-papel-tapiz-oscuro-pizarra-pizarra-hormigon_1258-48225.jpg?w=2000"
             alt="Imagen de fondo"/>

        <div className="jumbotron">

            <div className="container mb-5 text-center text-white text-shadow ">
                <h1 className="font-italic position-relative ">Programas de televisión mejor valorados</h1>
            </div>

            <div className="container">
                <div
                    className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">
                    {
                        data.map((film, index) =>
                            <div className="flip flip-vertical text-center">
                                <div className="front font w-100">
                                    <div className="position-relative w-100 h-100">
                                        <img className="w-100 h-100 position-absolute opacity-80"
                                             src={dataImg + film.poster_path} alt="imagen"/>
                                        {/*    <div className="text-shadow titulo-film position-absolute text-white">{film.original_title}</div>*/}
                                    </div>

                                </div>
                                <div className="back w-100 h-100 ">
                                    <p className="elipsis">{film.overview}</p>
                                    <p className="popularity"><span
                                        className="text-white">Vote: </span>{film.vote_average}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </section>
}

export default RankingTV