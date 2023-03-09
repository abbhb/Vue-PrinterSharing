<template>
  <div>
    <div
      v-for="card in cards"
      :key="card.categorizeId"
    >
      <div class="head">
        <h4 class="text">
          <i :class="card.ico"></i>
          {{ card.categorizeName }}
        </h4>
      </div>
      <div class="box_"
           v-for="item in card.item"
           v-show="real_cards.id in item.permission"
           :key="item.id"
      >
        <a :href="item.path" target="_blank">
          <el-tooltip effect="dark" :content="item.name" placement="bottom" hide-after="1000">
            <el-card class="box-card"  shadow="hover">
              <div class="ico_ cont_">
                <img class="img_" :src="item.image">
              </div>
              <div class="cont_">
                <div>
                  <strong class="cont_head">{{ item.name }}</strong>
                </div>
                <p class="cont_cont">{{ item.introduction }}</p>
              </div>
              <a :href="item.path" class="link_">
                <el-tooltip effect="dark" content="直达" placement="right">
                  <i class="el-icon-s-promotion"></i>
                </el-tooltip>
              </a>
            </el-card>
          </el-tooltip>

        </a>

      </div>
    </div>
    <a>
    </a>
  </div>
</template>

<script>
export default {
  name: "dh.vue",
  data() {
    return {
      // todos: JSON.parse(localStorage.getItem('todos')) || []
      cards: [{
        "categorizeId": "1", "categorizeName": "文件", "ico": "el-icon-document", item: [
          {
            "id": "1",
            "name": "文件服务器",
            "path": "http://10.15.245.153",
            "permission": [1, 2],
            "image": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            "introduction": "AI实验室服务器"
          },
          {
            "id": "2",
            "name": "文件服务器",
            "path": "http://10.15.245.153",
            "permission": [1, 2],
            "image": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            "introduction": "AI实验室服务器"
          },
          {
            "id": "2",
            "name": "文件服务器",
            "path": "http://10.15.245.153",
            "permission": [1, 2],
            "image": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            "introduction": "AI实验室服务器"
          },
          {
            "id": "2",
            "name": "文件服务器",
            "path": "http://10.15.245.153",
            "permission": [1, 2],
            "image": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            "introduction": "AI实验室服务器"
          },
          {
            "id": "2",
            "name": "文件服务器",
            "path": "http://10.15.245.153",
            "permission": [1, 2],
            "image": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            "introduction": "AI实验室服务器"
          },
          {
            "id": "2",
            "name": "文件服务器",
            "path": "http://10.15.245.153",
            "permission": [1, 2],
            "image": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
            "introduction": "AI实验室服务器"
          }

        ]
      },

        {
          "categorizeId": "2", "categorizeName": "工具", "ico": "el-icon-monitor", item: [

            {
              "id": "1",
              "name": "文件服务器",
              "path": "http://10.15.245.153",
              "permission": [1, 2],
              "image": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              "introduction": "AI实验室服务器"
            },

            {
              "id": "2",
              "name": "文件服务器",
              "path": "http://10.15.245.153",
              "permission": [1, 2],
              "image": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              "introduction": "AI实验室服务器"
            }
          ]
        }
      ],
      real_cards: JSON.parse(localStorage.getItem("userInfo"))
    };
  }


};
</script>

<style scoped>
.text {
  color: #555;
  font-size: 0.9rem !important;
  margin-bottom: 1.5rem !important;
  font-weight: normal;
}

.box-card {
  width: 15rem;
  height: 4rem;
}

.head {
  margin-top: 1.5rem;
}

.box_ {
  display: inline-block;
  margin-right: 3rem;
  margin-bottom: 2rem;
}

.ico_ {
  width: 2.5rem;
  border-radius: 10px;
  margin-right: 1rem;
}

.img_ {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}

.cont_ {
  display: inline-block;
}

.cont_head {
  font-size: .875rem !important;
  position: relative;
  bottom: .3rem;
}

.cont_cont {
  font-size: .1rem;
  color: #6c757d !important;
  position: relative;
  bottom: .3rem;
}

::v-deep .el-card__body {
  padding: 13px;
}

.link_ {
  position: relative;
  left: 3.5rem;
  bottom: .8rem;
}
</style>