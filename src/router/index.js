const globalHeader = () => import('@/components/layouts/GlobalHeader.vue');
const myPage = () => import('@/components/pages/MyPage.vue');
const goal = () => import('@/components/pages/Goal.vue');
const wallet = () => import('@/components/pages/Wallet.vue');
const login = () => import('@/components/pages/Login.vue');

export default {
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			name: 'mypage',
			component: myPage,
			meta: {
				title: 'マイページ',
				// titleKey: 'myPage',
				currentHeader: globalHeader
			},
			props: true
		},
		{
			path: '/wallet',
			name: 'wallet',
			component: wallet,
			meta: {
				title: 'お金管理',
				// titleKey: 'wallet',
				currentHeader: globalHeader
			},
			props: true
		},
		{
			path: '/goal',
			name: 'goal',
			component: goal,
			meta: {
				title: '目標',
				// titleKey: 'goal',
				currentHeader: globalHeader
			},
			props: true
		},
		{
			path: '/login',
			name: 'login',
			component: login,
			meta: {
			},
			props: true
		},
		// catch all redirect
		{
			path: '*',
			redirect: '/'
		}
	]
};
