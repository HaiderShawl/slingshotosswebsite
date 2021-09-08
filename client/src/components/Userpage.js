import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'


class Userpage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			account: {
				name:"",
				email:"",
				discord_id:"",
				submissions:[],
			},
			challenges:[],
			loaded: false
		}
	}

	componentDidMount(){
		axios.post('/getUser', {token:Cookies.get('token')})
			.then(res => {
				this.setState({account:res.data.account,loaded:true})
				console.log(res.data.account)
				
			}).catch(e => {
				console.log(e)
			})
	}




	render() {
		return (

			!this.state.loaded?
			<div className="d-flex justify-content-center">
				<div className="spinner-border text-white" role="status" style={{width: '5rem', height: '5rem', margin:100}}>
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>

			:

			<div className="container-fluid text-white">
					<div className="row justify-content-center">
						<div className="col-md-8 p-5">
							<h1>Welcome {this.state.account.name}!</h1>
							<br/><br/>

							<h3>Your submissions: </h3>(resubmit to edit your response)

							{this.state.account.submissions.map((submission) => {
								return (
									<div className="p-3 m-3 border border-light mt-3 text-white rounded bg-white text-dark" key={submission.challenge_id}>
										<a href={"/challenges/"+submission.challenge_id} style={{textDecoration:"none", color:'black'}}>
											<h4 className="text-dark">{submission.challenge_name}</h4>
											<p>Github link: {submission.submission.link}</p>
											<p>Level: {submission.submission.level}</p>
										</a>
									</div>					
								)
							})}

							<br/><br/>
						</div>
					</div>
				
			</div>
		)
	}
}

export default Userpage