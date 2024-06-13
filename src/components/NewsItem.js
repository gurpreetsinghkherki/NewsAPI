import React, { Component} from 'react'
export class NewsItem extends Component {
  render() {
    let { title, description, image1, newsUrl, author, date, source } = this.props;
    // console.log(image1)
    return (
      <div className='my-3'>
        <div className="card" style={{height:"450px"}} >
        <span className="badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source}
            </span>
          <img src={!image1 ?"https://static.toiimg.com/thumb/msid-110238676,width-1070,height-580,imgsize-16280,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" : image1}
            className="card-img-top" style={{ height: "200px" }} />
          <div className="card-body">
            <h5 className="card-title"> {title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author ? "unknows" : author} on {new Date(date).toGMTString()}</small></p>  {/*  class=text-body-secondary */}
            <a href={newsUrl} target='_blank' className="btn btn-sm btn btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
