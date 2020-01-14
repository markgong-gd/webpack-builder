'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import largeNumberAdd from 'integer-addition';
import { sum } from '../../common';
import logo from './images/bilibili-logo.png';
import './search.less';

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
        import('./text').then((Text) => {
            this.setState({
                Text: Text.default
            })
        })
    }

    render() {
        const { Text } = this.state;
        const largeNumber = largeNumberAdd('999', '1');
        return <div className="search-text">
            search texts搜索
            <br/>
            { largeNumber }
            <img src={ logo } onClick={this.handleText} />
            <br/>
            { Text ? <Text/> : null }
            {/* <input type="text" value={newvalue} onChange={this.handleChange} /> */}
        </div>;
    }
};

ReactDOM.render(
    <Search/>,
    document.querySelector('#root')
);
