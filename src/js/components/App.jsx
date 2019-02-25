import React from 'react';
import {Header} from './Header.jsx';
import {Order} from './Order.jsx';

export class App extends React.Component{
    render(){
        return (
            <div>
                <Header/>
                <Order/>
            </div>
        )
    }
}