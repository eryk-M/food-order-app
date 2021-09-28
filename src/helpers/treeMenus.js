import { GiHamburger } from 'react-icons/gi';
import { FiUsers } from 'react-icons/fi';
import { BsPlusCircle } from 'react-icons/bs';
import { HiMenuAlt2 } from 'react-icons/hi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

export const treeUsers = {
	text: 'Users',
	mainIcon: FiUsers,
	list: [
		{
			path: '/admin/users',
			icon: HiMenuAlt2,
			text: 'Users list',
		},
		{
			path: '/admin/users/:id',
			icon: BsPlusCircle,
			text: 'Add user',
		},
	],
};
export const treeProducts = {
	text: 'Products',
	mainIcon: GiHamburger,
	list: [
		{
			path: '/admin/products',
			icon: HiMenuAlt2,
			text: 'Products list',
		},
		{
			path: '/admin/products/add',
			icon: BsPlusCircle,
			text: 'Add product',
		},
	],
};

export const treeQuiz = {
	text: 'Quiz',
	mainIcon: AiOutlineQuestionCircle,
	list: [
		{
			path: '/admin/quiz',
			icon: HiMenuAlt2,
			text: 'Quiz list',
		},
		{
			path: '/admin/quiz/add',
			icon: BsPlusCircle,
			text: 'Add quiz',
		},
	],
};

// export const treeOrders = {
// 	text: 'Products',
// 	mainIcon: FiTruck,
// 	list: [
// 		{
// 			path: '/admin/orders',
// 			icon: HiMenuAlt2,
// 			text: 'Products list',
// 		},
// 	],
// };
