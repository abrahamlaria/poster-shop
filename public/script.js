const PRICE = 9.99;
new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            {id: 1, title: 'Item1'},
            {id: 2, title: 'Item2'},
            {id: 3, title: 'Item3'}
        ],
        cart: []
    },
    methods: {
        addItem: function (index) {
            this.total += 9.99;
            let item = this.items[index];
            let found = false;
            for (let index of this.cart) {
                if(index.id === item.id) {
                    found = true;
                    index.qty++;
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
        }
    }
});
