<template>
  <div>
    <el-card class="box-card"
             v-for="card in card"
             :key="card.categorizeId"
             :categorizeName="card.categorizeName"
             :item="card.item"
    >
      <el-row>
        <el-col :span="2"
                v-for="item in card.item"
                :key="item.id"
        >
          <a :href="item.path">
            <el-card :body-style="{ padding: '0px'}" class="box-little" shadow="hover">
              <img :src="item.image" class="image" alt="">
              <div style="padding: 5px;">
                <span style="font-size:small">{{ item.name }}</span>
              </div>
            </el-card>
          </a>

        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "dh.vue",
  data() {
    return {
      // todos: JSON.parse(localStorage.getItem('todos')) || []
      card: [{
        "categorizeId": "1", "categorizeName": "这是分类名称", item: [

          {
            "id": "1",
            "name": "文件服务器",
            "path": "http://10.15.245.153",
            "permission": [1, 2],
            "image": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            "introduction": ""
          },

          {
            "id": "2",
            "name": "文件服务器",
            "path": "http://10.15.245.153",
            "permission": [1, 2],
            "image": "",
            "introduction": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          }

        ]
      },

        {
          "categorizeId": "2", "categorizeName": "这是分类名称2", item: [

            {
              "id": "1",
              "name": "文件服务器",
              "path": "http://10.15.245.153",
              "permission": [1, 2],
              "image": "",
              "introduction": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            },

            {
              "id": "2",
              "name": "文件服务器",
              "path": "http://10.15.245.153",
              "permission": [1, 2],
              "image": "",
              "introduction": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            }

          ]
        }

      ]
    };
  },


};
</script>

<style scoped>
.box-card {
  width: 80rem;
  height: 10rem;
  margin-top: 1rem;
  border-radius: 20px;
}

.image {
  width: 100%;
  display: block;
}

.box-little {
  border-radius: 20px;
  width: 80%;
  height: 80%;
}

/*.box-card {*/
/*  border-radius: 20px;*/
/*  padding: 0;*/
/*}*/
.button {
  padding: 0;
  float: right;
}

</style>