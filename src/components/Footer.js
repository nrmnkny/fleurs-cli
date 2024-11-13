import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <nav className="footer-links" aria-label="Footer Navigation">
                <a href="/ims" title="Go to infinity mind script">Infity mind script</a>
                <a href="/personaljournal" title="Join the personal journal">Personal Journal</a>
                <a href="/intins" title="Explore interests and insights">Interests & Insights</a>
                </nav>
                <p className="footer-text">© 2024 Infinity Mind Script. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
