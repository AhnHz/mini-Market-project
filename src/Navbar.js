import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/board">Board</Link>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="상품 검색" aria-label="Search"/>
                    <button className="btn btn-outline-secondary" type="submit">Search</button>
                </form>     
            </div>
            </nav>
        </>
    )
}

export default Navbar;