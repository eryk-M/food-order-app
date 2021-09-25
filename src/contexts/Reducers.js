export const cartReducer = (state, action) => {
	switch (action.type) {
		case 'SET_ITEMS':
			return {
				...state,
				cart: [...action.payload],
			};
		case 'ADD_TO_CART':
			const item = state.cart.filter(
				(el) => el.id === action.payload.id
			);
			if (item.length >= 1) {
				return {
					...state,
					cart: state.cart.filter((el) =>
						el.id === action.payload.id
							? (el.quantity += action.payload.quantity)
							: el.quantity
					),
				};
			}

			return {
				...state,
				cart: [...state.cart, { ...action.payload }],
			};
		case 'REMOVE_FROM_CART':
			return {
				...state,
				cart: state.cart.filter((c) => c.id !== action.payload.id),
			};
		case 'ADD_QUANTITY':
			return {
				...state,
				cart: state.cart.filter((el) =>
					el.id === action.payload.id
						? (el.quantity += 1)
						: el.quantity
				),
			};
		case 'REMOVE_QUANTITY':
			return {
				...state,
				cart: state.cart.filter((el) =>
					el.id === action.payload.id
						? (el.quantity -= 1)
						: el.quantity
				),
			};
		case 'SET_ADDRESS':
			return {
				...state,
				address: action.payload,
			};
		case 'SET_METHOD':
			return {
				...state,
				payment: action.payload,
			};
		case 'SET_TOTAL_PRICE':
			return {
				...state,
				totalPrice: action.payload,
			};
		case 'RESET_CART':
			return {
				address: {},
				cart: [],
				totalPrice: 0,
			};
		default:
			return state;
	}
};
