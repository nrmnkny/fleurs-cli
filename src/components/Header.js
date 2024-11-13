import React from 'react';

function Header({ text }) {
  return (
    <header className="header text-center mb-4">
      <img src="../../ims.svg" alt="3am Radio Logo" className="logo" />
      <h1 className="text-2xl font-bold uppercase tracking-widest">{text}</h1>
    </header>
  );
}

export default Header;
