// holds movie objects
var movies_obj = JSON.parse(movies);
// iterates through movies_obj and displays them
for (let i = 0; i < movies_obj.length; i++) {
	// each movie is being put in its own card
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
	//holds # of likes for each movie (used to sort movies)
	let likes_arr = [];
	// if the like btn on a movie is pressed, adds like to corresponding likecounter
	$("#content").delegate("button", "click", function(){
		// saves movie's index from movie_obj
		let index = $(this).siblings(".card-text").attr("index");
		//adds 1 like
		movies_obj[index].likes++;
		//displays new # of likes
		$(this).siblings(".card-text").html(movies_obj[index].likes);
	});
	//when sort btn is pressed
	$("#sort").on("click", function(){
		//save # of likes and each movie's index
		for (let i = 0; i < movies_obj.length; i++) {
			let likes = movies_obj[i].likes;
			likes_arr[i] = [i, likes];
		}
		//sort function to sort movies by # of likes (most to least)
		likes_arr.sort(function(a, b){
			return b[1] - a[1]
		});
		//clear movie cards
		$("#cardContainer").html("");
		//print movie cards in order
		for (let i = 0; i < movies_obj.length; i++) {
			//saves index of sorted array to display in sorted order (movies_obj doesn't change)
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