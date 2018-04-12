import './ArticlePanel.css';

import React, {Component} from 'react';
import _ from 'lodash'

import ArticleItem from '../ArticleItem/ArticleItem';

class ArticlePanel extends Component{
    constructor() {
        super();
        this.state = {articles: null};
        //this.scrollHandler = this.scrollHandler.bind(this);
    }

    componentDidMount (){
        this.loadMoreArticles();
        this.loadMoreArticles = _.debounce(this.loadMoreArticles, 1000);
        window.addEventListener('scroll', () => {this.scrollHandler();});
    }

    scrollHandler() {
      let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      if ( (scrollY + window.innerHeight) >= (document.body.offsetHeight - 50)) {
        console.log('Load more articles.');
        this.loadMoreArticles();
      }
    }

    loadMoreArticles() {
      let request = new Request('http://localhost:3000/articles', {
        method: 'GET',
        cache: false
      });

      fetch(request)
        .then( res => res.json())
        .then( articles => {
          this.setState({
            articles: this.state.articles ? this.state.articles.concat(articles) : articles
          });
      });
    }

    renderArticles() {
        var articles_list = this.state.articles.map( article => {
            return(
                <a className='list-group-item' key={article.digest} href='#'>
                    <ArticleItem article={article}/>
                </a>
            )});

        return(
            <div className='container-fluid'>
                <div className='list-group'>
                    { articles_list }
                </div>
            </div>
        );
    }

    render() {
        if (this.state.articles)
        {
            return(
                <div>
                    {this.renderArticles()}
                </div>
            );
        }
        else
        {
            return(
                <div>
                    <div id='msg-app-loading'>
                        Loading
                    </div>
                </div>
            );
        }
    }
}

export default ArticlePanel;
