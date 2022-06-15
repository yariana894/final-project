function NavBar() {

    const logout = () =>{
        logout()
    }

    return <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-light ">
        <a className="navbar-brand" href="http://localhost:3000/">Peliculas</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link text-shadow text-orange-500" href="http://localhost:3000/saveFilms">Guardadas<span
                        className="sr-only">(current)</span></a>
                </li>

                <li className="nav-item active">
                    <a className="nav-link text-shadow text-orange-500"
                       href="http://localhost:3000/ranking">Películas<span
                        className="sr-only">(current)</span></a>
                </li>

                <li className="nav-item active">
                    <a className="nav-link text-shadow text-orange-500" href="http://localhost:3000/rankingTV">TV<span
                        className="sr-only">(current)</span></a>
                </li>
            </ul>

            <a className="nav-link"
               href="http://localhost:3000/login">Login <span className="sr-only">(current)</span>
            </a>

            <a className="nav-link" href="http://localhost:3000/" onClick={logout}>Logout<span
                className="sr-only">(current)</span>
            </a>
        </div>
    </nav>
}


export default NavBar;