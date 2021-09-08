import React from 'react';
import axios from 'axios';
import Countdown from 'react-countdown';


class Home extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			props:props,
      		challenge: {
                  title:"",
                  categories:[],
                  deadlines:'',
                  _id:'',
              }
		}
	}

	componentDidMount() {
		axios.get('/challenges').then((res) => {

			this.setState(prevState => {
				prevState.challenge = res.data.challenges.reverse()[0]
				return prevState
			})

		})
	}

    render() {
        return (
            <div className="container mb-5 text-white">
                <div className="pt-5 mb-4 rounded-3">
                    <div className="container-fluid py-5">
                        <div className="row py-5">
                            <div className="col-md-6">
                                <h1 className="display-5 fw-bold">Open Source Challenges</h1>
                                <p className="col-md-8 fs-4">Level up your coding game by participating in our weekly open source challenges.</p>
                                <a className="btn btn-outline-light btn-lg mb-5" href='/challenges'>View Challenges</a>
                            </div>
                            <div className="col-md-6">
                                <img className="img-fluid rounded" src="/Images/home.jpg" alt="usage" />
                            </div>
                        </div>
                        <div className="row bg-white text-dark mt-5">
                            <div className="p-5">
                                <a href={"/challenges/"+this.state.challenge._id} style={{textDecoration:"none", color:'black'}}>
                                    <h3>Latest Challenge: {this.state.challenge.title}</h3>
                                    <h5>{this.state.challenge.categories.map((c,i) => <span key={i} className="badge bg-secondary m-1">{c}</span>)}<br/></h5>
                                    <h6>Time left: {Date.parse(this.state.challenge.deadlines.substr(0,24))?
                                    <Countdown date={Date.parse(this.state.challenge.deadlines.substr(0,24))} />
                                    :null}</h6> <br/>
                                </a>
                            </div>        
                        </div>
                        </div>
                    </div>
                </div>  
        )
    }
}

export default Home