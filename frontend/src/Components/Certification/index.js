import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Certification = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [uploadedCertificates, setUploadedCertificates] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check file type (accept PDF, JPG, PNG)
            const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                setUploadMessage('Please upload a PDF, JPG, or PNG file.');
                setUploadedFile(null);
                return;
            }

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setUploadMessage('File size should not exceed 5MB.');
                setUploadedFile(null);
                return;
            }

            setUploadedFile(file);
            setUploadMessage(`File "${file.name}" selected successfully!`);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!uploadedFile) {
            setUploadMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('certificate', uploadedFile);

        setUploadMessage('Uploading, please wait...');

        try {
            // Use /api/upload for Vercel deployment
            // For local development, it will use the proxy or you can set REACT_APP_API_URL
            const apiUrl = process.env.REACT_APP_API_URL || '';
            const response = await fetch(`${apiUrl}/api/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed! Please try again.');
            }

            const result = await response.json();
            setUploadMessage(`Upload successful! File saved as: ${result.fileName}`);

            // Add the new certificate to our list to display it
            setUploadedCertificates(prevCerts => [...prevCerts, result]);

        } catch (error) {
            console.error('Upload Error:', error);
            setUploadMessage(`Error: Could not connect to the server. Please ensure the backend is running.`);
        }


        
        // Reset after 3 seconds, but don't clear the displayed certificates
        setTimeout(() => {
            setUploadedFile(null);
            setUploadMessage('');
            if (event.target) {
                event.target.reset();
            }
        }, 3000);
    };

    return (
        <div className="certification-page">
            <nav className="certification-nav">
                <h1 className="certification-nav-logo">Certification</h1>
                <ul className="certification-nav-links">
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
            <div className="certification-content">
                <div className="certification-container">
                    <h2>Professional Certification Programs</h2>
                    <p className="intro-text">
                        The Society for Promoting Academic Collaboration and Engagement (S.P.A.C.E.) offers 
                        various certification programs to enhance professional skills and academic excellence.
                    </p>

                    <div className="certification-section">
                        <h3>Available Certifications</h3>
                        <div className="certification-cards">
                            <div className="certification-card">
                                <h4>Research Methodology Certification</h4>
                                <p>Comprehensive training in research design, data collection, and analysis techniques.</p>
                                <ul>
                                    <li>Duration: 3 months</li>
                                    <li>Format: Online/Offline</li>
                                    <li>Certification: Upon successful completion</li>
                                </ul>
                            </div>

                            <div className="certification-card">
                                <h4>Academic Writing Certification</h4>
                                <p>Master the art of academic writing, publication standards, and peer review processes.</p>
                                <ul>
                                    <li>Duration: 2 months</li>
                                    <li>Format: Online</li>
                                    <li>Certification: Upon successful completion</li>
                                </ul>
                            </div>

                            <div className="certification-card">
                                <h4>Conference Presentation Skills</h4>
                                <p>Develop effective presentation and communication skills for academic conferences.</p>
                                <ul>
                                    <li>Duration: 1 month</li>
                                    <li>Format: Workshop-based</li>
                                    <li>Certification: Upon successful completion</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="certification-section">
                        <h3>How to Apply</h3>
                        <div className="application-process">
                            <div className="process-step">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h4>Submit Application</h4>
                                    <p>Fill out the online application form with required documents</p>
                                </div>
                            </div>
                            <div className="process-step">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h4>Review Process</h4>
                                    <p>Your application will be reviewed by our academic committee</p>
                                </div>
                            </div>
                            <div className="process-step">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h4>Enrollment</h4>
                                    <p>Upon approval, complete the enrollment and payment process</p>
                                </div>
                            </div>
                            <div className="process-step">
                                <div className="step-number">4</div>
                                <div className="step-content">
                                    <h4>Start Learning</h4>
                                    <p>Access course materials and begin your certification journey</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="certification-section">
                        <h3>Upload Your Certificate</h3>
                        <div className="upload-section">
                            <p className="upload-description">
                                If you have completed a certification program, please upload your certificate for verification and record-keeping.
                            </p>
                            <form onSubmit={handleSubmit} className="upload-form">
                                <div className="upload-area">
                                    <label htmlFor="certificate-upload" className="upload-label">
                                        <div className="upload-icon">📄</div>
                                        <p className="upload-text">
                                            {uploadedFile ? uploadedFile.name : 'Click to browse or drag and drop your certificate'}
                                        </p>
                                        <p className="upload-hint">Supported formats: PDF, JPG, PNG (Max size: 5MB)</p>
                                    </label>
                                    <input
                                        type="file"
                                        id="certificate-upload"
                                        className="file-input"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={handleFileUpload}
                                    />
                                </div>
                                <button type="submit" className="upload-button" disabled={!uploadedFile}>
                                    Upload Certificate
                                </button>
                                {uploadMessage && (
                                    <div className={`upload-message ${uploadedFile ? 'success' : 'error'}`}>
                                        {uploadMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {uploadedCertificates.length > 0 && (
                        <div className="certification-section">
                            <h3>Uploaded Certificates</h3>
                            <div className="uploaded-certs-grid">
                                {uploadedCertificates.map((cert, index) => (
                                    <div key={index} className="uploaded-cert-card">
                                        <a href={`http://localhost:3001${cert.filePath}`} target="_blank" rel="noopener noreferrer">
                                            <div className="cert-preview">
                                                {cert.filePath.endsWith('.pdf') ? (
                                                    <div className="pdf-icon">PDF</div>
                                                ) : (
                                                    <img src={`http://localhost:3001${cert.filePath}`} alt={cert.fileName} />
                                                )}
                                            </div>
                                            <div className="cert-name">{cert.fileName}</div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="certification-section">
                        <h3>Contact Information</h3>
                        <p>For more information about our certification programs, please contact:</p>
                        <div className="contact-info">
                            <p><strong>Email:</strong> <a href="mailto:editorspacejournal@gmail.com">editorspacejournal@gmail.com</a></p>
                            <p><strong>Address:</strong> H.No 216, Gijii, Tehsil Sampla, District Rohtak, Haryana 124501</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Certification;
