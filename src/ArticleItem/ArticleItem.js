import './ArticleItem.css';
import React, {Component} from 'react';

class ArticleItem extends Component{
  redirectToUrl(url) {
    window.open(url, '_blank');
  }

  render() {
    return(
      <div className='article-container' onClick={() => this.redirectToUrl(this.props.article.url)}>
        <div className='row'>
          <div className='col s4 fill'>
            <img src={this.props.article.urlToImage} alt={this.props.article.title} />
          </div>
          <div className='col s8'>
            <div className='article-intro-col'>
              <div className='article-intro-panel'>
                <h4> {this.props.article.title} </h4>
                <div className='article-description'>
                  <p> {this.props.article.description} </p>
                  <div>
                    {this.props.article.source && <div className='chip light-blue article-chip'>{this.props.article.source}</div>}
                    {this.props.article.reason && <div className='chip light-green article-chip'>{this.props.article.reason}</div>}
                    {this.props.article.time && <div className='chip amber article-chip'>{this.props.article.time}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default ArticleItem;
