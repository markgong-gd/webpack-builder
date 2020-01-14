'use strict';

// import React from 'react';
// import ReactDOM from 'react-dom';
// import largeNumberAdd from 'integer-addition';
// import { sum } from '../../common';
// import logo from './images/bilibili-logo.png';
// import './search.less';

const React = require('react');
const largeNumberAdd = require('integer-addition');
const logo = require('./images/bilibili-logo.png');
require('./search.less');

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newvalue: '',
            Text: null
        }
    }

    // handleChange = (value) => {
    //     const newvalue = /[0-9]+\.[0-9]{2}/.test(value);
    //     this.setState({

    //     })
    //     // return newvalue
    // }
    handleText = () => {
        console.log('handleText')
        import('./text.js').then((Text) => {
            this.setState({
                Text: Text.default
            })
        })
    }

    handle = (e) => {
        e.preventDefault();
        console.log('按钮');
    }

    render() {
        const { Text } = this.state;
        const largeNumber = largeNumberAdd('999', '1');
        return <div className="search-text">
            search texts搜索123
            <br/>
            { largeNumber }
            <img src={ logo } onClick={this.handleText} />
            <br/>
            <button onClick={this.handle}>按钮</button>
            { Text ? <Text/> : null }
            {/* <input type="text" value={newvalue} onChange={this.handleChange} /> */}
        </div>;
    }
};

module.exports = <Search/>;