import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'



export class News extends Component {

    static defaultProps = {
      Country : "in",
      pageSize : 9,
      category : 'sports'
    }

    static propTypes ={
      Country : PropTypes.string,
      pageSize : PropTypes.number,
      category : PropTypes.string,
    }


    constructor(){
        super()
            console.log("Im am a constructor of a news component")
            this.state = {
                articles : [],
                loading : false,
                page :1
            }   
            
    }

  

    


    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=c52b098f73c341888de70e1990bb4af8&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading : true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState ({articles : parsedData.articles, totalResults : parsedData.totalResults, loading: false}) 
    }

     handleNextClick = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=c52b098f73c341888de70e1990bb4af8&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({loading : true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState ({articles : parsedData.articles,
          page: this.state.page + 1, loading: false})
        
    }


     handlePrevClick = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=c52b098f73c341888de70e1990bb4af8&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
      this.setState({loading : true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState ({articles : parsedData.articles})
        this.setState({page: this.state.page - 1, loading: false})
    }
    
    

  render() {
    return (
      <div className='container my-4'>
        <h1 className='text-center'>These are the top news headlines</h1>
        {/* Row #1 */}
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!(this.state.loading) && this.state.articles.map((element) => {
                return <div className="col-md-4 d-flex align-items-stretch" key={element.url}>
                <NewsItem 
                title = {element.title.slice(0, 60)}
                description = {element.description && element.description.slice(0,88)}
                author = {element.author? element.author : "Unknown"}
                publishedAt = {element.publishedAt}
                source = {element.source.name}
                imageUrl = {element.urlToImage}
                newsUrl = {element.url}
                />
            </div>
            })}

            <div className="container d-flex justify-content-between my-3" >
            <button type="button" disabled={this.state.page <=1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/9)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
      </div>
    )
  }
}

export default News
