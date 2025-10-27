import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const membershipInfo = [
    {
        id: 1,
        title: 'Content',
        content: `
                Society for Promoting Academic Collaboration and Engagement (S.P.A.C.E.) is committed to provide a network of Scholars, Academicians, 
                Researchers, Industry Experts and Members of all levels to make a community of repute to exchange knowledge on current issues. 
                S.P.A.C.E. Membership is to provide technical services and other assistance for the research activities for those who subscribe for membership. 
                Scholars, Academicians, Researchers and Industry Experts can get S.P.A.C.E. Membership. 
                It provides a platform for sharing technical knowledge with support of Scholars, Academicians, Researchers, Industry Experts and Members. It
                also supports in publication of Books, 
                Research Papers, organizing conferences, seminars, workshops, etc.`
    },
    {
        id: 2,
        title: 'Eligible for membership',
        content: `
                Candidate must be a master's degree holder and must be a professional from any field of engineering, medical science, basic & applied 
                science, pharmacy, nursing, agriculture science, veterinary science, law, social sciences, education and management etc.
                Main focus is be given to Academicians, Researchers, Scientists and Professionals from industries.
                Minimum age limit is 21 years`
    },
    {
        id: 3,
        title: 'Validity of membership',
        content: `
               Annual Membership is valid for one year from the date of issue of Certificate of Annual Membership while Lifetime Membership is 
               valid for lifetime from the date of issue of Certificate of Membership.`
    },
    {
        id: 4,
        title: 'Fee of membership',
        content: 'Annual Membership: Rs. 700/-. Life Membership: Rs. 2500/-. Fees can be paid online through our secure payment gateway.'
    },
    {
        id: 5,
        title: 'Benefits of membership',
        content: `
                1. It adds value to the curriculum.
                2. S.P.A.C.E. Members will get Membership ID Card and Membership Certificate.
                3. Seniors Members will be invited to deliver Expert Lectures and Key Note Lecture in S.P.A.C.E. Conferences, Seminars and Workshops. 
                4. Seniors Members will also be invited to Chair S.P.A.C.E. Conferences.
                5. 25% discount will be given to the S.P.A.C.E. Members in Publication of Research paper in SPACE Journal of Research and Review 
                    (Journal of S.P.A.C.E.).
                6. Platform to participate in S.P.A.C.E. Conferences, Seminars and Workshops with 25% reduction registration fee.
                7. S.P.A.C.E. Members will get complete assistance in publishing textbooks at nominal charges.
                8. 50% discount will be given to the S.P.A.C.E. Members in Plagiarism checking services through software.
                9. Platform to interact with research experts at S.P.A.C.E. Conferences.
                10. Listing as a Member name at S.P.A.C.E. Membership website which adds great exposure to all the members.
                11. Assistance to publish conference research papers in Journal.`
    }
];

const Membership = () => {
    const [selectedItem, setSelectedItem] = useState(membershipInfo[0]);

    return (
        <div className="membership-container">
            <nav className="membership-navbar">
                <h1 className="membership-navbar-heading">Membership</h1>
                <ul className="membership-navbar-links">
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
            <div className="membership-main-content">
                <div className="membership-sidebar">
                    <ul>
                        {membershipInfo.map(item => (
                            <li 
                                key={item.id} 
                                className={selectedItem.id === item.id ? 'active' : ''}
                                onClick={() => setSelectedItem(item)}
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="membership-content-display">
                    <h2>{selectedItem.title}</h2>
                    <p>{selectedItem.content}</p>
                </div>
            </div>
        </div>
    );
}

export default Membership;