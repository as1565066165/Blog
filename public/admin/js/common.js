function serializeToJson(form) {
    var result = {};
    // [{name:'email',value:'用户输入的值'}]
    var f = form.serializeArray();
    f.forEach(function (item) {
        // result.emial
        result[item.name] = item.value;
    })
    return result;
}