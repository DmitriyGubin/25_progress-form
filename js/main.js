$(".form_inp.phone").mask("+7(999) 999-9999");
$('.form_inp.mail').inputmask("email");


/***********селекты********/
$('#donor_popup .hide_box.scroll').niceScroll();

$("#donor_popup .inp_box").each(function(){

	let $this = $(this);
	let $hide_box = $(this).find('.hide_box');
	let $paste_inp = $(this).find('.paste_inp');

	$this.on('click', function(){

		$this.toggleClass('active');
		$hide_box.slideToggle(400);

	});

	$(this).find('.hide_item').on('click', function(){
		let name = $(this).html();
		$paste_inp.val(name);
	});
});

/***********селекты********/

/***********перемещени по формам**********/
var step_num = 0;
var steps_arr = [
	{
		class: '.step_one',
		persent: '33%',
	},
	{
		class: '.step_two',
		persent: '65%',
	},
	{
		class: '.step_free',
		persent: '100%',
	}
];

//console.log(steps_arr[2].persent);

function Validate($form_ref)
{
	var err=0;

	var pattern_mail = /\S+@\S+\.\S+/;//для валидации почты регулярка

	$form_ref.find('.required').each(function() {

		var $this = $(this);
		var inp_val = $this.val();
		var bool;

		if($(this).hasClass('phone'))
		{
			bool = (inp_val.length != 16);
		}
		else if($(this).hasClass('mail'))
		{
			bool = (!pattern_mail.test(inp_val));
		}
		else
		{
			bool = (inp_val == '');
		}

        if(bool)
        {
            err++;
            $this.addClass("error");
        } 
        else 
        {
            $this.removeClass("error");
        }
	});

	if(err == 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

$('#donor_popup #go_ahead').on('click', Go_Ahead);
$('#donor_popup .go_back').on('click', Go_Back);

function Go_Back()
{
	if(step_num == 0)
	{
		$.fancybox.close({src: '#donor_popup'});
	}
	else
	{
		step_num--;
		clas = steps_arr[step_num].class;
		Switch_Forms(clas);
		Change_Progress_Bar();
	}
	if(step_num == 1)
	{
		$('#donor_popup .finish_box').addClass("hide");
		$('#donor_popup .ready_box').removeClass("hide");
	}
}

function Go_Ahead()
{

	let clas = steps_arr[step_num].class;
	let $form = $(clas);

	if(Validate($form))
	{
		step_num++;
		clas = steps_arr[step_num].class;
		Switch_Forms(clas);
		Change_Progress_Bar();
		if(step_num == 2)
		{
			$('#donor_popup .ready_box').addClass("hide");
			$('#donor_popup .finish_box').removeClass("hide");
		}
	}
}

function Switch_Forms(form_selector)
{
	$('.step_form').addClass("hide");
	$(form_selector).removeClass("hide");
}

function Change_Progress_Bar()
{
	width = steps_arr[step_num].persent;
	$('#donor_popup .ready_line').css('width', width);
	$('#donor_popup #pers_num').html(width);
}

/***********перемещени по формам**********/

/***отправка формы******/

$('#donor_popup #send_order').on('click', Send_Form);

function Send_Form()
{
	// успех аякса
	$('#donor_popup #donor_form').addClass("hide");
	$('#donor_popup #scces_box').removeClass("hide");

	$('#donor_popup .ready_box').removeClass("hide");
	$('#donor_popup .finish_box').addClass("hide");
	step_num = 0;
	Change_Progress_Bar();
	// успех аякса
}
/***отправка формы******/

$('.open_popup_butt').on('click', function(){

	$('#donor_popup #donor_form').removeClass("hide");
	$('#donor_popup #scces_box').addClass("hide");

})


