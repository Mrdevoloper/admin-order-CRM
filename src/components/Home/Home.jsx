import { useQuery, gql, useMutation } from '@apollo/client';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './Home.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ORDERS = gql`
	query {
		orders {
			id
			userName
			userNumber
			userLocation
			name
			time
		}
	}
`;

const DELETE_ORDERS = gql`
	mutation deleteOrders($id: ID!) {
		deleteOrders(id: $id) {
			id
			name
		}
	}
`;

const Home = () => {
	const { data, loading, error } = useQuery(ORDERS);
	const [deleteOrders] = useMutation(DELETE_ORDERS);

	const handleClick = (e) => {
		deleteOrders({
			variables: {
				id: e.target.id,
			},
		});
		
		window.location.reload(true);
	};
	return (
		<>
			<div className='wrapt'>
				<div className='sidebardd'>
					<h1 className='admintitle'>Admin</h1>
					<div className='sidebarTitile'>Orders</div>
					<Link className='link' to='/category'>
						<div className='sidebarTitile'>Categories</div>
					</Link>
					<Link className='link' to='/res'>
						<div className='sidebarTitile'>Restaurants</div>
					</Link>
					<Link className='link' to='/food'>
						<div className='sidebarTitile'>Foods</div>
					</Link>
				</div>
				<div className='tablee'>
					<div>
						<div className='ordertexts'>Orders</div>
					</div>
					<table className='table '>
						<thead className='table-primary'>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>user name</th>
								<th scope='col'>phone</th>
								<th scope='col'>location</th>
								<th scope='col'>orders</th>
								<th scope='col'>time</th>
								<th scope='col'>delete</th>
							</tr>
						</thead>
						{data &&
							data?.orders.map((e, i) => (
								<tbody key={i}>
									<tr>
										<th scope='row'>{e.id}</th>
										<td>{e.userName}</td>
										<td>{e.userNumber}</td>
										<td>{e.userLocation}</td>
										<td>{e.name}</td>
										<td>{moment(e.time).calendar()}</td>
										<td>
											<button
											id={e.id}
											onClick={(e) => handleClick(e)}
											type='button' className='btndelete'>
												Delete
											</button>
										</td>
										<td></td>
									</tr>
								</tbody>
							))}
					</table>
				</div>
			</div>
		</>
	);
};

export default Home;
