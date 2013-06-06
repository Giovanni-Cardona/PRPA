
// -----------------------------
// Image Silder Settings:
// -----------------------------
	var SliderContainer = '.slider';
	var ImageSliderList = 'Info Slider';
	var ImageAndSliderWidth = 900;
	var ImageAndSliderHeight = 175;
	var WebSiteURL = "//"+ document.domain;
	var ValidationPage = "https://serviciosenlinea.gobierno.pr/validacionelectronica/";
	var extended;
	var slider;

// -----------------------------

$(document).ready(function() {	

	
	//Set Date

	var d = new Date()
	
	$('#v5-date').append( spanishDate(d) );

	
	//Adds Accesibility button to the Top Menu
	$('.accesibilityButton').text("").attr("href","#").attr("title","Versión Líneal Accesible").click(function(){
				
			for(i=0; i < document.styleSheets.length; i++){
				document.styleSheets[i].disabled = true;
			}
			event.preventDefault();											
	});	
	

	//add Some Styles on Page Ready
	$("#tabHelper").css("cursor","pointer");
	$(".logoItem").css("cursor","pointer");
	
	//Event Handlers
	$('.logoItem').click(function(){
		window.location = "/";
	});
	

	//Handler of the Hide/View Tabs Area
	if(extended != "display"){
		$('#tabsInfo').css("display","none");
		$("#v5-Slider").css("display","none");
		//$('.slider').bxSlider({	pager:false, controls:false	});		
	}
	else{
		$("#tabHelper").css("display","none");
		$("#v5-Slider").css("display","block");		
		
		// Turn Slider On
		if( $('.slider li').length == 1){
		
			slider = $('.slider').bxSlider({
				touchEnabled: true,
				auto: false,
				controls:false,
				pager:false
			});	
			
		}else{
				
			slider = $('.slider').bxSlider({
				mode: 'fade',
				touchEnabled: true,
				auto: true,
				pause:8000
			});	

		}

		
	}
		
	$('#tabHelper').click(function(){
	
		$('#tabsInfo').slideToggle(function(){
	
		if($('#tabsInfo').is(":visible")){	
			$('#tabHelper').css("background-position","0 0");
			$('#tabHelper').text("HAGA CLICK AQUI PARA CERRAR VENTANA");				
		}
		else{
			$('#tabHelper').css("background-position","0 -21px");
			$('#tabHelper').text("¿BUSCAS UN SERVICIO EN LÍNEA? - HAGA CLICK AQUÍ");
		}		
		});
			
	});
	
	//añadir enlace correcto al ultimo item del menu.
	//$('.topNav table td a:last').attr("href","#");
	
		
	
	//Añadir funcion de accesibilidad al ultimo item del menu.
	
	$(".boton a").attr("href",ValidationPage);
	
	//End of Handler of the Hide/View Tabs Area
	var root = location.protocol + '//' + location.host;
	var filterPage = "/Pages/servicefilter.aspx";
	
	//Online Services Tabs
	$("#servicIcons").onlineServiceTabs({
		spSiteUrl:WebSiteURL,
		spList:"CaruselServicios",
		lnk1:["PAGOS",root + filterPage + "?cat=pagos"], //Pagos
		lnk2:["CERTIFICADOS",root + filterPage + "?cat=certificados"],	//Certificados
		lnk3:["LICENCIAS",root + filterPage + "?cat=licencias"],	//Licencias
		//lnk4:[],  //Busqueda
		lnk4:["RADICACIÓN",root + filterPage + "?cat=radicacion"], //Radicación
		lnk5:["REGISTRO",root + filterPage + "?cat=registro"], //Registro
		lnk6:["SOLICITUDES",root + filterPage + "?cat=solicitudes"], //Solicitudes
		//lnk8:[], //Servicios
		lnk7:["SERVICIOS",root + filterPage + "?cat=servicio"], //Mercado
		lnk8:["PERMISOS",root + filterPage + "?cat=permisos"], //Permisos
		lnk9:["RESERVACIONES",root + filterPage + "?cat=reservaciones"], //Resercaciones
		//lnk12:[], //Reclamación 
		searchPage:root + "/Pages/search.aspx"  //Search Page
	});
	
	
});


function spanishDate(d){
	var weekday=["domingo","lunes","martes","miercoles","jueves","viernes","sabado"];
	var monthname=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
	return weekday[d.getDay()]+", "+d.getDate()+" de "+monthname[d.getMonth()]+" de "+d.getFullYear()
}



	//Weather Bar Settings
	$('#WeatherData').weatherfeed(['USPR0083'],{unit:"f",wind:false,link:false}); 
	
	//------------------Weather Alerts for Puerto Rico ---------------------------
	
	$(document).ready(function(e) {
/*       
 $('.easContainer').eas({
			state:"pr",
			afterLoad:function() {
				$('.easContainer').marquee({
							showSpeed: 200,
							scrollSpeed: 12 
					});}
		});*/
    });	
	//---------------- End of Weather Alerts for Puerto Rico --------------------- 




