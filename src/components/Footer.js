import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <nav className="footer-links" aria-label="Footer Navigation">
                <a href="/artbucks" title="Go to Artbucks">Artbucks</a>
                <a href="/debate-pit" title="Join the Debate Pit">Debate Pit</a>
                <a href="/fleurs-du-mal" title="Explore Fleurs du Mal">Fleurs du Mal</a>
                </nav>
                <p className="footer-text">© 2024 3am Radio. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
