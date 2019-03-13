new Vue({
   el: '.container',
    data: {
       limitNumber: 3,
        isAll: false,
        addressList: [],
        currentIndex: 0,//选择索引默认0
        shipingMethod: 1
    },
   mounted: function () {
            this.$nextTick(function () {
               this.getAddressList();
            })
   },
    computed: {
       filterAddress: function() {
            return this.addressList.slice(0, this.limitNumber);//slice 检索数组返回全新数组
       }
    },
    methods: {
        getAddressList: function () {
            var _this = this;
            this.$http.get("data/address.json").then(function (respone) {
                    var res = respone.data;
                    console.log(res);
                    if(res.status == "0"){
                        _this.addressList = res.result;
                    }
            });
        },
        clickMore:function () {
            this.isAll = !this.isAll;
            if(this.isAll){
                this.limitNumber = this.addressList.length;
            }else{
                this.limitNumber = 3;
            }

        },
        setDefault: function (addressId) {
            this.addressList.forEach(function (address, index) {
                if(address.addressId == addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            })
        }
    }

});
