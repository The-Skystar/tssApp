<template>
  <div id="validateInfo">
    <mt-header title="实名认证信息">
      <router-link to="/my" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-cell title="姓名" is-link>
      <span>{{name}}</span>
    </mt-cell>
    <mt-cell title="性别" is-link>
      <span>{{sex}}</span>
    </mt-cell>
    <mt-cell title="民族" is-link>
      <span>{{famous}}</span>
    </mt-cell>
    <mt-cell title="出生日期" is-link>
      <span>{{birthday}}</span>
    </mt-cell>
    <mt-cell title="身份证号" is-link>
      <span>{{id}}</span>
    </mt-cell>
    <mt-cell title="家庭住址" is-link>
      <span>{{address}}</span>
    </mt-cell>
    <mt-cell title="签发机关" is-link>
      <span>{{inst}}</span>
    </mt-cell>
    <mt-cell title="有效期" is-link>
      <span>{{validity}}</span>
    </mt-cell>
  </div>
</template>

<script>
  export default {
    name: 'validateInfo',
    data(){
      return{
        name:'',
        famous:'',
        sex:'',
        birthday:'',
        id:'',
        address:'',
        inst:'',
        validity:'',
      }
    },
    created () {
      let validate = JSON.parse(localStorage.getItem("validate"));
      this.name = validate.name;
      this.sex = validate.sex;
      this.famous = validate.famous;
      this.birthday = new Date(validate.birthday).toLocaleDateString();
      this.id = validate.id.substr(0,4)+'*************'+ validate.id.slice(-1);
      if (validate.address.indexOf("区")!=-1)
        this.address = validate.address.substr(0,validate.address.indexOf("区")+1);
      if (validate.address.indexOf("县")!=-1)
        this.address = validate.address.substr(0,validate.address.indexOf("县")+1);
      this.inst = validate.inst;
      this.validity = new Date(validate.validity).toLocaleDateString();
    }
  }
</script>

<style scoped>
  #validateInfo{
    text-align: left;
  }
</style>
