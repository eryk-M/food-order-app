import { useReducer, useEffect } from 'react';

import { useMemoCompare } from './useMemoCompare';

const reducer = (state, action) => {
	switch (action.type) {
		case 'idle':
			return { status: 'idle', data: undefined, error: undefined };
		case 'loading':
			return {
				loading: true,
				status: 'loading',
				data: undefined,
				error: undefined,
			};
		case 'success':
			return {
				status: 'success',
				data: action.payload,
				error: undefined,
				loading: false,
			};
		case 'error':
			return {
				status: 'error',
				data: undefined,
				error: action.payload,
				loading: false,
			};
		default:
			throw new Error('invalid action');
	}
};

export function useFirestoreQuery(query) {
	const initialState = {
		status: query ? 'loading' : 'idle',
		data: undefined,
		error: undefined,
		loading: false,
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	const queryCached = useMemoCompare(query, (prevQuery) => {
		return prevQuery && query && query.isEqual(prevQuery);
	});
	useEffect(() => {
		let mounted = true;
		// Return early if query is falsy and reset to "idle" status in case
		// we're coming from "success" or "error" status due to query change.
		if (!queryCached) {
			dispatch({ type: 'idle' });
			return;
		}
		dispatch({ type: 'loading' });
		// Subscribe to query with onSnapshot
		// Will unsubscribe on cleanup since this returns an unsubscribe function
		if (mounted) {
			queryCached.onSnapshot(
				(response) => {
					// Get data for collection or doc
					const data = response.docs
						? getCollectionData(response)
						: getDocData(response);
					dispatch({ type: 'success', payload: data });
				},
				(error) => {
					dispatch({ type: 'error', payload: error });
				}
			);
		}

		return () => (mounted = false);
	}, [queryCached]); // Only run effect if queryCached changes
	return state;
}
function getDocData(doc) {
	return doc.exists === true ? { id: doc.id, ...doc.data() } : null;
}
function getCollectionData(collection) {
	return collection.docs.map(getDocData);
}
