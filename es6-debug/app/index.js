//并行串行的关键在于Promise的使用，aj也封装了
//es6可以直接运行打断点没效果,必须配置才能调试,chrome插件就是能配个端口f5自动打开浏览器啊，没什么暖用
var a=new Promise(function(resolve,reject){
  console.log(111111)
  resolve(1);
})
a.then(function(res){
  console.log(2222)
},function(err){

})
var b=4564654;
console.log(b);