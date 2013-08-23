//Matthew Lewis
//Advanced Visual Frameworks Term: 1308
//App Javascript file

document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {

	//all critical event listeners added here so they only fire AFTER device is ready
	$("#takePicture").on("click", takePicture);
	$("#geoCheck").on('click', geoLock);
	$(".settingsButton").on('click', formatPanel);
	// window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
	

 //    function onFileSystemSuccess(fileSystem) {
 //        //alert("Filesystem name is " +fileSystem.name);
 //       // alert("Root directory name is " +fileSystem.root.name);
 //    }

 //    function fail(evt) {
 //        //alert(evt.target.error.code);
 //    }

}

$('#home').on('pageinit', function(){
var flickrEnabled = false;
var instagramEnabled = false;
var fullPhoto = "";

});

//need to refresh listview for user images EVERY time the page loads or styling isn't correct.
$('#pictures').on('pageshow', function(){
	$('#localUL').trigger('create');
	//$('#localUL').listview('refresh');
});

var takePicture = function() {
	//create variable to allow user to set image quality
	var qual = $("#qualitySlider").val();
	//call native camera to take picture
	navigator.camera.getPicture(onSuccess, onFail, { quality: qual,
	    destinationType: Camera.DestinationType.FILE_URI });

	function onSuccess(imageURI) {
		alert("Picture Taken!  Tap the 'View' link at the bottom.");
	    //var image = "<div data-role='ui-block-" + blockHolder[imageBlock] +"'><img src='" + imageURI + "' width='150' height='150' /></div>";
	    //alert(image);
	    //alert(blockHolder.length);
	    //alert("current block is " + blockHolder[imageBlock]);
	    var image = "<li class='usrImg'><a href=#popupMenu data-rel='popup' id=" + imageURI + ">" + "<img src='" + imageURI + "' width='150' height='150' /> " +  "Untitled Picture " + imageCount + "</a><section class='renameSection' id='UntitledPicture" + imageCount +"'><h3>Rename picture:</h3><input type='text' id='" + imageURI + "' name='pictureEdit' /><a href='#' data-role='button' data-icon='check'>Edit title</a></section></li>";
	    //alert(image);
	    imageCount ++;
	    $("#localUL").append(image);
	    $("#localUL").listview('refresh');
	    };
	

	function onFail(message) {
	    alert('Failed because: ' + message);
	}


};

$("#instagramSubmit").on("click", function(){
	var login = "https://instagram.com/oauth/authorize/?client_id=fb8ea4f7741a454e973d50bb434b7bda&redirect_uri=https://127.0.0.1&response_type=token";
	
});

var showLogin = function(data) {
	console.log(data);
}

$("#serviceChoose").on('change', function(){
		
		if ($("#serviceChoose").val() == "instagram") {
			$("#instagramForm").slideDown();
			$("#flickrForm").slideUp();
		}
		if ($("#serviceChoose").val() == "flickr") {
			$("#instagramForm").slideUp();
			$("#flickrForm").slideDown();
		}
});

$("#searchChoose").on('change', function(){
		
		if ($("#searchChoose").val() == "instagram") {
			$("#flickrSearchSection").slideUp();
			$("#instagramSearchSection").slideDown();
		}
		if ($("#searchChoose").val() == "flickr") {
			$("#instagramSearchSection").slideUp();
			$("#flickrSearchSection").slideDown();
		}
});

$("#takePicture").on("click", function() {
	//this function will (eventually)check that the user has validated their account(s) within the settings menu, as well as 
	//checked the boxes to tell the program where to upload the photos to.  Will set the variables "instagramEnabled" and
	//"flickrEnabled" to true once the user has valid credentials entered.
	
});

$("#instagramSearchSubmit").on("click", function() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
		function onSuccess(position){
			// alert(' Your latitude is : '    + position.coords.latitude          + '\n' +
   //      	' Your longitude is: '         + position.coords.longitude         + '\n');
		var currentLatitude = position.coords.latitude.toFixed(2);
		var currentLongitude = position.coords.longitude.toFixed(2);
		
		alert("Your current lat is: " + currentLatitude + "and saved lat is: " + homeLatitude);
		alert("Your current long is: " + currentLongitude + "and saved long is: " + homeLongitude);
		if (currentLatitude != homeLatitude || currentLongitude != homeLongitude){
				internetBlock = "on";
				alert("Internet block is activated!");
				$("#networkError").slideDown();
			}else{
				internetBlock = "off"
				instaSearch();
			}
		};
		
		function onError(error) {
			alert("Could not get position because: " +error);
		}
});
var instaSearch = function() {		
	var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

           

           	//run code to ensure the device has an internet connection before allowing a search!!!
			
           		if (states[networkState] == 'No network connection') {
           			//alert("NETWORK!");
           		$("#networkError").slideDown();
           		//alert("No network connection!");
           	} else {
           		$("#networkError").slideUp();
				var term = $("#instagramSearch").val();
				$("#instagram-ul").empty();
				//console.log($("#instagramSearch").val());
				if(term !== "") {
					var url = "https://api.instagram.com/v1/tags/" + term + "/media/recent?callback=?&amp;client_id=fb8ea4f7741a454e973d50bb434b7bda&amp:min_id=10";	
					$.ajax({
						type: 'GET',
						dataType: "json",
						url: url,
						timeout: 5000,
						error: function() {
							alert("No images found or search parameters were incorrect! Please refine your search...");
							document.location.reload();
						},
						success: function(info) {
							//console.log(data);
							console.log(info);
							if (info.data.length == "0") {
								alert("No images found! Please refine your search...");
							} else {
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
							};	
						//$.mobile.activePage.trigger("refresh");
						}
						
					});

					//$.getJSON(url, showInstagramResults)
				} else {
					alert("Please choose a topic to search!");
				}
			};
};

$("#flickrSearchSubmit").on("click", function() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
		function onSuccess(position){
			// alert(' Your latitude is : '    + position.coords.latitude          + '\n' +
   //      	' Your longitude is: '         + position.coords.longitude         + '\n');
		var currentLatitude = position.coords.latitude.toFixed(2);
		var currentLongitude = position.coords.longitude.toFixed(2);
		alert("Your current lat is: " + currentLatitude + "and saved lat is: " + homeLatitude);
		alert("Your current long is: " + currentLongitude + "and saved long is: " + homeLongitude);


		if (currentLatitude != homeLatitude || currentLongitude != homeLongitude){
				internetBlock = "on";
				alert("Internet block is activated!");
				$("#networkError").slideDown();
			}else{
				internetBlock = "off"
				flickrSearch();
			}
		};
		
		function onError(error) {
			alert("Could not get position because: " +error);
		}

});

var flickrSearch = function() {
	var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            

            //same code as above...checks for internet connection before doing a search and provides feedback to the user if necessary
            if (states[networkState] == 'No network connection') {
           		alert("No network");
           		$("#networkError").slideDown();
           	} else {
           		$("#networkError").slideUp();
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
			};
};


var geoLock = function() {
	if($("#geoCheck").is(':checked')){
		alert("Geo Lock ON!");
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
		function onSuccess(position){
			alert(' Your latitude is : '    + position.coords.latitude          + '\n' +
        	' Your longitude is: '         + position.coords.longitude         + '\n');
		homeLatitude = position.coords.latitude.toFixed(2);
		homeLongitude = position.coords.longitude.toFixed(2);
		}
		function onError(error){
			alert(error);
		}
	} else {
		internetBlock = 'off';
		alert("Geo Lock OFF");
		navigator.geolocation.clearWatch(watchId);
	}
};

//the below code allows me to fire an event listener on the dynamically created anchor tags (allows the popup dialog boxes on the image buttons)
$(document.body).on("click", ".picLinks", function(event){
   var title = $(this).children("div").children("div").children('a').attr("id");
   var object = $(this).children("div").children("div").children('a');
    
    $("#imageHolder").children("img").remove();
    event.preventDefault();
   	var fullPhoto = "<img src = " + ($(this).children("div").children("div").children('a').attr("id")) + ">";
   	$("#imageHolder").append(fullPhoto);
   	$.mobile.changePage("#detailView");
   //add event listener to change title button to allow user to assign a new name
   
});
//code to create edit functionality on the popup window's "edit" button, which targets the individual image
$(document.body).on("click", ".userEditLinks", function(event){
   event.preventDefault();
   //slide up any "edit sections" already open
   $(".renameSection").slideUp();
   var temp = "#" + currentSection;
  	$(temp).slideDown();
   //close popup
   $("#popupMenu").popup("close");
   //add event listener to "edit title" button
   $(temp).children("a").on("click", function() {
   		var oldInstance = $(temp).parents('li');
   		var newTitle = $(temp).find('input').val();
   		var oldTitle = $(temp).parents('li').children('div').children('div').children('a');
   		var oldImageSrc = $(temp).parents('li').find('img').attr("src");
   		var newInstance = $(oldTitle).html("<img src='" + oldImageSrc + "' width='150' height='150' class='ui-li-thumb'>" + newTitle);
   		$(temp).slideUp();
   });
});

//listener function that allows a user to delete an image taken (which really just removes it's instance from the 'viewable' document making it inaccessible).
$(document.body).on("click", ".userDeleteLinks", function(event) {
	var selected = "#" + currentSection;
	var selectedTitle = $(selected).parents('li').children('div').children('div').children('a').text();
	var deleteLi = $(selected).parents('li');
	//confirm("Are you sure you want to delete the image: " + selectedTitle + "?  This cannot be undone!");
	if(confirm("Are you sure you want to delete the image: " + selectedTitle + "?  This cannot be undone!")) {
		var location = currentImage.substring(7);
		$(currentLi).remove();
		//the below code is responsible for deleting locally stored files on Android, since it automatically saves them to a cache folder on the device
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		function gotFS(fileSystem){
			fileSystem.root.getFile(location, {create: false, exclusive: false}, success, fail);
		}
		
		function success(file){
			file.remove(removeSuccess, removeFail);
		}

		function fail(error) {
			alert("Couldn't get access to filesystem because: " +error.code);
		}

		function removeSuccess(entry) {
			//try out a simple system notification
			navigator.notification.alert(
    			'Picture deleted Successfully!',  
    			alertDismissed,         
    			'Delete a picture',            
    			'Okay'                  
			);

		}
		function removeFail(error) {
			alert("File was ultimately not removed because: " + error);
		}

		function alertDismissed(){
			//vibrate doesn't seem to work on android...hrrmmm.
			navigator.notification.vibrate(500);
		};

		$('#localUL').trigger('create');
		$('#localUL').listview('refresh');
		$("#popupMenu").popup("close");
	} else {
		alert("File Saved!");
		$("#popupMenu").popup("close");
	};

});

$(document.body).on("click", ".userPicLinks", function(event){
   $(".renameSection").slideUp();
   $("#imageHolder").children("img").remove();
    event.preventDefault();
   	var fullPhoto = "<img src = " + currentImage + ">";
   	$("#imageHolder").append(fullPhoto);
   	$.mobile.changePage("#detailView");
   
});

//the below function sets a global variable everytime the user opens a picture's option menu therefore setting the full screen pic if they want to view it.
$(document.body).on("click", ".usrImg", function(event){
	//$(".renameSection").slideUp();
	$("#localUL").listview('refresh');
   currentImage = $(this).children("div").children("div").children('a').attr("id");
   currentSection = $(this).children("div").children("div").children('section').attr("id");
   currentLi = $(this);
});
//below function runs whenever the user opens the side panel to check their connectivity.  This updates the graphics in the
//	side panel to reflect device conditions. 
var formatPanel = function() {
	var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

	//update lock icon and text
	if(internetBlock == "on"){
		$(".lockIcon").attr("src", "img/lock.png");
		$(".lockText").text('Enabled');
	} else {
		$(".lockIcon").attr("src", "img/unlock.png");
		$(".lockText").text("Disabled");
	};
	if(states[networkState] == 'No network connection'){
		$(".networkIcon").attr("src", "img/x.png");
		$(".networkText").text('Disconnected');
	} else {
		$(".networkIcon").attr("src", "img/check.png");
		$(".networkText").text(states[networkState]);
	};
};


var imageCount = 0;
var imageHolder = [$("#localImages")];
var currentImage;
var currentSection;
var currentLi;
var homeLatitude;
var homeLongitude;
var internetBlock = "off";
var watchId;
