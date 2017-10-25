import React from 'react';
import ReactDOM from 'react-dom';
import shortid from 'shortid';

export default class EntryAdder extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
			firstname : '',
			lastname : '',
			number : '',
			id : 0
		}

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

	handleInputChange(event) {
		const target = event.target;

		this.setState({
			[target.name] : target.value
		})
	}

	handleSubmit(event) {
		var newId = shortid.generate();
		var entry = Object.assign({}, this.state, {id : newId});

    console.log(entry);
    event.preventDefault();

    this.props.onAdd(entry);
    console.log(this);
  }

	render() {

		var style = {
			padding: "10px",
			margin: "5px",
			width: "100px",
			display: "inline-block"
		}
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label style={style}>First Name</label>
						<input style={style} name="firstname" onChange={this.handleInputChange}></input>
					</div><div>
						<label style={style}>Last Name</label>
						<input style={style} name="lastname" onChange={this.handleInputChange}></input>
					</div><div>
						<label style={style}>Phone</label>
						<input style={style} name="number" onChange={this.handleInputChange}></input>
					</div>
					<input style={{width:"260px"}} type="submit" value="Add Reservation" />
				</form>
			</div>
		)
	}
}