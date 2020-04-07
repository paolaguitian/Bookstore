import './css/bookcatalog.css';
import React, { Component } from 'react';
import axios from 'axios';
import { List, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import BookCard from './bookcard';
import PageSwitcher from './pageswitcher';

class BookCatalog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pager: {},
			pageOfBooks: [],
			loading: true,
		};
	}

	getPageOfBooks = () => {
		const params = new URLSearchParams(window.location.search);
		const page = parseInt(params.get('page')) || 1;
		if (page !== this.state.pager.currentPage) {
			axios
				.get('/api/books/all', {
					params: {
						page: page,
					},
				})
				.then((res) => {
					this.setState({
						pager: res.data.pager,
						pageOfBooks: res.data.pageOfBooks,
						loading: false,
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	componentDidMount() {
		this.getPageOfBooks();
	}

	componentDidUpdate() {
		this.getPageOfBooks();
	}

	render() {
		const { pager, pageOfBooks, loading } = this.state;
		const spinnerIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
		if (loading === true) {
			return (
				<div className="book-catalog-container">
					<div className="book-catalog-cards">
						<Spin
							indicator={spinnerIcon}
							style={{ textAlign: 'center' }}
						/>
					</div>
				</div>
			);
		} else if (loading === false) {
			return (
				<div className="book-catalog-container">
					<div className="book-catalog-cards">
						<List
							grid={{
								gutter: 16,
								xs: 1,
								sm: 2,
								md: 4,
								lg: 4,
								xl: 6,
								xxl: 3,
							}}
							dataSource={pageOfBooks}
							renderItem={(book) => (
								<List.Item align="middle">
									<BookCard
										key={book.bookID}
										bookID={book.bookID}
										page={pager.currentPage}
									/>
								</List.Item>
							)}
						/>
					</div>
					<PageSwitcher pager={pager} />
				</div>
			);
		}
	}
}

export default BookCatalog;
