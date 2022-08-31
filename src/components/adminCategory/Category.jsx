import { useQuery, gql, useMutation } from '@apollo/client';
import * as React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './Category.css';
const Categories = gql`
	query {
		restaurants {
			id
			name
		}
	}
`;

const NEW_CATEGORY = gql`
	mutation newCategory($name: String!, $pic: String!) {
		newCategory(name: $name, pic: $pic) {
			id
			name
			pic
		}
	}
`;

const deletCategory = gql`
	mutation deleteCategory($id: ID!) {
		deleteCategory(id: $id) {
			id
			name
		}
	}
`;

const Category = () => {
	const [deletedCategory] = useMutation(deletCategory)
	const { data } = useQuery(Categories);
	const [newCategory] = useMutation(NEW_CATEGORY, {
		update: (cache, data) => {
			console.log(data);
		},
	});

	const handleClick = (e) => {
		deletedCategory({
			   variables: {
				id: e.target.id
			   }
		})

		window.location.reload(true)
	}

	const handlesubmit = (e) => {
		e.preventDefault();

		const { name, pic } = e.target;
		if (newCategory) {
			newCategory({
				variables: {
					name: name.value,
					pic: pic.value,
				},
			});
		// window.location.reload(true)

		}
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
					<div className='orderedwrapper'>
						<h3 className='title'>Categories</h3>
						<button
							type='button'
							data-bs-toggle='modal'
							data-bs-target='#exampleModal'
							className='btn btn-primary bttn'>
							Add category
						</button>
					</div>
					<table className='table '>
						<thead className='table-primary'>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Category name</th>
								<th scope='col'>delete</th>
							</tr>
						</thead>
						{data &&
							data?.restaurants.map((e, i) => (
								<tbody key={i}>
									<tr>
										<th scope='row'>{e.id}</th>
										<td>{e.name}</td>
										<td>
											<button onClick={(e) => handleClick(e)}
											id={e.id}
												type='button'
												className='btn btn-danger'>
												Delete
											</button>
										</td>
										<td></td>
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
									Add Category
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
								onSubmit={handlesubmit}>
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

export default Category;
