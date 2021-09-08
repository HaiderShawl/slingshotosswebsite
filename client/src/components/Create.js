import React from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import Datetime from 'react-datetime';
import Countdown from 'react-countdown';


// import Cookies from 'js-cookie'

// import  { Redirect } from 'react-router-dom'

class Create extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			path:props.match.path,
			challenge: {
				title:'',
				description:'',
				categories:[],
				deadlines:"",
				submissions:[]
			}
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}



	handleChange(e) {
		const name = e.target?e.target.name:"deadlines"

		this.setState((prevState) => {
			if (name === "categories"){
				let value = Array.from(e.target.selectedOptions, option => option.value);
				prevState.challenge[name] = value
				return prevState
			} else if(name === "deadlines") {
				prevState.challenge[name] = String(e._d)
				return prevState
			} else {
				prevState.challenge[name] = e.target.value
				return prevState
			}
		})
		console.log(this.state)
	}


	handleSubmit(e) {
		axios.post('/create', this.state.challenge).then(res => {
			this.props.history.push("/challenges/"+res.data.r._id)
			console.log(res.data)
		}).catch(e => {
			console.log(e)
		})

		console.log(this.state)
		e.preventDefault()
	}

	render () {
		const time = Date.parse(this.state.challenge.deadlines.substr(0,24))

		return (
			<div>
				<form className="container-fluid pb-5" action="/login" onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="col-md-6 p-3">
							<h1 className="text-center text-white my-5">New challenge</h1>

							<div className="form-floating mb-3">
								<input type="text" className="form-control bg-white text-dark" onChange={this.handleChange} id="floatingInput" placeholder="name@example.com" name="title" value={this.state.challenge.title} required />
								<label htmlFor="floatingInput" className="text-dark">Title</label>
							</div>		

							<div className="pb-4">
								<label className="text-white">Category</label><br/>
								<select className="select" onChange={this.handleChange} name="categories" multiple={true}>
									<option>Web Dev</option>
									<option>Machine Learning</option>
									<option>Blockchain</option>
									<option>Bot</option>
									<option>Computer Vision</option>
									<option>Other</option>
								</select>
								<br/>
							</div>

							<div className="form-floating mb-3">
	              				<textarea type="text" rows={2} defaultValue={this.state.challenge.description}  className="form-control" onChange={this.handleChange} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="floatingInput" name="description" style={{height:'300px'}} required/>
								<label htmlFor="floatingInput" className="text-dark">Description</label>
							</div>



							

							<div className="pt-4">
								<label className="text-white">Final Deadline</label><br/>
								<Datetime inputProps={{ name:"deadlines"}} onChange={this.handleChange} />
							</div>


							<a className="btn btn-outline-light mt-3" onClick={this.handleSubmit} href="/userpage">Create</a>

						</div>

						<div className="col-md-6 p-3 mt-2">
							<h2 className="text-center my-5 text-white">Preview</h2>
							<div className="container bg-white text-dark p-5 rounded">
								<h1>{this.state.challenge.title}</h1>
								<h5>{this.state.challenge.categories.map((c,i) => <span key={i} className="badge bg-secondary m-1">{c}</span>)}<br/></h5>
								<br/>
								<ReactMarkdown>{this.state.challenge.description}</ReactMarkdown>
								
								<h4>{time?"Time left:":null} {time?
								<Countdown date={time} />
								:null}</h4> <br/>

							</div>
						</div>

					</div>
				</form>
			</div>
		)
	}

   
}

export default Create