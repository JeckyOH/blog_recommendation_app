import './ArticlePanel.css';

import React, {Component} from 'react';

import ArticleItem from '../ArticleItem/ArticleItem';

class ArticlePanel extends Component{
    constructor() {
        super();
        this.state = {articles: null};
    }

    componentDidMount (){
        this.loadMoreBlogs();
    }

    loadMoreBlogs() {
        this.setState({
            blogs: [
                {
                    'url' : 'http://www.freebuf.com/news/167200.html',
                    'title' : 'Cisco Devices have Serious Vulnerabilities',
                    'description' : '思科在其IOS软件中修补了30多个漏洞，其中包括一个严重的远程代码执行漏洞，该漏洞可以对数十万甚至数百万台设备暴露在网络上的设备发起的远程攻击。',
                    'source' : 'freebuf',
                    'urlToImage' : 'http://image.3001.net/images/20180402/15226483193095.png',
                    'digest' : 'ASSSSS',
                    'reason' : 'Recommended'
                },
                {
                    'url' : 'http://www.freebuf.com/news/167200.html',
                    'title' : 'Cisco Devices have Serious Vulnerabilities',
                    'description' : '思科在其IOS软件中修补了30多个漏洞，其中包括一个严重的远程代码执行漏洞，该漏洞可以对数十万甚至数百万台设备暴露在网络上的设备发起的远程攻击。',
                    'source' : 'freebuf',
                    'urlToImage' : 'http://image.3001.net/images/20180402/15226483193095.png',
                    'digest' : 'ASSSSS',
                    'reason' : 'Recommended',
                    'time' : 'Today'
                }
            ]
        })
    }

    renderBlogs() {

    }

    render() {

    }
}

export default ArticlePanel;
