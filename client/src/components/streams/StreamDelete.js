import React from 'react'
import { connect } from 'react-redux'
import { fetchStream, deleteStream } from '../../actions'
import { Link } from 'react-router-dom'
import history from "../../history"
import Modal from '../Modal'

class StreamDelete extends React.Component {

	componentDidMount() {
		const id = this.props.match.params.id
		this.props.fetchStream(id)
	}

	onDeleteStream = () => {
		const id = this.props.match.params.id
		this.props.deleteStream(id)
	}

	renderActions() {
		return (
			<>
				<button className={`ui button negative`}
						onClick={this.onDeleteStream}
				>
					Delete
				</button>
				<Link className={`ui button`} to={`/`}>
					Cancel
				</Link>
			</>
		)
	}

	renderContent() {
		if(!this.props.stream) {
			return `Are you sure you want to delete this stream?`
		}

		return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`
	}

	render() {
		return (
			<Modal
				title={`Delete stream`}
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push('/')}
			/>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const streamId = ownProps.match.params.id
	return { stream: state.streams[streamId] }
}

export default connect(
	mapStateToProps,
	{ fetchStream, deleteStream }
)(StreamDelete)