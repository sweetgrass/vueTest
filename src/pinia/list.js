import { defineStore } from 'pinia';
export const listStore = defineStore('list', {
    state:()=> {
        return {
            list: [
                { name: 'orange', type: 'fruit', price: 10, id: '001' },
                { name: 'banana', type: 'fruit', price: 8, id: '002' },
                { name: 'cookie', type: 'snap', price: 5, id: '003' }
            ]
        }
    },
    actions: {
        addItem(item) {
            this.list.push(item);
        }
    }
})