export const cartReducer = (state, action) => {
	switch (action.type) {
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
		default:
			return state;
	}
};
