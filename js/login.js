var url = "user_page.html"
var user_id;

var login = function(){
    var login = $('#loginInput').val();
    var password = $('#passwordInput').val();

    $.ajax({
        url: 'http://localhost:8080/herox/api/login?login=' + login + '&password=' + password,
        async: true,
        dataType: 'json',
        success: function (dataResponse) {
			user_id = dataResponse.id; 
            hash = dataResponse.hash;
            location.replace(url + "?id=" + user_id + "&hash=" + hash);
        },
        error: 
        function() {
            alert("We're sorry, aparently working for a super hero doesn't give you super memory. Try again! ");
        }
    });

}

$('#submit_btn').click(function() {
	login();
});

