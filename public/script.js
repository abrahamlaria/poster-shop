const PRICE = 9.99;

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        newSearch: '90s',
        lastSearch: '',
        loading: false,
        price: PRICE
    },
    methods: {
        onSubmit: function() {
            this.items = [];
            this.loading = true;
            this.$http
                .get('/search/'.concat(this.newSearch))
                .then(function (res) {
                    this.lastSearch = this.newSearch;
                    this.items = res.data;
                    this.loading = false;
                })
            ;
        },
        addItem: function (index) {
            this.total += 9.99;
            let item = this.items[index];
            let found = false;
            for (let index of this.cart) {
                if(index.id === item.id) {
                    found = true;
                    index.qty++;
                    break;
                }
            }
            if(!found) {
                this.cart.push({
                id: item.id,
                title: item.title,
                qty: 1,
                price: PRICE
            });
            }           
        },
        inc: function(item) {
            item.qty++;
            this.total += PRICE;
        },
        dec: function(item) {
            item.qty--;
            this.total -= PRICE;
            if (item.qty <= 0) {
                for(let index of this.cart) {
                    if (index.id === item.id) {
                        this.cart.splice(index, 1);
                        break;
                    }
                }
            }
        }
    },
    filters: {
        currency: price => {
            return '$'.concat(price.toFixed(2));
        }
    },
    mounted: function() {
        this.onSubmit();
    }
});
