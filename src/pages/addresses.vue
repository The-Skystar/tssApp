<template>
    <div id="addres">
      <mt-header title="地址管理">
        <router-link to="/my" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right" @click="toAddAddress"><i class="fa fa-plus"></i>添加</mt-button>
      </mt-header>
      <ul>
        <li v-for="item in addressInfo" @click="chose(item)">
          <div id="top">
            <div id="name"><p>{{item.contact}}</p></div>
            <div id="tel"><p>{{item.phone}}</p></div>
          </div>
          <div id="bottom">
            <div id="address"><p>{{item.province+item.city+item.county+item.street+item.address}}</p></div>
            <div id="edit" @click="edit(item)"><p>编辑</p></div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  export default {
    name: 'addres',
    data(){
      return{
        addressInfo:null
      }
    },
    created(){
      this.loadAddress();
    },
    methods:{
      toAddAddress(){
        this.$store.dispatch("setAddressSelected",'')
        this.$router.push("/addAddres");
      },
      loadAddress(){
        let config = {
          headers:{
            "token":sessionStorage.getItem("token"),
            "userId":JSON.parse(this.$store.state.currentUser).userId
          }
        }
        let self = this;
        this.$axios.get(this.$store.state.url+"/tss/all?userId="+JSON.parse(this.$store.state.currentUser).userId,config).then(function (res) {
          self.$store.dispatch("setAddressInfo",JSON.stringify(res.data.data));
          self.addressInfo = res.data.data
          console.log(JSON.parse(self.$store.state.userAddress.addressInfo))
        })
      },
      edit(item){
        this.$store.dispatch("setAddressSelected",JSON.stringify(item))
        this.$router.push("/addAddres")
      },
      chose(item){
        if (this.$store.state.isSendCourier){
          let params = {
            "contact":item.contact,
            "phone":item.phone,
            "province":item.province,
            "city":item.city,
            "county":item.county,
            "street":item.street,
            "district":item.province+item.city+item.county+item.street,
            "address":item.address,
            "isDefault":item.defaultAddr,
            "districtCode":item.district,
            "postcode":item.postcode,
          };
          if (this.$store.state.recipient==='sender'){
            this.$store.dispatch("setSender",JSON.stringify(params));
            this.$store.dispatch("setSendCourier",false);
            this.$store.dispatch("setSenderStatus",true);
            console.log(params)
            this.$router.push("/");
          } else if (this.$store.state.recipient==='receiver'){
            this.$store.dispatch("setReceiver",JSON.stringify(params));
            this.$store.dispatch("setSendCourier",false);
            this.$store.dispatch("setReceiverStatus",true);
            this.$router.push("/");
          }
        }
      }
    }
  }
</script>

<style scoped>
  ul{
    padding: 0;
    margin: 8px 0px;
  }
  li{
    width: 100%;
    height: 80px;
    margin-left: 5px;
    list-style: none;
    border-bottom: 1px solid lightgrey;
    margin-bottom: 10px;
    background-color: white;
  }
  #top,#bottom{
    width: 100%;
    height: 50%;
    /*border: 1px solid red;*/
    display: flex;
  }
  #name{
    width: 30%;
    /*border-right: 1px solid red;*/
  }
  #name,#tel{
    display: flex;
    align-items: center;
  }
  #name p,#tel p{
    font-size: 16px;
    font-weight: bold;
  }
  #address{
    width: 85%;
    /*border-right: 1px solid red;*/
  }
  #address p{
    font-size: 14px;
    text-align: left;
  }
  #address,#edit{
    display: flex;
    align-items: center;
  }
  p{
    margin: 0;
  }
</style>
