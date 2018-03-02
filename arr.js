var splice = function (start, deletecount) {
    start = start || 0;
    deletecount = deletecount || this.length - 1;
    let a = [];
    let b = [];
    let c = [];
    for (let index = 0; index < this.length; index++) {
        let element = this[index];
        if (index < start) {
            a.push(element);
        }
        if (index > start + deletecount - 1) {
            c.push(element);
        }
    }
    let d = Array.from(arguments);
    for (let index = 2; index < d.length; index++) {
        const element = d[index];
        b.push(element);
    }
    let e = a.concat(b).concat(c);
    while (this.shift()) {
        this.shift();
    }
    for (let index = 0; index < e.length; index++) {
        const element = e[index];
        this.push(element);
    }
    return this;
}
var a = [1, 2, 3, 4]
splice.call(a, 1, 1, 1, 234, 45);




array = [
    {id: 1, value: '1', parent_id: null},
    {id: 2, value: '2', parent_id: null},
    {id: 3, value: '1-1', parent_id: 1},
    {id: 4, value: '1-2', parent_id: 1},
    {id: 5, value: '2-1', parent_id: 2},
    {id: 6, value: '2-2', parent_id: 2},
]
makeTree = function(array){
    let arr=[];
    var a=_.map(array,e=>{
    e.children=e.parent_id?null:[];
    if(e.children)  {
       e.children=e.children.concat(_.filter(array,x=>x.parent_id===e.id));
       arr.push({id:e.id,value:e.value,children:e.children});
        }
    })
    return arr;
}

var result=makeTree(array);
console.log(result)


