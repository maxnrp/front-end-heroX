var user_id = new URLSearchParams(window.location.search).get("id");
var hash = new URLSearchParams(window.location.search).get("hash");
var url= "crisis.html";

console.log(user_id);

var populate_header = function(){
    $.ajax({
        url: 'http://localhost:8080/herox/api/' + user_id + "?hash=" + hash,
        async: true,
        dataType: 'json',
        success: function (dataResponse) { 
			var user = dataResponse;
			console.log(dataResponse);

			// clean header html
			$("#header").html('');

			// populate header
            $("#header").html(
				'<div id="header_logo_container"><img class="logo" src="' + user.imageUrl + '"/></div>'
				+ '<div id="header_description_container"><h2 class="white-text"><strong>' + user.name + '</strong></h2>'
				+ '<h5 class="white-text">' + user.catchPhrase + '</h5></div><div id="header_menu_container">'
			);
			
			// clean hero html
			$(".hero_container").html('');

			// populate hero
			$(".hero_container").html(
				'</div><div id="hero_card_text"><h3 class="white-text"><strong>' + user.hero.name + '</strong></h3>'
				+ '<h4 class="white-text"><strong>Abilities > </strong>' + user.hero.powers + '</h4></div>'
			);
		
        },
        error: 
        function() {
            location.replace("index.html");
        }
    });

}

var populate_missions = function() {
	$.ajax({
        url: 'http://localhost:8080/herox/api/missions',
        async: true,
        dataType: 'json',
        success: function (dataResponse) { 
			var missions = dataResponse;
			var missionButtons = "";
			console.log(dataResponse);

			$(".available_buttons_container").html("");

			for (i = 0; i < missions.length; i ++) {
				var mid = missions[i].id;
				missionButtons += ('<div class="mission_container"><p class="mission_text" id="mission' + mid + '_text">' + missions[i].title + '</p>'
					+ '<img src="' + missions[i].imgUrl + '" onclick="replace_page(' + mid + ')" class="mission" id="mission23_button"></img></div>')

				if((i + 1) % 3 == 0){
					missionButtons += "<p></p>";
				}

			}

			$(missionButtons).appendTo($(".available_buttons_container"));
		
        },
        error: 
        function(response, status) {
            alert("The world is a messy place, so are our servers right now. Please refresh the page or try again later.");
        }
    });
}

var populate_ongoing_missions = function() {
	$.ajax({
        url: 'http://localhost:8080/herox/api/' + user_id + '/missions',
        async: true,
        dataType: 'json',
        success: function (dataResponse) { 
			var missions = dataResponse;
			var missionButtons = "";
			console.log(dataResponse);

			if (missions.length == 0) {
				$("#ongoing_missions").html("");
			}

			$(".ongoing_buttons_container").html("");

			for (i = 0; i < missions.length; i ++) {
				var mid = missions[i].id;
				if (missions[i].missionStatus != "DONE") {
					missionButtons += ('<div class="mission_container"><p class="mission_text" id="mission' + mid + '_text">' + missions[i].title + '</p>'
					+ '<img src="' + missions[i].imgUrl + '" onclick="replace_page(' + mid + ')" class="mission" id="mission23_button"></img></div>')
				}
				else {
					$("#ongoing_missions").html("");
				}
				
			}

			$(missionButtons).appendTo($(".ongoing_buttons_container"));
		
        },
        error: 
        function(response, status) {
            alert("Error: " + response);
        }
    });
}

var replace_page = function(mid) {
	location.replace(url + "?mid=" + mid + "&id=" + user_id + "&hash=" + hash);
}

populate_header();
populate_missions();
populate_ongoing_missions();