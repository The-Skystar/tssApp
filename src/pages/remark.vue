<template>
  <div>
    <mt-header title="备注">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click="addRemark">保存</mt-button>
    </mt-header>
    <mt-field placeholder="添加备注" type="textarea" rows="3" v-model="remark"></mt-field><br>
    <div @click="zsqj">
      <mt-badge color="white" style="color: gray">请准时上门取件</mt-badge>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'remark',
    data(){
      return{
        remark:'',
      }
    },
    methods:{
      addRemark(){
        this.$store.dispatch("setRemark",this.remark);
        this.$router.push("/")
      },
      zsqj(){
        this.remark = '请准时上门取件';
      }
    }

  }
</script>

<style scoped>

</style>
