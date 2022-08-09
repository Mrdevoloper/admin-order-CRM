import { useQuery, gql, useMutation } from '@apollo/client';
import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './Res.css';
const Categories = gql`
	query {
		restaurants {
			id
			name
		}
	}
`;

const NEW_RESTAURANT = gql`
	mutation new($name: String!, $pic: String!, $refId: time) {
		newBranch(name: $name, pic: $pic, refId: $refId) {
			id
			name
			refId
		}
	}
`;

const ALL_BRANCHES = gql`
	query {
		brenches {
			id
			name
		}
	}
`;

const DELETE_RES = gql`
	mutation deletebranch($id: ID!) {
		deletebranch(id: $id) {
			id
			name
		}
	}
`;

const Res = () => {
	const [deletedbranch] = useMutation(DELETE_RES)
	const { data: branchdata } = useQuery(ALL_BRANCHES);
	const { data } = useQuery(Categories);
	const [newCategory] = useMutation(NEW_RESTAURANT, {
		update: (cache, data) => {
			console.log(data);
		},
	});

	const handleClick = (e) => {
		deletedbranch({
			   variables: {
				id: e.target.id
			   }
		})

		window.location.reload(true)
	}

	const handlesubmit = (e) => {
		e.preventDefault();

		const { name, pic, refId } = e.target;

		if (newCategory) {
			newCategory({
				variables: {
					name: name.value,
					pic: pic.value,
					refId: refId.value,
				},
			});
		}
		window.location.reload(true);
	};
	return (
		<>
			<div className='wrapt'>
				<div className='sidebardd'>
					<h1 className='admintitle'>Admin</h1>
					<Link className='link' to='/'>
						<div className='sidebarTitile'>Orders</div>
					</Link>
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
					<div className='orderedwrapper wrapre'>
						<h3 className='title'>Restaurants</h3>
						<button
							type='button'
							data-bs-toggle='modal'
							data-bs-target='#exampleModal'
							className='btn btn-primary bttn'>
							Add restaurant
						</button>
					</div>
					<table className='table '>
						<thead className='table-primary'>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Resataurant name</th>
								<th scope='col'>delete</th>
							</tr>
						</thead>
						{branchdata &&
							branchdata?.brenches.map((e, i) => (
								<tbody key={i}>
									<tr>
										<th scope='row'>{e.id}</th>
										<td>{e.name}</td>
										<td>
											<button id={e.id} onClick={(e) => handleClick(e) }
												type='button'
												className='btn btn-danger'>
												Delete
											</button>
										</td>
									</tr>
								</tbody>
							))}
					</table>
				</div>
				<div
					className='modal fade'
					id='exampleModal'
					tabIndex='-1'
					aria-labelledby='exampleModalLabel'
					aria-hidden='true'>
					<div className='modal-dialog'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5
									className='modal-title'
									id='exampleModalLabel'>
									Add Restaurant
								</h5>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'></button>
							</div>
							<form
								className='formm'
								action=''
								onSubmit={(e) => handlesubmit(e)}>
								<select
									className='selectRES'
									name='refId'
									id=''>
									<option disabled={true} selected={true}>
										Select Categories
									</option>
									{data &&
										data?.restaurants.map((e, i) => (
											<option key={i} value={e.id}>
												{e.name}
											</option>
										))}
								</select>
								<input
									placeholder='Enter category name'
									className='inputstyle'
									required
									type='text'
									name='name'
								/>
								<input
									placeholder='Enter category url img '
									className='inputstyle'
									required
									type='text'
									name='pic'
								/>

								<button
									type='submit'
									className='btn btn-primary prmbtn'
									data-bs-dismiss='modal'>
									create
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Res;
