$("button").on("click", function(){

	let URL = "http://scratchpad.sensorup.com/OGCSensorThings/v1.0";
	let datastreamID = 943987;
	let queryURL = URL + "/Datastreams(" + 
		String(datastreamID) + ")/Observations?" + 
		"$top=5" + "&" + 
		"$select=result,phenomenonTime";

	$.ajax({
		url: queryURL,
		method: "GET",
		crossDomain: true,
		success: function(data, status, jqXHR){
			console.log(data);
			let readingTime = data['value'][0]['phenomenonTime'];
			let readingVal = data['value'][0]['result'];
			$('#display').html("The most recent pressure reading is " + readingVal + "millibars." + 
				"\nThe reading was taken at " + readingTime + ".")
		},
		error: function(jqXHR, status, err){
			console.log(err)
		}
	})

})