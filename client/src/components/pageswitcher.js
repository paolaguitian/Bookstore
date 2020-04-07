import './css/pageswitcher.css';
import React from 'react';
import { Link } from 'react-router-dom';
import {
	CaretLeftOutlined,
	CaretRightOutlined,
	StepForwardOutlined,
	StepBackwardOutlined,
} from '@ant-design/icons';

const PageSwitcher = ({ pager }) => {
	return (
		<div className="pager">
			{pager.pages && pager.pages.length && (
				<ul className="pagination">
					<li
						className={`pagebutton ${
							pager.currentPage === 1 ? 'invisible' : ''
						}`}
					>
						<Link to={{ search: `?page=1` }}>
							{<StepBackwardOutlined />}
						</Link>
					</li>
					<li
						className={`pagebutton ${
							pager.currentPage === 1 ? 'invisible' : ''
						}`}
					>
						<Link to={{ search: `?page=${pager.currentPage - 1}` }}>
							<CaretLeftOutlined />
						</Link>
					</li>
					{pager.pages.map((page) => (
						<li
							key={page}
							className={`pagebutton ${
								pager.currentPage === page ? 'active' : ''
							}`}
						>
							<Link to={{ search: `?page=${page}` }}>{page}</Link>
						</li>
					))}
					<li
						className={`pagebutton ${
							pager.currentPage === pager.totalPages ? 'invisible' : ''
						}`}
					>
						<Link to={{ search: `?page=${pager.currentPage + 1}` }}>
							{<CaretRightOutlined />}
						</Link>
					</li>
					<li
						className={`pagebutton ${
							pager.currentPage === pager.totalPages ? 'invisible' : ''
						}`}
					>
						<Link to={{ search: `?page=${pager.totalPages}` }}>
							{<StepForwardOutlined />}
						</Link>
					</li>
				</ul>
			)}
		</div>
	);
};

export default PageSwitcher;
