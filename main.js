//A Random User model
var User = Backbone.Model.extend({
	defaults: {
		fname: '',
		lname: '',
		whatYear: '',
		city: '',
		address: '',
		cell: '',
		email: '',
		profPic: '',
		following: '',

	}
});



//Random users collection
var Users = Backbone.Collection.extend({});
var AllUsers = new Users([]);



$(document).ready(function() {

	$('#addCard').on('click', function() {

		var req = $.ajax({
			url: 'http://api.randomuser.me/?nat=gb',
			dataType: 'json'
		});

		//};
		//err function
		var err = function(req, status, err) {
			console.log("something went wrong!")
		};

		//the promise
		req.then(function(resp) {

			storeCard(resp);

		}, err);
	})
});


function storeCard(a) {

	// improved
	var userData = a.results[0];
	// If you see the same shit repeating itself over and over,
	// you can put it into a holder variable and then reference,
	// that each time. It just makes much much cleaner code.
	var user1 = new User({
		fname: userData.name.first,
		lname: userData.name.last,

		whatYear: (function() {
			return moment.unix(userData.registered).format("YYYY");
		})(),

		city: userData.location.city,
		address: userData.location.street,
		cell: userData.cell,
		email: userData.email,
		profPic: userData.picture.large,

		following: (function() {
			return Math.floor(Math.random() * (320 - 80)) + 80;
		})()
	});

	AllUsers.push(user1);
	console.log(AllUsers);


	$(".descriptionWrapper").last().queue(function(after) {
		$(this).fadeIn('slow', function() {});
		after();
	});

	$(".friendSection").last().queue(function(then) {
		$(this).fadeIn('slow', function() {});
		then();
	});


	$(".profilePic").delay(30).load(function() {
		// Handler for .load() called. 
		$('.profilePic').last().queue(function(next) {
			$(this).addClass("morphAdd");
			next();
		});;

	});

}



//Backbone view for card

var CardView = Backbone.View.extend({
	model: new User(),
	tagName: 'div',


	initialize: function() {

		this.template = _.template($('.card-template').html());

	},

	events: {
		'click .deleteUser': 'deleteCard'

	},

	deleteCard: function() {

		var target = $(event.target).parent();
		$(target).fadeOut('slow', function() {});

		var _this = this;
		setTimeout(function() {
			_this.model.destroy();
			$(".descriptionWrapper").css("display", "flex");
			$(".friendSection").css("display", "flex");
		}, 1000);


	},



	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});



//Backbone view for  all cards

var AllCardsView = Backbone.View.extend({
	model: AllUsers,
	el: $('.cardWrapper'),
	initialize: function() {

		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30)
		}, this);
		this.model.on('remove', this.render, this)
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(user) {
			//after fade in description text stays
			$(".descriptionWrapper").css("display", "flex");
			$(".friendSection").css("display", "flex");
			//
			self.$el.append((new CardView({
				model: user
			})).render().$el);
		});


	}
});
//instantiate view for all cards
<<<<<<< HEAD
var AllUserCardsView = new AllCardsView([]);
=======
var AllUserCardsView = new AllCardsView([]);



>>>>>>> a1cbab6dc899fab80dd7739c98dfd353c91f839f
