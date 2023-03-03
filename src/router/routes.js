import App from '../App.vue'
import NotFound from "@/views/NotFound";
import index from "@/views/index";
import login from "@/views/login/login";
import UserInfo from "@/views/user/UserInfo";
import ChangePassword from "@/views/user/ChangePassword";
import Print from "@/views/print/Print.vue";
export default [
	{
		path: '/',
		component: App,
		meta:{
			requireAuth: false,
			needrole:false
		},
		children: [
			{
				path: '',
				redirect: '/login',
				meta:{
					requireAuth: false,
					needrole:false
				}
			},
		]
	},
	{
		path: '/login',
		name: 'login',
		component: login,
		meta:{
			requireAuth: false,
			needrole:false
		}
	},
	{
		path: '/404',
		name: 'NotFound',
		component: NotFound,
		meta:{
			requireAuth: false,
			needrole:false
		}
	},
	{
		path: '/index',
		name: 'index',
		component: index,
		meta:{
			requireAuth: false,
			needrole:false
		},
		children: [
			{
				path: '/userinfo',
				name: 'userinfo',
				component: UserInfo,
				meta:{
					requireAuth: false,
					needrole:false
				}
			},
			{
				path: '/changepassword',
				name: 'changepassword',
				component: ChangePassword,
				meta:{
					requireAuth: false,
					needrole:false
				}
			},
			{
				path: '/printindex',
				name: 'printindex',
				component: Print,
				meta:{
					requireAuth: false,
					needrole:false
				}
			},

		]
	},
	{
		path: '*',
		name: '*',
		redirect: '/404',
		meta:{
			requireAuth: false,
			needrole:false
		}
	},
];

