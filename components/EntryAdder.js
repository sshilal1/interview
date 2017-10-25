import React from 'react';
import ReactDOM from 'react-dom';

var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export default class EntryAdder extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
			firstname : '',
			lastname : '',
			number : ''
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
		var state = this.state;

		state.id = ID();

    console.log(state);
    event.preventDefault();

    this.props.onAdd(state);
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
						<input style={{marginLeft: "20px"}} type="submit" value="Add Reservation" />
					</div><div>
						<label style={style}>Phone</label>
						<input style={style} name="number" onChange={this.handleInputChange}></input>
					</div>
				</form>
			</div>
		)
	}
}