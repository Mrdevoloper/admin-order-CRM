import { useQuery, gql, useMutation } from '@apollo/client';
import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './Food.css';
const Branches = gql`
	query {
		brenches {
			id
			name
		}
	}
`;

const NEW_FOODS = gql`
	mutation newFoods(
		$name: String!
		$pic: String!
		$price: String!
		$refId: time
	) {
		newFoods(name: $name, pic: $pic, price: $price, refId: $refId) {
			id
			name
			price
		}
	}
`;

const ALL_FOODS = gql`
	query {
		all_foods {
			id
			name
			price
			pic
		}
	}
`;

const DELETE_FOODS = gql`
	mutation deleteFoods($id: ID!) {
		deleteFoods(id: $id) {
			id
			name
			price
			refId
		}
	}
`;

const Res = () => {
	const [deleteFoods] = useMutation(DELETE_FOODS);
	const { data: foodData } = useQuery(ALL_FOODS);
	const { data } = useQuery(Branches);
	const [newFoods] = useMutation(NEW_FOODS, {
		update: (cache, data) => {
			console.log(data);
		},
	});

	const handleClick = (e) => {
		deleteFoods({
			variables: {
				id: e.target.id,
			},
		});

		window.location.reload(true);
	};

	const handlesubmit = (e) => {
		e.preventDefault();

		const { name, pic, price, refId } = e.target;

		if (newFoods) {
			newFoods({
				variables: {
					name: name.value,
					pic: pic.value,
					price: price.value,
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
					<div className='orderedwrapper wraprert'>
						<h3 className='title'>Foods</h3>
						<button
							type='button'
							data-bs-toggle='modal'
							data-bs-target='#exampleModal'
							className='btn btn-primary bttn'>
							Add Food
						</button>
					</div>
					<table className='table '>
						<thead className='table-primary'>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Foods name</th>
								<th scope='col'>Food Price</th>

								<th scope='col'>delete</th>
							</tr>
						</thead>
						{foodData &&
							foodData?.all_foods.map((e, i) => (
								<tbody key={i}>
									<tr>
										<th scope='row'>{e.id}</th>
										<td>{e.name}</td>
										<td>{e.price}</td>

										<td>
											<button
												id={e.id}
												onClick={(e) => handleClick(e)}
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
										data?.brenches.map((e, i) => (
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
								<input
									placeholder='Enter Food price'
									className='inputstyle'
									required
									type='text'
									name='price'
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
