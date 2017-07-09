// DISPLAYING THE MOST RECENT READING

$("button#get-reading").on("click", function(){

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
			$('#display-info').html("The most recent pressure reading is " + readingVal + "millibars." + 
				"\nThe reading was taken at " + readingTime + ".")
		},
		error: function(jqXHR, status, err){
			console.log(err)
		}
	})

})


// CHARTING THE 5 MOST RECENT READINGS

let ctx1 = $("#chart1");

let myChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ["T-4", "T-3", "T-2", "T-1", "T"],
        datasets: [{
            label: '5 most recent readings from my Raspberry Pi',
            data: [0, 0, 0, 0, 0],
            backgroundColor:'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
        }]
    },
    options: {
    	showLines: true,
    	elements: {
    		line: {
    			tension: 0
    		}
    	}
    }
});


$("button#get-chart").on("click", function(){

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
			let observations = data['value'];
			console.log(observations);

			let readings = [];
			let times = [];
			for (let i = 0; i < observations.length; i++){
				readings.push(Number(observations[i]['result']))
				times.push(observations[i]['phenomenonTime'])
			}

			myChart1.data.datasets[0].data = readings.reverse();
			myChart1.data.labels = times.reverse();
			myChart1.update();
		},
		error: function(jqXHR, status, err){
			console.log(err)
		}
	})

})



