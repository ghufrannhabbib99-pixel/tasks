console.log("js is connected");


const numbers=[10,20,30,40,50];
const sum=numbers.reduce((total,num)=>total+num,0);
console.log(sum);

const cartitems=[
    {name:'book',price:200},
    {name:'pen',price:20},
    {name:'pencil',price:10},
]
const total=cartitems.reduce((sum,item)=>sum+item.price,0);
console.log(total);