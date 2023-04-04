<template>
<div class="docindex">
    <div class="headerNAV">
        <div class="title">
            某某文档
        </div>
        <div class="search">
            <el-input
                placeholder="搜索文档"
                v-model="searchInput">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <div class="ribbon">
            <el-dropdown>
                <span class="el-dropdown-link"><i class="el-input__icon el-icon-document-add"></i>新建<i class="el-input__icon el-icon-arrow-down"></i></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>新建文集</el-dropdown-item>
                    <el-dropdown-item>新建文章</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
    <div class="content">
        <div class="cards">
            <div class="title">leo</div>
            <div class="intro">此文集没有介绍</div>
        </div>
        <div class="cards">
            <div class="title">leo</div>
            <div class="intro">此文集没有介绍</div>
        </div>
        <div class="cards">
            <div class="title">leo</div>
            <div class="intro">此文集没有介绍</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "docindex",
    data(){
      return{
          searchInput:'',
      }
    }
}
</script>

<style scoped>
.docindex {
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    min-height: 30rem;
    padding: 1rem 1rem 1rem 1rem;
    border-radius: 1rem;
}
.docindex .headerNAV{
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    align-items: center;
    height: 3rem;
  border-bottom: #c6cbd1 1px solid;
}

.docindex .headerNAV .title {
    font-family: 华文琥珀;
    font-weight: 200;
    font-size: 24px;
}
.docindex .headerNAV .search {
    margin-left: 1rem;
}
.docindex .headerNAV .ribbon {
    display: flex;
    margin-left: auto;
    margin-right: 5rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;

}

.docindex .content{
    display: flex;
    flex-flow: wrap;
    padding: 1rem 1rem 1rem 1rem;
}
.docindex .content .cards{
    display: flex;
    flex-direction: column;
    border: #ebecef 1px solid;
    background-color: #FFFFFF;
    width: 23rem;
    height: 11rem;
    padding: 1rem 1rem 1rem 1rem;
    margin-right: 3rem;
    margin-left: 3rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
}
.docindex .content .cards .title{
    display: flex;
    flex-direction: row;
    padding: 1px 1px 1px 1px;
    border-bottom: #c6cbd1 1px solid;
}
.docindex .content .cards .intro{
    padding: 1px 1px 1px 1px;
    display: flex;
    flex-direction: column;
}

</style>