<template>
    <el-upload
            class="avatar-uploader"
            action="./api/common/uploadimage"
            :headers="headerObj"
            v-loading="isimageupload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            ref="upload"
    >
        <img
                v-if="avatar"
                :src="avatar"
                class="avatar"
        />
        <i v-else class="el-icon-upload add"></i>
    </el-upload>
</template>

<script>
export default {
    name: "MyElUploadImage",
    props: {
        avatar: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            headerObj: {
                Authorization: localStorage.getItem('token'),
                userId: localStorage.getItem('userId')
            },
            isimageupload: false,//图片是否再上传
        }
    },
    created() {

    },
    methods: {
        handleAvatarSuccess(res) {
            this.isimageupload = false;
            if (String(res.code) === '1') {
                this.avatar = String(res.data);
                this.$emit("update:avatar", String(res.data));
            } else {
                this.$message.error(res.msg)
            }

        },
        beforeAvatarUpload(file) {
            this.isimageupload = true
            const suffix = file.name.split('.')[1]
            if (!['png', 'jpeg', 'jpg'].includes(String(suffix))) {
                this.$message.error('上传图片只支持 png、jpeg、jpg 格式！')
                this.isimageupload = false;
                return false
            }
        },
    }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .add {
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 28px;
    text-align: center;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

</style>