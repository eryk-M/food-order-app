import React, { useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

//TESTING
import { Form, Button, Card, Alert } from 'react-bootstrap';

const UserAccount = () => {
	const nameRef = useRef();
	const usernameRef = useRef();
	const addressRef = useRef();
	const phoneRef = useRef();
	const zipCodeRef = useRef();
	const cityRef = useRef();
	const emailRef = useRef();

	const { currentUser, updateEmail } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		if (emailRef.current.value === currentUser.email) {
			return setError('Email has to be different than actual');
		}

		try {
			setLoading(true);
			setError('');
			await updateEmail(emailRef.current.value);
			setLoading(false);
			alert('email updated');
		} catch {
			setError('Failed to update email.');
		}
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Update Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								ref={emailRef}
								required
								defaultValue={currentUser.email}
							/>
						</Form.Group>
						{/* test */}
						<Form.Group id="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								ref={nameRef}
								// required
								// defaultValue={currentUser.email}
							/>
						</Form.Group>
						<Form.Group id="username">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								ref={usernameRef}
								// required
								// defaultValue={currentUser.email}
							/>
						</Form.Group>
						<Form.Group id="address">
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								ref={addressRef}
								// required
								// defaultValue={currentUser.email}
							/>
						</Form.Group>
						<Form.Group id="phone">
							<Form.Label>Phone</Form.Label>
							<Form.Control
								type="number"
								ref={phoneRef}
								// required
								// defaultValue={currentUser.email}
							/>
						</Form.Group>
						<Form.Group id="zipcode">
							<Form.Label>Zip/Postal Code</Form.Label>
							<Form.Control
								type="number"
								ref={zipCodeRef}
								// required
								// defaultValue={currentUser.email}
							/>
						</Form.Group>
						<Form.Group id="city">
							<Form.Label>City</Form.Label>
							<Form.Control
								type="text"
								ref={cityRef}
								// required
								// defaultValue={currentUser.email}
							/>
						</Form.Group>
						{/* test */}

						<Button
							disabled={loading}
							className="w-100"
							type="submit"
						>
							Update
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</>
	);
};

export default UserAccount;
