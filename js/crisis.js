var url = "user_page.html";
var mid = new URLSearchParams(window.location.search).get("mid");
var id = new URLSearchParams(window.location.search).get("id");
var hash = new URLSearchParams(window.location.search).get("hash");

var populate_crisis = function() {
	$.ajax({
        url: 'http://localhost:8080/herox/api/missions/' + mid,
        async: true,
        dataType: 'json',
        success: function (dataResponse) { 
			var mission = dataResponse;
			console.log(dataResponse);

			$("#title").html("<strong>" + mission.title + "</strong>");
            $("#compensation").html("Compensation: " + mission.compensation + "€");
            
            console.log(mission.missionStatus);
            var checkboxesString = "";
            var spec = mission.neededPowers.split(",");

            if(mission.missionStatus == "READY"){

                for (i = 0; i < mission.neededSpecs.length; i ++) {
                    checkboxesString += ('<div class="form-check"><input class="form-check-input" type="checkbox" value="unchecked"">'
                    + '<label class="form-check-label" for="flexCheckDefault">' + spec[i] + '</label></div>')
                    
                    $(checkboxesString).appendTo($("#checkboxes"));
                }


                $("#update").html("Claim mission")

                

                $("#description").html(mission.description);
                $("#maincall").html("People are dying. They need your help!");
                $("#secondarycall").html("Claim this mission now");

               
                $("#update").click(function() {
                    claim();
                });

            } else {
                
                $("#update").html("Complete mission");

                $("#maincall").html("This mission is already yours");
                $("#secondarycall").html("We hopefully await its completion");
                
                $("#update").click(function() {
                    updateStatus();
                });
                
            }
 
            
		
        },
        error: 
        function(response, status) {
            alert("Error: " + response);
        }
    });
}

var claim = function() {
    $.ajax({
        url: 'http://localhost:8080/herox/api/missions/' + id + '/claim/' + mid,
        type: "PUT",
        async: true,
        dataType: 'json',
        success: function () { 
			location.replace(url + "?id=" + id + "&hash=" + hash);
        },
        error: 
        function() {
            location.replace(url + "?id=" + id + "&hash=" + hash);
        }
    });

};

var updateStatus = function() {
    $.ajax({
        url: 'http://localhost:8080/herox/api/missions/' + mid,
        type: "PUT",
        async: true,
        dataType: 'json',
        success: function () { 
			location.replace(url + "?id=" + id + "&hash=" + hash);
        },
        error: 
        function() {
            location.replace(url + "?id=" + id + "&hash=" + hash);
        }
    });

};



populate_crisis();