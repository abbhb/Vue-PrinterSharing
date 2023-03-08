import App from '../App.vue'
import NotFound from "@/views/NotFound";
import index from "@/views/index";
import login from "@/views/login/login";
import UserInfo from "@/views/user/UserInfo";
import ChangePassword from "@/views/user/ChangePassword";
import PrintersForPDF from "@/views/print/PrintersForPDF.vue";
import UserManagement from "@/views/admin/UserManagement.vue";
import TempRegistration from "@/views/login/TempRegistration.vue";
import dh from "@/views/dh/dh.vue";
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
			}
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
		path: '/registration',
		name: 'registration',
		component: TempRegistration,
		meta:{
			requireAuth: false,
			needrole:false
		}
	},
	{
		path: '/dh',
		name: 'dh',
		component: dh,
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
			requireAuth: true,
			needrole:false
		},
		children: [
			{
				path: '/userinfo',
				name: 'userinfo',
				component: UserInfo,
				meta:{
					requireAuth: true,
					needrole:false
				}
			},
			{
				path: '/changepassword',
				name: 'changepassword',
				component: ChangePassword,
				meta:{
					requireAuth: true,
					needrole:false
				}
			},
			{
				path: '/printPDF',
				name: 'printPDF',
				component: PrintersForPDF,
				meta:{
					requireAuth: true,
					needrole:false
				}
			},
			{
				path: '/UserManagement',
				name: 'UserManagement',
				component: UserManagement,
				meta:{
					requireAuth: true,
					needrole:true,
					roles:[1]
				}
			}

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

