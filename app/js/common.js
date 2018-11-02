$(function() {
	
	$("img, a").on("dragstart", function(event) {
    event.preventDefault();
  });

  //E-mail Ajax Send
  $(".formajx").submit(function() { //Change
    var th = $(this);

    $.ajax({
      type: "POST",
      url: $(th).attr("action"), //Change
      data: th.serialize(),
    }).done(function(data) {

      var message = data.message;
      if(message){
          $("#thank-popup-window").html("<p>" + message + "</p>")
          $("#thank-popup-window-btn").trigger('click');
        }

      setTimeout(function() {
        
        $.magnificPopup.close();
        th.trigger("reset");
      },2500);
    });

    return false;
  });



  function popupInit(){
    $(".popup-form-btn").magnificPopup({
      type: "inline",
      fixedContentPos: true,
      mainClass: "mfp-fade",
      removalDelay: 300
    });
  }

  function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
  }


  /*** a slider for cars ***/

	$('.check-auto-slider').cycle({
		slides: '>*'
	});

	/***  a slider for cars ***/ 


  /***** dropdowns ****/

  function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }

  function DropDown(_button, _dropdown_container, _duration){
    this.button = _button;
    this.dropdown_container = _dropdown_container;
    this.duration = _duration;


    $(button).click(function(){

      var current_cont = $(this).find(dropdown_container);

      if($(current_cont).css("display") != "block"){

        var drp_arr = $(dropdown_container);
        for(var i = 0; i < drp_arr.length; i++){
          $(drp_arr[i]).fadeOut(duration);
        }

        $(current_cont).fadeIn(duration);
      }

    });

    $(document).click(function(e){

      if(findAncestor(e.target, "dropdown") == null){
        $(dropdown_container).fadeOut(duration);
      }
    });
  }

  DropDown(".dropdown", ".dropdown-content", 100);
  

  /***** dropdowns ****/

  /**************** tabs ****************/
  var tab_wrapper = $(".tabs-container");
  var tab_controls = $(tab_wrapper).find(".tabs-controls-item");
  var tab_items = $(tab_wrapper).find(".tabs-item");
  var is_tabs_open = false;
  var marginTopHeader = $(".header-bottom-line").css("margin-top");
  

  /**** scrollTo *****/
  function scrollTo(_element){
    if($(window).width() < 1201)
      $('html, body').animate({
        scrollTop: $(_element).offset().top - parseInt($(".header-bottom-line").css("margin-top"))
      }, 1000);
  }
  /**** scrollTo *****/


  $(tab_items).not(":first").hide();

  $(tab_controls).click(function() {



    var current_index = $(this).index();
    var current_item;

    if(current_index > 1){

      current_item = $(tab_items).eq(current_index - 1);
      scrollTo("#header-bottom-line");
    }else{


      
      current_item = $(tab_items).eq(0);
      scrollTo("#header");

      var date = $(current_item).find(".date");
      if(current_index == 1)
      {
        $($(date)[date.length-1]).find("input").attr("disabled", "");
        $($(date)[date.length-1]).find("input").removeAttr("required").val("");
        $(current_item).find("form").append("<div class='hidden dest'>1</div>");
      }
      else
      {
        $($(date)[date.length-1]).find("input").removeAttr("disabled");
        $($(date)[date.length-1]).find("input").attr("required", "");
        $(current_item).find("form").find(".dest").detach();
      }
    }

    var form_content = $(current_item).find(".form-content");
    


    $(tab_controls).removeClass("active")
              .eq(current_index)
              .addClass("active");

    $(tab_items).hide()
          .find(".form-content")
          .hide();

    $(current_item).fadeIn();

      
    if(form_content && current_index > 1){
      if(!is_tabs_open)
      { 
        $(".header-bottom-line").animate({marginTop:'0px'}, 1000);
        $(form_content).slideToggle(1000);
      }

      $(form_content).fadeIn(800);
      $("#check-auto").fadeIn(1000);
 
      is_tabs_open = true;
    }else{
      $(".header-bottom-line").animate({marginTop: $(window).width() >= 993 ? marginTopHeader : '0px'}, 1000);
      $("#check-auto").fadeIn(1000);

      is_tabs_open = false;
    }
  
  }).eq(0).addClass("active");
  /**************** tabs ****************/
  
  /** Google API **/
  var inputs = document.getElementsByClassName('autocomplate');
  for(var i = 0; i < inputs.length; i++){
    inputs[i] = new google.maps.places.Autocomplete(inputs[i]);
  }
  /** Google API **/


  /**** passengers-counter  ****/

  function displayTotal(_counter){
    
    var main = $(_counter).parent().parent().parent(),
        input = $(main).find("input[name=Total]"),
        dsp_adults = $(main).find("input[name=Display_Adults]"),
        dsp_children = $(main).find("input[name=Display_Children]"),
        counters = $(main).find(".count-passengers input");

    var count_persons = 0,
        count_childrens = 0,
        count_adults = 0;

    for(var i = 0; i < counters.length; i++){
      var val = parseInt($(counters[i]).val());

      if(val > 0){
        $(counters[i]).closest(".count-passengers").addClass("active");
      }else{
        $(counters[i]).closest(".count-passengers").removeClass("active");
      }

      count_persons += val;
      if(/Children/.test($(counters[i]).attr("name"))){
        count_childrens += val;
      }
      else{
        count_adults += val;
      }
    }

    $(dsp_children).val(count_childrens);
    $(dsp_adults).val(count_adults);
    $(input).val(count_persons);

  }

  function passengersCounter(_counter, _action){

    var output = $(_counter).find("input"),
      current_val = parseInt($(output).val());

    if(_action == "inc")
      current_val++;
    else{
      if(current_val > 0)
        current_val--;
    }
    $(output).val(current_val);

    displayTotal(_counter);
  }

  $(".passengers .counter .inc").click(function(){

    var counter = $(this).parent();
    passengersCounter(counter, "inc");

  });

  $(".passengers .counter .dec").click(function(){

    var counter = $(this).parent();
    passengersCounter(counter, "dec");

  });

  /**** passengers-counter  ****/
  

  /**** order-form ******/

  //Form for orders
  function OrderForm(_form){
    this.form = $(_form);
    this.alert_window = $(_form).find(".alert-warning");
    this.form_content = $(_form).find(".form-content");
    this.input_origin = $(_form).find("input[data=origin]");
    this.input_destination = $(_form).find("input[data=destination]");
    this.categories = $(_form).find(".check-auto .check-auto-item");
    this.buttons = $(_form).find("a");
    this.inputs = $(_form).find("input");
    this.errors = {
       zero_result: $(_form).find(".errors .zero-result").html(),
       not_found: $(_form).find(".errors .zero-result").html(),
       default: $(_form).find(".errors .default").html()
    }

    this.init = function(){


      $(this.inputs).each(function(){

        var name = $(this).attr("name");
        var value = findGetParameter(name);

        if(name === "discount"){
          var discount = $(".tabs-controls-item.active input[name='discount']").val();
          discount = discount.replace("-", '').replace("%", "");
          if(discount)
            $(this).val(discount);

        }

        if(name && value && $.trim(value).length > 0){
          $(this).val(value);
        }

      });

    }

    this.buttonsInit = function (){
      self = this;
      for(var i = 0; i < this.buttons.length; i++){
        
        $(this.buttons[i]).click(function(i){

          var query = $(this).attr("href"),
              params = "?";

          self.form.find("#cat").val($(this).data("val"));

          var inputs = $(self.form).find("input");

          $(inputs).each(function(i){

            var name = $(this).data("get");
                value = $(this).val();
               
            if(name){
                if($.trim(value).length > 0){
                  if(i == 0){
                    params +=  name + "=" + value + "&";
                  }else if(i < inputs.length){
                    params += name + "=" + value + "&";
                  }
                }
            }
          });

          var dest = $(self.form).find(".dest").text();
          if(dest){
            params += "&" + "dest" +"=" + dest;
          }

          if(params.length > 0)
            query += params;

          
  

          window.location = query;
          return false;
        });
      }
    }
 
  }

  function orderFormToggle(form_content){
    if(form_content){
      if(!is_tabs_open)
      { 
        $(".header-bottom-line").animate({marginTop:'0px'}, 1000);
        $(form_content).slideToggle(1000);
        $("#check-auto").fadeOut(1000);
      }

      $(form_content).fadeIn(800);
      is_tabs_open = true;

    }else{

      $(".header-bottom-line").animate({marginTop:'135px'}, 1500);
      is_tabs_open = false;
    }
  }

  function getPriceForDestination(form){

    var origin = $.trim($(form.input_origin).val()),
        destination = $.trim($(form.input_destination).val()); 


    if(origin.length > 0 && destination.length > 0){

      if(form.form_content){
        orderFormToggle(form.form_content);
      }

      scrollTo("#header-bottom-line");

      var directionsService = new google.maps.DirectionsService;

      calculatePrice(directionsService, 
                     origin, 
                     destination,
                     form
                    );
    }

  }

  function inputForm(elem, form, duration){
    $(elem).keyup(function(){
      $(form.alert_window).fadeOut(200).empty();
      timer = setTimeout(getPriceForDestination, duration, form);
    });
  }

  function getPrice(elem, form){
    $(elem).blur(function(){
      setTimeout(getPriceForDestination, 50, form)
      clearTimeout(timer);
    });
  }


  var order_forms = $(".order-form"); //all forms for order
  if(order_forms.length > 0)
  {
    for(var i = 0; i < order_forms.length; i++ ){
      
      var form = new OrderForm(order_forms[i]);
      form.buttonsInit();

      inputForm(form.input_origin, form, 10);
      inputForm(form.input_destination, form, 5000);
      getPrice(form.input_origin, form);
      getPrice(form.input_destination, form);

    }
  }

  /**** order-form ******/



	$(".accordeon-trigger").on("click", function(e) {

		var $this = $(this),
		item = $this.closest(".accordeon-item"),
		content = item.find(".accordeon-inner"),
		duration = 300;

		if (!item.hasClass("active")) {
			content.stop(true).slideDown(duration);
			item.addClass("active");
		} else {
			content.stop(true).slideUp(duration);
      item.removeClass("active");
		}

	});



  /*** Mobile menu ***/

  var clonedMenu = $("header .menu ul").clone();
  $("#mobile-menu").append(clonedMenu);

  //Option of mobile-menu
  $("#mobile-menu").mmenu({
    extensions:['widescreen','theme-white','effect-menu-slide','pagedim-black'],
    navbar:{
      title: "Меню"
    }
  });
  
  //Hamburger click handler
  var mmApi = $("#mobile-menu").data( "mmenu" );
  
  mmApi.bind("closed",function(){
    $(".sandwich").removeClass("active");
  });

  $(".toggle-btn").click(function(){

    mmApi.open();
    $(".sandwich").addClass("active");

  });

  /*** Mobile menu ***/

   /** Calendar **/
  var datepickers = [];
  $(".datepicker").datepicker( $.datepicker.regional["ru"] )
  /** Calendar **/

  /**** Ajax Google Maps ****/
  function setPrice(_categories, _distance){

    if($(_categories).length > 0){
      for(var i = 0; i < _categories.length; i++){
        var category = $(_categories[i]),
            price_per_km = $(category).find(".price").text(),
            category_output = $(category).find(".output"),
            fix_way =  $(category).find(".fix-way").text(),
            fix_price = $(category).find(".fix-price").text();

        price_per_km = parseFloat(price_per_km.replace(',','.'));

        var price = fix_price;

        if(price_per_km)
          var price = _distance > fix_way ? _distance * price_per_km : fix_price;
        if(typeof price !== "string")
          $(category_output).text(price.toFixed(1) + " €").parent().addClass("active");
        else
          $(category_output).text(price).parent().addClass("active");

      }
    }
  }

  function calculatePrice(_directionsService,
                          _origin,
                          _destination, 
                          _form) {

    if(true){
      _directionsService.route({
        origin: _origin,
        destination: _destination,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
      }, function(response, status) {
          
          switch(status){
            case 'OK': {

              var directionsRoute = response.routes.shift();
              var directionsLeg = directionsRoute.legs.shift();
              var distance = Math.ceil(directionsLeg.distance.value / 1000);

              setPrice(_form.categories, distance);
              
              $(_form.alert_window).fadeOut(200).empty();

              break;
            }
            case 'ZERO_RESULTS':{
              $(_form.alert_window).empty();
              $(_form.alert_window).append(_form.errors.zero_result).fadeIn(200);
              popupInit();
              break;
            }
            case 'NOT_FOUND':{
              $(_form.alert_window).empty();
              $(_form.alert_window).append(_form.errors.not_found).fadeIn(200);
              popupInit();
              break;
            }
            default: {
              $(_form.alert_window).empty();
              $(_form.alert_window).append(_form.errors.default).fadeIn(200);
              popupInit();
              break;
            }
          }
      });

    }
    
  }
  /**** Ajax Google Maps ****/

  /**** Poshy Tip ****/
  $('.info').poshytip({
    className: 'tip-twitter',
    showTimeout: 1,
    alignTo: 'target',
    alignX: 'center',
    offsetY: 5,
    allowTipHover: true,
    fade: false,
    slide: false
  });
  /**** Poshy Tip ****/

   /**** Pay Methods radio  ****/ 
  $("input.pay-method").on('change', function() {
    var $this = $(this),
        pm = $(".pay-method"),
        common = pm.find(".dropdown .pay-method-label.active"),
        span = common.find("span"),
        cards = pm.find(".dropdown input.pay-method-card"),
        img = common.find(".img-wrap img");


    cards.prop("checked", false);
    common.removeClass("active");
    span.text("");
    $(img).attr("src", "");
    $(img).attr("alt", "");
  });
 
  $("input.pay-method-card").on('change', function() {
    var $this = $(this),
        src = $this.data("img"),
        alt = $this.data("alt"),
        dropdown = $(findAncestor(this, "dropdown"))
        common = dropdown.find(".pay-method-label"),
        parentImg = common.find("img"),
        parentSpan = common.find("span");

    parentImg.attr("src", src);
    parentImg.attr("alt", alt);
    common.addClass("active");
    parentSpan.text(alt);
  });
   /**** Pay Methods radio  ****/  

   

  /*** a slider for the destination ***/

	const CAROUSEL_MAX_SLIDES = 7;

	function getCarouselVisible() {
		const IMAGES = $(".slider-pager .img-wrap").length;
		return (IMAGES < CAROUSEL_MAX_SLIDES) ? IMAGES : CAROUSEL_MAX_SLIDES
	}

	$(".slider-slideshow").cycle({ slides: '> .img-wrap', timeout: 0, prev: '.slider-prev', next: '.slider-next' });

	$(".slider-pager").cycle({ 
		slides: '> .img-wrap', 
		timeout: 0, 
		fx: 'carousel', 
		carouselVisible: getCarouselVisible(),
		allowWrap: false,
		slideActiveClass: 'slider-active'
    });

	var slideshows = $('.slider-slideshow, .slider-pager').on('cycle-next cycle-prev', function (e, opts) {
		// advance the other slideshow
		slideshows.not(this).cycle('goto', opts.currSlide);
	});

	$('.slider-pager .cycle-slide').click(function () {
		var index = $('.slider-pager').data('cycle.API').getSlideIndex(this);
		slideshows.cycle('goto', index);
    });

  /***  a slider for the destination ***/
   

  if($("input").is(".transfer-time")) {

    let inputs = $(".transfer-time");

    $(inputs[0]).attr("id", "transfer-time");
    $(inputs[1]).attr("id", "transfer-return-time");

		$("#transfer-time").timepicker();
		$("#transfer-return-time").timepicker();
	};

  $("textarea").removeAttr("rows").removeAttr("cols");
  popupInit();


  
  function MainForm(_form){
    this.form = $(_form);
    this.inputs = $(_form).find("input, textarea");
    this.categories = $(_form).find(".check-auto .check-auto-item");
    this.input_origin = $(_form).find("input[data=origin]");
    this.input_destination = $(_form).find("input[data=destination]");
    this.two_way = $(_form).find("div[data-back=1]");
    this.way_choosers = $(_form).find("input[data-dest]");

    function chooser(self){
      var required = [ false, false];
      $(self.way_choosers).change(function(){
        
        if($(this).data("dest") === 1){
          $(self.two_way).fadeOut();
          $(self.two_way).find("input").each(function(i){
            $(this).val("");
       
            if ($(this).attr("required")){
              required[i] = true;
              $(this).removeAttr("required");
            }

          });
        }
        else{
          $(self.two_way).fadeIn();
           $(self.two_way).find("input").each(function(i){
            if (required[i]){
              
              $(this).attr("required", "required");
            }
            required[i] = false;
          });
          
        }
      });
    }

    this.init = function(){

      chooser(this);

      $(this.inputs).each(function(i){

        var name = $(this).data("get");
        /*
        if(/кг/.test(name)){
               name = name.replace('кг', '');
        }*/
        var value = findGetParameter(name);
        if(name && value && $.trim(value).length > 0){

          if(name === "discount") {
              value = Math.abs(parseInt(value));
          }

          $(this).val(value);
        }

      });


      var origin = $.trim($(this.input_origin).val()),
          destination = $.trim($(this.input_destination).val()); 


      if(origin.length > 0 && destination.length > 0){
        var directionsService = new google.maps.DirectionsService;

        calculatePrice(directionsService, 
                       origin, 
                       destination,
                       {
                         categories: this.categories
                       }
                      );
      }

      var cat = findGetParameter("cat");
      if(cat){
        var checkboxes = $(this.categories).find("input");
        $(checkboxes).each(function(){
          if($(this).data("cat") === cat){
            $(this).attr("checked","checked");
          }
        });

      }

      var counters = $(this.form).find(".passengers .counter");
      if(counters){
        $((counters)[0]).find(".inc").trigger("click");
        $((counters)[0]).find(".dec").trigger("click");
      }
      
      $(".passengers .dropdown-content").hide();

      var dest = findGetParameter("dest");

      if(dest){
        $(this.way_choosers).each(function(){

          if($(this).data("dest") == dest){
            $(this).attr("checked","checked");
            $(this).trigger("change");
          }
        });
      }

      //to_json(this);
    }



  }

  var main_form = new MainForm(".main-form"),
      order_form = new OrderForm(".order-form");
  main_form.init();
  order_form.init();

  inputForm(main_form.input_origin, main_form, 10);
  inputForm(main_form.input_destination, main_form, 10);
  getPrice(main_form.input_origin, main_form);
  getPrice(main_form.input_destination, main_form);

  function sendEmail(data, csrftoken) {
      $.ajax({
          url: "zrpt-email/",
          type: "POST",
          beforeSend: function(xhr){
          if(csrftoken)
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
          },
          contentType: 'application/json; charset=utf-8',
          dataType: 'text',
          data: JSON.stringify(data)
        }).done(function () {
      });
  }
  
  
  function validate_form() {
      
  }


  $(main_form.form).submit(function(){

    var th = $(this),
        item = th.find(".check-auto-item input:checked"),
        selected = findAncestor(item[0], "check-auto-item"),
        price = $(selected).find(".output").text(),
        field = $(selected).find(".output-price");
        $(field).val(price);

    var customer_email = th.find('input[name=customer_email]').val(),
        customer_name =  th.find('input[name=customer_name]').val();

    var data = th.find("input, textarea");

    var csrftoken = th.find("[name=csrfmiddlewaretoken]").val();

    data = Array.from(data).filter(function(item) {

      var type = item.getAttribute("type");

      if (type === "radio"){
          return $(item).prop("checked")
      }else{
        if(item.value !== "" && item.name !== "")
          return item.name !== "csrfmiddlewaretoken";
      }
    });

    data = data.map(function (item) {
       return {
         name: item.name,
         data_name: item.getAttribute("data-name"),
         value: item.value
       };
    });

    function csIndexOf(array, value) {
        for(var i = 0; i < array.length; i++){
          if(array[i].name === value.name){
            return i;
          }
        }
        return -1;
    }

    data = data.filter(function (value, index, self){
        return csIndexOf(self, value) === index;
    });

    var tr_price = data.find(function (elem) {
       if(elem.name === "transfer_price"){
          return true;
       }
    });
    
    tr_price.value = parseFloat(tr_price.value.replace(/[^.0-9]/g, '')).toString();
  
    data = JSON.stringify(data);


   
    $.ajax({
      url: "zrpt/", 
      type: "POST",
      beforeSend: function(xhr){
        if(csrftoken)
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
      },
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      data: data
    }).done(function(order) {


      var message = th.find(".message");
      if(message){
          $("#thank-popup-window").html("<p>" + $(message).text() + "</p>")
          $("#thank-popup-window-btn").trigger('click');
        }

      var submission = th.find("#submission");
      if(submission){

        var sb_data = {
            submission: submission.html(),
            customer_email: customer_email,
            customer_name: customer_name,
            order_id: order
        };
        sendEmail(sb_data, csrftoken)
      }

      setTimeout(function() {
        
        $.magnificPopup.close();
        th.trigger("reset");
      },2500);

    });

    return false;
  });


});

