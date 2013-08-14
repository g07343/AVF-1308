//Matthew Lewis
//Advanced Visual Frameworks Term: 1308
//Android javascript file

$('#home').on('pageinit', function(){
var flickrEnabled = false;
var instagramEnabled = false;
var fullPhoto = "";


});

$("#instagramSubmit").on("click", function(){
	var login = "https://instagram.com/oauth/authorize/?client_id=fb8ea4f7741a454e973d50bb434b7bda&redirect_uri=https://127.0.0.1&response_type=token";
	
});

var showLogin = function(data) {
	console.log(data);
}

$("#serviceChoose").on('change', function(){
		
		if ($("#serviceChoose").val() == "instagram") {
			$("#instagramForm").css("display", "block");
			$("#flickrForm").css("display", "none");
		}
		if ($("#serviceChoose").val() == "flickr") {
			$("#instagramForm").css("display", "none");
			$("#flickrForm").css("display", "block");
		}
});

$("#searchChoose").on('change', function(){
		
		if ($("#searchChoose").val() == "instagram") {
			$("#instagramSearchSection").css("display", "block");
			$("#flickrSearchSection").css("display", "none");
		}
		if ($("#searchChoose").val() == "flickr") {
			$("#instagramSearchSection").css("display", "none");
			$("#flickrSearchSection").css("display", "block");
		}
});

$("#takePicture").on("click", function() {
	//this function will (eventually)check that the user has validated their account(s) within the settings menu, as well as 
	//checked the boxes to tell the program where to upload the photos to.  Will set the variables "instagramEnabled" and
	//"flickrEnabled" to true once the user has valid credentials entered.
	
});

$("#instagramSearchSubmit").on("click", function() {
	var term = $("#instagramSearch").val();
	$("#instagram-ul").empty();
	//console.log($("#instagramSearch").val());
	if(term !== "") {
		var url = "https://api.instagram.com/v1/tags/" + term + "/media/recent?callback=?&amp;client_id=fb8ea4f7741a454e973d50bb434b7bda&amp:min_id=10";	
		$.ajax({
			type: 'GET',
			dataType: "json",
			url: url,
			timeout: 2000,
			error: function() {
				alert("No images found! Please refine your search...");
				document.location.reload();
			},
			success: function(info) {
				//console.log(data);
				$.each(info.data, function(index, photo){
					if (photo.caption != null) {
						if (photo.caption.text != null) {
							var title = photo.caption.text;
						}
						} else {
							var title = "";
						}
						var pic = "<li class='picLinks'><a href=#detailView id=" + photo.images.standard_resolution.url + ">" + "<img src='" + photo.images.thumbnail.url + "' > '" + title + "</a></li>";
						$("#instagram-ul").append(pic);
						$("#instagram-ul").listview('refresh');
				});
			//$.mobile.activePage.trigger("refresh");
			}
			
		});

		//$.getJSON(url, showInstagramResults)
	} else {
		alert("Please choose a topic to search!");
	}
});

$("#flickrSearchSubmit").on("click", function() {
	var term = $("#flickrSearch").val();
	$("#flickr-ul").empty();
	//console.log($("#instagramSearch").val());
	if(term !== "") {
		var url = "http://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=dcd118bdd36ff7226ddde37bbdb8e027&tags=" + term + "&format=json&jsoncallback=?&per_page=20";
		$.ajax({
			type: 'GET',
			dataType: "json",
			url: url,
			timeout: 2000,
			success: function(info) {
				//console.log(data);
				if (info.photos.photo.length == "0") {
					alert("No images found! Please refine your search...");
					console.log(info.photos.total);
				} else {
					$.each(info.photos.photo, function(index, picture){
					//console.log(index);
						var imageSource = "http://farm" + picture.farm + ".static.flickr.com/" + picture.server + "/" + picture.id + "_" + picture.secret + ".jpg";
						var imageHolder = "<li class='picLinks'><a href=#detailView id=" + imageSource + ">" + "<img src='" + imageSource + "'height=150 width=150> '" + picture.title + "</a></li>";
						$("#flickr-ul").append(imageHolder);
						$("#flickr-ul").listview('refresh');
						//console.log(imageSource);
					});
				}
			}
			
		});
	} else {
		alert("Please choose a topic to search!");
	}
});

//the below code allows me to fire an event listener on the dynamically created anchor tags
$(document.body).on("click", ".picLinks", function(event){
    //fullPhoto = $(this).children("a").attr("id");
    $("#detailView").children("img").remove();
    event.preventDefault();
   	fullPhoto = "<img src = " + ($(this).children("div").children("div").children('a').attr("id")) + ">";
   	//header = '<div data-role="header" data-theme="b" data-add-back-btn="true"><h1>View full size</h1></div>';
   	$("#detailView").append(fullPhoto);
   	$.mobile.changePage("#detailView");
    


});


