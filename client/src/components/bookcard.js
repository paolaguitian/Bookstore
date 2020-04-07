import './css/bookcard.css';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Card, Skeleton } from 'antd';
import AuthorInfo from './authordetails/authorinfo';

class BookCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			redirect: false,
			book: [],
		};
	}

	getBookData = (bookID) => {
		axios
			.get(`/api/books/${bookID}`)
			.then((res) => {
				this.setState({ book: res.data, loading: false });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to={`/bookdetails/${this.state.book.bookID}`} />;
		}
	};

	onCardClick = () => {
		this.setState({ redierct: true });
		this.renderRedirect();
	};

	componentDidMount() {
		this.getBookData(this.props.bookID);
	}

	componentDidUpdate(prevProps) {
		if (this.props.bookID !== prevProps.bookID) {
			this.getBookData(this.props.bookID);
		}
	}

	render() {
		const {
			bookID,
			title,
			bookCover,
			authorAuthorID,
			price,
			genre,
		} = this.state.book;
		return (
			<div onClick={this.onCardClick}>
				<Card hoverable className="bookCard" bordered={true}>
					<Skeleton loading={this.state.loading} active={true}>
						<img
							className="bookCover"
							src={`http://localhost:3001/static/${bookCover}`}
							alt={title}
							title={title}
						/>
						<p>
							<strong>{title}</strong>
						</p>
						<div className="authorTag">
							<AuthorInfo data="name" authorAuthorID={authorAuthorID} />
						</div>
						<h5 className="infoTag">Genre: {genre}</h5>
						<h3 className="infoTag">${price}</h3>
						<div className="bookPageLink">
							<Link to={`/bookdetails/${bookID}`}>View More</Link>
						</div>
					</Skeleton>
				</Card>
			</div>
		);
	}
}

export default BookCard;
