// Add the following code if you want the name of the file appear on select
$(".custom-file-input").on("change", function () {
	var fileName = $(this).val().split("\\").pop();
	$(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

$(function () {
    $("#frm").change(function () {
        $("form#frm").submit();
    });
});

function onClickBox() {
    var arr = $('.box').map(function () {
        return this.checked;
    }).get();
    localStorage.setItem("checked", JSON.stringify(arr));
}

$(document).ready(function () {
    var arr = JSON.parse(localStorage.getItem('checked')) || [];
    arr.forEach(function (checked, i) {
        $('.box').eq(i).prop('checked', checked);
    });

    $(".box").click(onClickBox);
});

function Download(id) {
    window.open('/dataset/download/'+id)
}
