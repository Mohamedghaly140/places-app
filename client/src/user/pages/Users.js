import React, { useState, useEffect } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [users, setUsers] = useState();

	useEffect(() => {
		const fetchUsers = async () => {
			setIsLoading(true);
			try {
				const response = await fetch('http://localhost:5000/api/users');

				const responseData = await response.json();

				if (!response.ok) {
					throw new Error(responseData.message);
				}

				setUsers(responseData.users);
			} catch (err) {
				setError(err.message);
			}
			setIsLoading(false);
		};

		fetchUsers();
	}, []);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={() => setError(null)} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && users && <UsersList items={users} />}
		</React.Fragment>
	);
};

export default Users;
