//Backbone model for single contact

var Contact = Backbone.Model.extend({
  defaults: {
  	fname: '',
  	lname: '',
  	email: '',
  	phone: '',
  	age: ''
  }
});

var AllContacts = Backbone.Collection.extend({});

var contact1 = new Contact({
	fname: 'Ido',
  	lname: 'Rozen',
  	email: 'dodjf@gmail.com',
  	phone: '054123654',
  	age: '27'

});

var contact2 = new Contact({
	fname: 'Danielle',
  	lname: 'Jacobson',
  	email: 'djsssde@gmail.com',
  	phone: '054164127',
  	age: '26'

});

var contact3 = new Contact({
	fname: 'John',
  	lname: 'Smith',
  	email: 'johnade@gmail.com',
  	phone: '059875624',
  	age: '39'

});

//instantiate a collection
var contacts = new AllContacts([contact1, contact2, contact3]);


//Backbone view for contact

var ContactView = Backbone.View.extend({
	model: new Contact(),
	tagName: 'tr',

	initialize: function() {

		this.template=_.template($('.contacts-list-template').html());
		 
	},
	
	events: {
		'click .actionSettings': 'settings',
		'click .edit-contact': 'edit',
		'click .update-contact': 'update',
		'click .cancel': 'cancel',
		'click .delete-contact': 'delete'
	},

	settings: function() {
		 
		this.$('.actionSettings').hide();
		this.$('.edit-contact').show();
		this.$('.delete-contact').show();


	},
	edit: function(e) {

		this.$('.edit-contact').hide();
		this.$('.delete-contact').hide();
		this.$('.update-contact').show();
		this.$('.cancel').show();

		var fname = this.$('.fname').html();
		var lname = this.$('.lname').html();
		var email = this.$('.email').html();
		var phone = this.$('.phone').html();
		var age = this.$('.age').html();

		this.$('.fname').html('<input type="text" class="form-control fname-update" value="' + fname + '">');
		this.$('.lname').html('<input type="text" class="form-control lname-update" value="' + lname + '">');
		this.$('.email').html('<input type="text" class="form-control email-update" value="' + email + '">');
		this.$('.phone').html('<input type="text" class="form-control phone-update" value="' + phone + '">');
		this.$('.age').html('<input type="text" class="form-control age-update" value="' + age + '">');

	},
	update: function() {
		this.model.set('fname', $('.fname-update').val());
		this.model.set('lname', $('.lname-update').val());
		this.model.set('email', $('.email-update').val());
		this.model.set('phone', $('.phone-update').val());
		this.model.set('age', $('.age-update').val());

	},
	cancel: function() {
		allcontacts.render();
	},
	delete: function() {
		this.model.destroy();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

//Backbone view for  all contacts

var AllContactsView = Backbone.View.extend({
	model: contacts,
	el: $('.contacts-list'),
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
		_.each(this.model.toArray(), function(contact) {
			self.$el.append((new ContactView({model: contact})).render().$el);
		});

	disableAddBtn();

	}
});
//instantiate view for all contacts
var allcontacts = new AllContactsView([contact1, contact2, contact3]);

$(document).ready(function() {

	allcontacts.render();

	disableAddBtn();

	$('.add-contact').on('click', function(){
		var newContact = new Contact({
			fname: $('.fname-input').val(),
  			lname: $('.lname-input').val(),
  			email: $('.email-input').val(),
  			phone: $('.phone-input').val(),
  			age: $('.age-input').val(),
  			
		});
		$('.fname-input').val('');
  		$('.lname-input').val('');
  		$('.email-input').val('');
  		$('.phone-input').val('');
  		$('.age-input').val('')

		console.log(newContact.toJSON());
		contacts.add(newContact);

	})

	var searchQuery = $('#search').val();
	console.log(searchQuery);

	$('.search-bar-input').keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
  	var searchQuery = $('#search').val();
	console.log(searchQuery);
      
  }
});   

// var foundModels = contacts.pluck("fname");;
// alert(JSON.stringify(foundModels));

})


///Add button disable when inputs are empty////

function disableAddBtn() {

	 $('.add-contact').attr('disabled',true);
    $('#contact-form :input').keyup(function(){
        if($(this).val().length !=0 || 1)
            $('.add-contact').attr('disabled', false);            
        else
            $('.add-contact').attr('disabled',true);
    })
};



