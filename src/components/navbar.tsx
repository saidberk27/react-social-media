import { Link } from "react-router-dom";
export const Navbar = () => {
    return(
        <div>
            <Link to = "/">Home </Link> {/*<a> yerine <link> kullanılmasının sebebi sayfayı yenilemeden navigasyon yapılması */}
            <Link to = "/login"> Login</Link>
        </div>
    );
}