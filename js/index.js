var movies_obj = JSON.parse(movies);

for (let i = 0; i < movies_obj.length; i++) {

    $("#cardContainer").append(`
		<div class="col-md-5 card mb-3 p-2 text-light" style="max-width: 540px; min-height: 300px; background-color: black;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${movies_obj[i].image}" class="card-img" alt="${movies_obj[i].title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${movies_obj[i].title}</h5>
                        <p class="card-text">${movies_obj[i].logline}</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        <div class="row ml-1">
                        	<span style="">Like</span>
                        	<button class="text-success mx-2 p-0" style="border: none; height: 0px; outline:none;"><span class="fas fa-thumbs-up text-success mx-2"></span></button>
                        	<p id="numLikes" class="mx-2 card-text" index="${i}">${movies_obj[i].likes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		`);
};

$(document).ready(function(){
	let likes_arr = [];

	$("#content").delegate("button", "click", function(){
		let index = $(this).siblings(".card-text").attr("index");
		movies_obj[index].likes++;
		$(this).siblings(".card-text").html(movies_obj[index].likes);
	});

	$("#sort").on("click", function(){
		for (let i = 0; i < movies_obj.length; i++) {
			let likes = movies_obj[i].likes;
			likes_arr[i] = [i, likes];
		}

		likes_arr.sort(function(a, b){
			return b[1] - a[1]
		});

		$("#cardContainer").html("");

		for (let i = 0; i < movies_obj.length; i++) {
			let index = likes_arr[i][0];
			$("#cardContainer").append(`
				<div class="col-md-5 card mb-3 p-2 text-light" style="max-width: 540px; min-height: 300px; background-color: black;">
            		<div class="row no-gutters">
                		<div class="col-md-4">
                    		<img src="${movies_obj[index].image}" class="card-img" alt="${movies_obj[index].title}">
                		</div>
                		<div class="col-md-8">
                    		<div class="card-body">
                        		<h5 class="card-title">${movies_obj[index].title}</h5>
                        		<p class="card-text">${movies_obj[index].logline}</p>
                        		<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    			<div class="row ml-1">
                    				<span style="">Like</span>
                    				<button class="text-success mx-2 p-0" style="border: none; height: 0px; outline:none;"><span class="fas fa-thumbs-up text-success mx-2"></span></button>
                    				<p id="numLikes" class="mx-2 card-text" index="${index}">${movies_obj[index].likes}</p>
                    			</div>
                    		</div>
               		 	</div>
            		</div>
        		</div>
			`);
		}
	})

});