import React from 'react'
import sports from '../images/sports.jpg'

function Demo() {
    return (
        <div>
            <div className="card align-items-center">
                <img src={sports} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    )
}

export default Demo
