import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    // console.log("Hello I am a constructor from News component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0

    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updaeNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=23f697705fc34f09a29eff218500cfda&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json()
   
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updaeNews();
    // console.log("cdm")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=23f697705fc34f09a29eff218500cfda&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parseData = await data.json()
    // console.log(parseData);
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false
    // })
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updaeNews();
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=23f697705fc34f09a29eff218500cfda&
    //             page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parseData = await data.json()
    // console.log(parseData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parseData.articles,
    //   loading: false
    // })
    // }
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updaeNews();
    // console.log("Next");
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {


    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=23f697705fc34f09a29eff218500cfda&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parseData = await data.json()

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parseData.articles,
    //     loading: false
    //   })
    // }
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=23f697705fc34f09a29eff218500cfda&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults
    })
    console.log("artcles", this.state.articles.length)
    console.log("totalResults", this.state.totalResults)

  };

  render() {
    // console.log("render")
    return (
      <>
        <h2 className='text-center'>NewMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner />}
        {console.log(this.state.articles)}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.articles.length < this.state.totalResults && <Spinner />}>


          <div className="container">
            <div className='row'>
              {this.state.articles.map((element) => {
                return <div className='col-md-4 col-sm-12' key={element.url}>
                  <NewsItem image1={element.urlToImage} title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 85) : ""}
                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>

              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-around'>
                          <button className="btn btn-dark" disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick}> &larr; Previous</button>
                          <button className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextClick}>Next &rarr;</button>

                        </div> */}
      </>
    )
  }
}

export default News
