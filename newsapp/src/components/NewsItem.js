import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author , publishedAt,source} = this.props;
    return (
    <div className='container my-4 d-flex align-items-stretch'>
        <div className="card d-flex align-items-stretch">
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <span class="badge rounded-pill bg-info">{source}</span>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">by {author} {new Date(publishedAt).toUTCString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-dark">Read More</a>
            </div>
        </div>
    </div>
    )
  }
}

export default NewsItem
