
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
  	profPic: ''

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
var err = function( req, status, err ) {
  console.log("something went wrong!")
};

//the promise
req.then(function(resp) {

  storeCard(resp);


}, err);
})
});


function storeCard(a) {

var user1 = new User({

	 	fname: a.results[0].name.first,
	 	lname: a.results[0].name.last,
  	whatYear: a.results[0].registered,
  	city: a.results[0].location.city,
  	address: a.results[0].location.street,
  	cell: a.results[0].cell,
  	email: a.results[0].email,
  	profPic: a.results[0].picture.large

});
AllUsers.push(user1);
console.log(AllUsers);
	


}


//Backbone view for card

var ContactView = Backbone.View.extend({
	model: new User(),
	tagName: 'div',

	initialize: function() {

		this.template=_.template($('.card-template').html());


		 
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
		} ,this);
		this.model.on('remove', this.render, this)
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(user) {
			self.$el.append((new ContactView({model: user})).render().$el);
		});


	}
});
//instantiate view for all cards
var AllUserCardsView = new AllCardsView([]);



