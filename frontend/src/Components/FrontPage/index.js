import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import "./index.css";

const FrontPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-container">
            <nav className="nav-var">
                <div className="nav-var-content">
                    <img src={logo} alt="Publication Logo" className="nav-logo-img" />
                </div>
                <button className="hamburger" onClick={toggleMenu}>
                    &#9776; {/* Hamburger Icon */}
                </button>
                <div className={`nav-var-menu ${isMenuOpen ? "active" : ""}`}>
                    <ul className="nav-var-lists">
                        <li className="nav-item"><Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link></li>
                        <li className="nav-item">
                            <Link to="/research-and-journal" className="nav-link" onClick={toggleMenu}>Research and Journal</Link>
                        </li>
                        <li className="nav-item"><Link to="/membership" className="nav-link" onClick={toggleMenu}>Membership</Link></li>
                        <li className="nav-item"><Link to="/certification" className="nav-link" onClick={toggleMenu}>Certification</Link></li>
                        <li className="nav-item"><Link to="/conference-and-seminars" className="nav-link" onClick={toggleMenu}>Conference and Seminars</Link></li>
                    </ul>
                </div>
            </nav>
            <div className="content-container">
                <h1 className="main-heading">The Society</h1>
                <p className="sub-heading">Society for Promoting Academic Collaboration and Engagement (S.P.A.C.E.), 
                is registered as a “Society” in District Registrar of Society (Rohtak),
                 Department of Industries and Commerce, Govt. of Haryana.</p>
                <p className="sub-heading">Registeration No:</p>
                <p className="sub-heading">Date of Registeration</p>
                <p className="sub-heading">Registered Office:</p>
                {/* <button className="explore-button">Explore More</button> */}
                
                <hr/>
                <h1 className="main-heading">Officers of the Society are:</h1>
                <div className="officer-container">
                    <div className="officer-card">
                        <h2 className="officer-name">Mr. Rinku</h2>
                        <p className="designation">President</p>
                    </div>
                    <div className="officer-card">
                        <h2 className="officer-name">Dr. N.S. Rathee</h2>
                        <p className="designation">Vice President</p>
                    </div>
                    <div className="officer-card">
                        <h2 className="officer-name">Ms. Meenakshi</h2>
                        <p className="designation">Treasurer</p>
                    </div>
                </div>



            </div>
            
            {/* <div className="published-container">
                <div className="published-text">    
                    <a href="#" className="published-link">Peer Reviewed Articles</a>
                </div>
                
                <div className="published-text">    
                    <a href="#" className="published-link">Open Access Publishing</a>
                </div>
                
                <div className="published-text">    
                    <a href="#" className="published-link">Multidisciplinary</a>
                </div>
                
                <div className="published-text">    
                    <a href="#" className="published-link">Widely Indexed</a>
                </div>
                
            </div> */}

            <div className="all-information-container">
                <div className="About-society-container">
                    <h1 className="info-heading">About Society</h1>
                    <p className="info-description">Society for Promoting Academic Collaboration and Engagement (S.P.A.C.E.), is a nonprofit organization whose mission is to network, disseminate knowledge, and facilitate new advancements 
                    in the multidisciplinary field in order to foster and advance communication among all segments of the research and publication community. The society focuses on publication of original and novel
                     research in multidisciplinary and interdisciplinary field along with providing common platform for academicians, researchers, industry experts at which they can come together to discuss various aspects of novel advances in academics and research. 
                    Meetings, educational seminars, and regional events are offered to debate common, mutual, and contrasting goals and opinions on academics and research, as well as to address the current developments from esteemed colleagues.</p>
                </div>

                <div className="mission-container">
                    <h1 className="info-heading">Mission</h1>
                    <p className="info-description">To promote growth of the society by communication through networking, 
                       cooperation, publications and Seminars/Conferences.</p>
                </div>

                <div className="vision-container">
                    <h1 className="info-heading">Vision</h1>
                    <p className="info-description">Academicians, Researchers, Industry Experts and Members acknowledge 
                    the Society as a primary resource for information and discussion 
                    on hot-button issues in scholarly communication.</p>
                </div>
           
                <div className="core-values-container">
                    <h1 className="info-heading">Core Values</h1>
                    <p className="info-description">Principles of the Society bring various parties together to
                     capitalize on their combined expertise and distinctive viewpoints; forging bonds that develop into real partnerships.
                      Including ensuring that people from a various backgrounds have fair opportunity to share their ideas and opinions 
                      with the Academicians, Researchers, Industry Experts and Members.</p>
                </div>

                <div className="strategic-objectives-container">
                    <h1 className="info-heading">Strategic Objectives</h1>
                    <p className="info-description">
                        Incorporate accessibility, equity, diversity, and inclusion into everything the society do. Make every effort to integrate new idea into all of our programs and activities, focusing on identifying and tackling areas of particular strategic relevance that will help in creating a more inclusive and diverse community of participants and members. 
                            S.P.A.C.E. provides a home like stage for Academicians, Researchers, Industry Experts and Members to promote research and innovation. 
                            S.P.A.C.E. provides networking, mentoring, and opportunities to Academicians, Researchers, Industry Experts and Members for ongoing education to foster leadership, career progression, and mobility.
                            S.P.A.C.E looks for ways that S.P.A.C.E and its members can interact with and gain knowledge from people and organizations who operate in and around our neighborhood and have a wide range of experience, knowledge, perspectives, and expertise from across the world. 

                            Explore ways to distribute program and service revenue in a balanced manner to diversify income and make sure we can keep funding the work of S.P.A.C.E. staff, committees, and the community at large. 
                    </p>
                </div>


            </div>

        </div>
    );
}

export default FrontPage;