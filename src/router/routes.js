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
import navfenlei from "@/views/nav/navfenlei.vue";
import navfenleiitem from "@/views/nav/navfenleiitem.vue";
import docindex from "@/views/doc/docindex.vue";
import myHistoryPrints from "@/views/print/MyHistoryPrints.vue";
import allUserHistoryPrints from "@/views/admin/AllUserHistoryPrints.vue";
import files from "@/views/files/Files.vue";
import safeCenter from "@/views/user/SafeCenter.vue";
import en from "@/views/redirect/en.vue";
import gitee from "@/views/redirect/gitee.vue";
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
		path: '/redirect-en',
		name: 'redirect-en',
		component: en,
		meta:{
			requireAuth: false,
			needrole:false
		}
	},
	{
		path: '/redirect-gitee',
		name: 'redirect-gitee',
		component: gitee,
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
				path: '/myHistoryPrints',
				name: 'myHistoryPrints',
				component: myHistoryPrints,
				meta:{
					requireAuth: true,
					needrole:false
				}
			},
			{
				path: '/allUserHistoryPrints',
				name: 'allUserHistoryPrints',
				component: allUserHistoryPrints,
				meta:{
					requireAuth: true,
					needrole:true,
					roles:[1]
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
				path: '/UserManagement',
				name: 'UserManagement',
				component: UserManagement,
				meta:{
					requireAuth: true,
					needrole:true,
					roles:[1]
				}
			},
			{
				path: '/navfenlei',
				name: 'navfenlei',
				component: navfenlei,
				meta:{
					requireAuth: false,
					needrole:false
				}
			},
			{
				path: '/navfenleiitem',
				name: 'navfenleiitem',
				component: navfenleiitem,
				meta:{
					requireAuth: false,
					needrole:false
				}
			},
			{
				path: '/doc',
				name: 'docindex',
				component: docindex,
				meta:{
					requireAuth: false,
					needrole:false
				}
			},
			{
				path: '/files',
				name: 'files',
				component: files,
				meta:{
					requireAuth: false,
					needrole:false
				}
			},
			{
				path: '/safecenter',
				name: 'safecenter',
				component: safeCenter,
				meta:{
					requireAuth: true,
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

