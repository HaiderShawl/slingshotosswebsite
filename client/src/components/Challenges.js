import React from 'react'
import axios from 'axios'
import Countdown from 'react-countdown'

class Challenges extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			props:props,
      		challenges: []
		}
	}

	componentDidMount() {
		axios.get('/challenges').then((res) => {
			this.setState(prevState => {
				prevState.challenges = res.data.challenges.reverse()
				return prevState
			})
		})
	}




	render() {
		return (
			<div className="container-fluid">
					<div className="row align-items-md-stretch px-5">
						<h1 className="text-center pb-3 pt-3 text-white">All Challenges</h1>
						{this.state.challenges.map((challenge) => {
								return (
									<div className="col-md-4 p-3" key={challenge._id}>
										<a href={"/challenges/"+challenge._id} style={{textDecoration:"none"}}>
											<div className="h-100 p-5 text-dark border border-white rounded-3 bg-white">
											<h3>{challenge.title}</h3>
											<h5>{challenge.categories.map((c,i) => <span key={i} className="badge bg-secondary m-1">{c}</span>)}<br/></h5>

											<h6>Time left: {Date.parse(challenge.deadlines.substr(0,24))?
											<Countdown date={Date.parse(challenge.deadlines.substr(0,24))} />
											:null}</h6> <br/>
											</div>
										</a>
									</div>
									
								)
							})}
					</div>		
			</div>
		)
	}
}

export default Challenges