import { Component } from "react";
import { Link } from 'react-router-dom';
import "./index.css";

class ConferenceAndSeminars extends Component {
    render() {
        return (
            <div className="conference-page">
                <nav className="conference-seminar-nav">
                    <h1 className="conference-seminar-nav-logo">Conference & Seminars</h1>
                    <ul className="conference-seminar-nav-links">
                        <li><Link to="/">Home</Link></li>
                    </ul>
                </nav>
                <div className="conference-container">
                    <h1 className="conference-heading">Conference and Seminars</h1>
                    <p className="conference-text">
                        Society for Promoting Academic Collaboration and Engagement (S.P.A.C.E.) is committed to provide a network of Scholars, Academicians, Researchers, Industry Experts and Members of all levels to make a community of repute to exchange knowledge on current and hot issues.
                    </p>
                    <p className="conference-text">
                        In this reference, S.P.A.C.E. organizes various seminars and conferences in collaboration of various academic institutions.
                    </p>
                    <p className="conference-text">
                        Seminars and conferences are organized with various objectives that cater to the needs of different stakeholders, including researchers, professionals, students, and industry experts. Main objectives of the seminars and conferences are Knowledge Sharing, Networking, Skill Development, Innovation and Research, Industry and Academic Collaboration, Cultural and Social Exchange, Recognition and Awards, Commercial Opportunities and Personal Development etc.
                    </p>
                    <p className="conference-text">
                        S.P.A.C.E. invites academic institutes for collaboration to organize conferences / seminars in their campus.
                    </p>
                </div>
            </div>
        );
    }
}

export default ConferenceAndSeminars;
