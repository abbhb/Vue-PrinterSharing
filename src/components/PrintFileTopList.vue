<template>
<div class="PrintTopBody">
    <div>
       <span>打印用户榜单</span>
    </div>
    <div>
        <span ></span>
    </div>

</div>
</template>

<script>
export default {
    name: "PrintFileTopList",
    data() {
        return {
            UserTopList:[],
        }
    },
    created() {

    },
}
</script>

<style scoped>
.PrintTopBody {
    display: flex;flex-direction: column;justify-content: center;align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 3rem 3rem 3rem 3rem;
    border-radius: 1rem;
    background-image: url('/images/pexels-codioful-(formerly-gradienta)-7130469.jpg');
}
</style>