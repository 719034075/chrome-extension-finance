function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}


// table开始
function tableStart(){
    var table = '<table><tr><th>名称</th><th>时间</th><th>价格</th><th>涨跌</th></tr>';
    return table
}
// table追加数据
function tableAppend(table,data){
    // var hq_str_hf_GC="1637.280,,1637.600,1637.900,1645.600,1633.500,09:53:36,1643.200,1643.400,367612.000,2,2,2020-03-31,纽约黄金,11361";
    var reg = /(?<=").*?(?=")/;
    // 取出引号之间的内容
    data = data.match(reg);
    // 逗号分割转数组
    var list = data[0].split(",");

    var diff = (list[0]-list[7]).toFixed(2);
    console.log(list[0],list[7],diff)
    var delta = (diff*100 / list[7]).toFixed(2);
    // 追加入表格
    table += '<tr>';
    table += '<td>'+list[13]+'</td>';
    table += '<td>'+list[6]+'</td>';
    table += '<td>'+list[0]+'</td>';
    table += '<td>'+delta+'%</td>';
    table += '</tr>';

    return table;
}
// table结束
function tableEnd(table){
    table += '</table>';
    return table;
}
// 渲染table
function showTable(table){
    document.getElementById('table').innerHTML = table;
}

var GC = "hf_GC";
var SI = "hf_SI";
var base_url = 'http://hq.sinajs.cn/list=';

function render(){
    var table = tableStart();
    httpRequest(base_url+GC,function(result){
        table=tableAppend(table,result)
        httpRequest(base_url+SI,function(result){
            table=tableAppend(table,result)
            table=tableEnd(table)
            showTable(table)
        })
    })
}
render()