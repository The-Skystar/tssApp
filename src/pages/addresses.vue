<template>
    <div id="addres">
      <mt-header title="地址管理">
        <router-link to="/my" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right" @click="toAddAddress"><i class="fa fa-plus"></i>添加</mt-button>
      </mt-header>

    </div>
</template>

<script>
  export default {
    name: 'addres',
    methods:{
      toAddAddress(){
        this.$router.push("/addAddres");
      }
    }
  }
</script>

<style scoped>

</style>
