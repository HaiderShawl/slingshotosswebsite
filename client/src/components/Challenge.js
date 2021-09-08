import React from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import Countdown from 'react-countdown'
import Cookies from 'js-cookie'

class challenge extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
      		id:props.match.params.id,
			submission:{
				link:"",
				level:"Beginner"
			},
			challenge: {				
				title:"",
				description:"",
				categories:[""],
				deadlines:"",
			},
			message:'',
			submitted:true
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	

	componentDidMount() {
		axios.get('/challenges/'+this.state.id).then(res => {
			this.setState((prevState) => {
				prevState.challenge = res.data
				return prevState
			})
		}).catch(e => {
			console.log(e)
		})
	}


	handleChange(e) {
		this.setState(prevState => {
			const name = e.target.name
			prevState.submission[name] = e.target.value
			return prevState
		})
	}


	handleSubmit(e) {
		if (Cookies.get('token') === undefined) {
			this.setState(prevState => {
				prevState.message = 'Login to submit your project'
				return prevState
			})
		} else {
			this.setState(prevState => {
				prevState.submitted = false
				return prevState
			})
			axios.post('/submit', {submission:this.state.submission, id:this.state.id, title:this.state.challenge.title}).then(res => {
				this.setState(prevState => {
					prevState.message = 'Project submitted successfully!'
					prevState.submitted = true
					return prevState
				})
			}).catch(e => {
				console.log(e)
			})
		}
		e.preventDefault()
	}




	render() {
		const time = Date.parse(this.state.challenge.deadlines.substr(0,24))

		return (
			<div className="container-fluid">
					<div className="row justify-content-center bg-white">
						<div className="col-md-8 p-5">
							<h1 className="pt-5">{this.state.challenge.title}</h1>
							<h5>{this.state.challenge.categories.map((c,i) => <span key={i} className="badge bg-secondary m-1">{c}</span>)}<br/></h5>
							<br/>
							<ReactMarkdown>{this.state.challenge.description}</ReactMarkdown>
							<br/>

							<h4>{time?"Time left: ":null} 
								{time?
								<Countdown date={time} />
								:null}
							</h4> <br/>

							{Date.now()<time?
							<div>
								<button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
								Submit Project
								</button>


								<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title" id="exampleModalLabel">Submit Project</h5>
											<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
										<div className="modal-body">
											<form onSubmit={this.handleSubmit}>
												<label htmlFor="exampleInputEmail1" className="form-label">Enter the link to the github repo of your project:</label>
												<input type="url" className="form-control" id="exampleInputEmail1" onChange={this.handleChange} name="link" required />

												<label htmlFor="exampleInputEmail1" className="form-label mt-4">Select challenge level:</label>
												<select className="form-select" aria-label="Default select example" name="level" onChange={this.handleChange} required>
													<option value="Beginner">Beginner</option>
													<option value="Intermediate">Intermediate</option>
													<option value="Advanced">Advanced</option>
												</select>

												<p className='text-danger pt-2'>{this.state.message}</p>


												<button className="btn btn-outline-dark mt-3">
												{this.state.submitted?"Submit":
													<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
												}
												
												</button>
											</form>
										</div>
									</div>
								</div>
								</div>
							</div>
							:null}
							
						</div>
	
					</div>
				
			</div>
		)
	}
}

export default challenge