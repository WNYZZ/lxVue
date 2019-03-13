var vm = new Vue({
    el: '#app',
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        delFlag: false,
        curProduct: ''
    },
    filters:{//过滤器
        formatMoney: function (value) {
            return "￥ " + value.toFixed(2);
        },
        Money: function (value) {
            return "￥ " + value.toFixed(2) +"元";
        }
    },
    mounted: function(){//页面渲染完成后方法
        this.carView();
    },
    methods:{
        carView: function () {
            console.log('进入');
            var _this = this;
            this.$http.get('data/cartData.json',{"id":123}).then(function (res) {
                _this.productList = res.body.result.list;

            });
        },
        changeMoney: function (product, way) {
            if(way > 0 ){
                product.productQuantity++;

            }else{
                if(product.productQuantity > 1){
                    product.productQuantity--;
                }

            }
            this.calcTotalPrice();
        },
        selectPro: function (item) {
            if(typeof item.checked == 'undefined'){
                //Vue.set(item, "checked", true);
                this.$set(item, "checked", true);
            }else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll:function (flag) {

                this.checkAllFlag =  flag;
                var _this = this;
                    this.productList.forEach(function (item, index) {
                        if(typeof item.checked == 'undefined'){
                            _this.$set(item, "checked",  _this.checkAllFlag);
                        }else{
                            item.checked = _this.checkAllFlag;
                        }
                    });
            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            var _this = this;
            _this.totalMoney = 0;
            this.productList.forEach(function (item, index) {
                if(item.checked){
                    _this.totalMoney += item.productPrice*item.productQuantity;
                }
            })
        },
        delConfirm: function (item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function () {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag = false;

        }
    }
})


