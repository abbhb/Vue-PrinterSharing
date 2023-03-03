
export const menuData = [
    // 有子菜单 字菜单不分组的
    {
        optionName: "我的主页",
        iconClassName: "el-icon-setting",
        index: '1',
        disabled: false, // 是否禁用
        childList: [
            {
                optionName: '个人信息',
                index: '1-1',
                routerName: "UserInfoForAdmin"
            },
            {
                optionName: '修改密码',
                index: '1-4',
                routerName: "ChangePasswordForAdmin"
            }
        ]
    },
    {
        optionName: "课程管理",
        iconClassName: "el-icon-setting",
        index: '2',
        disabled: false, // 是否禁用
        childList: [
            {
                optionName: '编辑课程',
                index: '2-1',
                routerName: "MDCourseForAdmin"
            },
            {
                optionName: '课程表展示',
                index: '2-2',
                routerName: "TimeTableForAdmin"
            },
            {
                optionName: 'test2',
                index: '2-3',
                routerName: "test2"
            },
            {
                optionName: 'test3',
                index: '2-4',
                routerName: "test3"
            }
        ]
    }

]

// export default {menuData}




/* 菜单配置 描述 */
export const menuData描述 = [
    // 有子菜单 并且字菜单分组的
    {
        optionName: "导航一", // 一级菜单名
        iconClassName: "aaa", // element-ui图标名
        index: '1', // 唯一标志
        childList: [ // 分组的
            {
                groupName: '组名一',
                index: '1-1-1',
                list: [
                    {
                        optionName: '选项1',
                        routerName: "home"
                    },
                    {}
                ],
            },
            {
                groupName: '组名二',
                index: '1-1-2',
                list: [
                    {
                        optionName: '选项1',
                        routerName: "home"
                    },
                    {}
                ],
            }
        ],
    },
    // 有子菜单 字菜单不分组的
    {
        optionName: "导航二",
        iconClassName: "el-icon-menu",
        index: '2',
        disabled: false, // 是否禁用
        childList: [ // 不分组的
            {
                optionName: '选项1',
                index: '2-1',
                routerName: "home"
            },
            {}
        ]
    },
    // 无子菜单的
    {
        optionName: "导航三",
        iconClassName: "el-icon-document",
        routerName: "home",
        index: '3',
        disabled: false
    },

    "导航四"
]

