import React from 'react';
import ReactDOM from 'react-dom';

export default class ReservationEntry extends React.Component {

	constructor(props) {
		super(props);

		this.handleRemove = this.handleRemove.bind(this);
	}

	handleRemove() {
		var res = this.props;
		this.props.remove(res);
	}

	render() {

		var style = {
			display: "inline-block",
			padding: "10px"
		}

		return (
			<li>
				<div style={style}>{this.props.firstname}</div>
				<div style={style}>{this.props.lastname}</div>
				<div style={style}>{this.props.number}</div>
				<button onClick={this.handleRemove}>X</button>
			</li>
		)
	}
}