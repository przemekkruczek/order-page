import React from 'react';

export class Header extends React.Component {
    render() {
        return (
            <header className='header'>
                <a href="#" className='header__logo'><img src='images/logo.png' alt='iphoneStore' /></a>
                <label className='hamburger' htmlFor='toggle'>&#9776;</label>
                <input type='checkbox' id='toggle' />
                <div className='header__nav'>
                    <nav className='header__nav-primary'>
                        <a href="#" className='nav-primary__link'>PRODUCTS</a>
                        <a href="#" className='nav-primary__link'>SALE</a>
                        <a href="#" className='nav-primary__link'>ABOUT</a>
                    </nav>
                    <nav className='header__nav-secondary'>
                        <a href="#" className='nav-secondary__link'>HELP</a>
                        <a href="#" className='nav-secondary__link'>SIGN IN</a>
                        <a href="#" className='nav-secondary__link'>BASKET
                        <i className="fas fa-shopping-cart"></i>
                        </a>
                    </nav>
                </div>
            </header>
        )
    }
}