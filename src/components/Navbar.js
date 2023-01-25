import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <Link className="homebtn" to="/Word-Fight">Home</Link>
        </nav>
    );
}
