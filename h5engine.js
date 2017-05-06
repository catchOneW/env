// var tpl = '<p>Hello, my name is <%name%>. I\'m <%age%> years old.</p>';
// //处理字符串最直接的方式就是 ---正则(底层肯定有牛逼算法在支撑),有规则的字符串{{}},<>，都是方便正则匹配的！方便替换内容的
// var re = /<%([^%>]+)?%>/g;
// // while(match = re.exec(tpl)) {
// //     console.log(match);
// // }
// var TemplateEngine = function(tpl, data) {
//     var re = /<%([^%>]+)?%>/g;
//     while(match = re.exec(tpl)) {
//         //match[0]=><%name%>=><%this.name%>
//         //data[match[1]]=>data[name]=>data[this.name]
//         tpl = tpl.replace(match[0], data[match[1]])
//     }
//     return tpl;
// }

// var TemplateEngine = function(tpl, data) {
//     var re = /<%([^%>]+)?%>/g,
//         code = 'var r=[];\n',
//         cursor = 0;
//     // var add = function(line) {
//     //     code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
//     // }
//     //把html代码里的<%%>去掉，同时分离出需要赋值的地方
//     // while(match = re.exec(tpl)) {
//     //     add(tpl.slice(cursor, match.index));//<p>Hello, my name is     
//     //     add(match[1]);//this.name这里的双引号要去掉
//     //     cursor = match.index + match[0].length;//这个算法可以啊，<p>Hello, my name is +<%this.name%>
//     // }
    

// var add = function(line, js) {
//     js? code += 'r.push(' + line + ');\n' ://这个就不加引号
//         code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
// }
// while(match = re.exec(tpl)) {
//     add(tpl.slice(cursor, match.index));
//     add(match[1], true); // <-- say that this is actually valid js
//     cursor = match.index + match[0].length;
// }
//     add(tpl.substr(cursor, tpl.length - cursor));//最后的尾巴 years old.</p>
//     code += 'return r.join("");'; // <-- return the result
//     console.log(code);
//     return tpl;
// }
// var template = '<p>Hello, my name is <%this.name%>. I\'m <%this.profile.age%> years old.</p>';
// console.log(TemplateEngine(template, {
//     name: "Krasimir Tsonev",
//     profile: { age: 29 }
// }));



var TemplateEngine = function(html, options) {
    var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    console.log(code);//一切的思路就是为了，把字符串和代码分开装入数组，用字符串构造一个函数后，函数运行后生成一个html代码！
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
}
var template = 
'My skills:' + 
'<%if(this.showSkills) {%>' +
    '<%for(var index in this.skills) {%>' + 
    '<a href="#"><%this.skills[index]%></a>' +
    '<%}%>' +
'<%} else {%>' +
    '<p>none</p>' +
'<%}%>';
console.log(TemplateEngine(template, {
    skills: ["js", "html", "css"],
    showSkills: true
}));

//所以说代码设计这些{ }都是很有用的！

//。用正则做模板引擎最大的问题是:如果语法写错了你根本检查不出来问题在哪。
//比如、等等。当出现这种情况使用者不得不花费大量的视觉来手动检查错误。
//所以做模板引擎还是老老实实的用语法分析和词法分析那套吧，没有这些做不了报错的，也只能是玩具。