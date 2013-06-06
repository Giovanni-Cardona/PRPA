//online Services Tab Script

var type = 1; 
var searchTerm; 
var options; 
var oContainer;
var linkItems = 9;


(function($){
	$.fn.onlineServiceTabs = function(options_int){
		var defaults = {
			spSiteUrl:"http://www.pr.gov",
			spList:"CaruselServicios",
			numberOfItems:6,
			numberOfRows:1,
			useLinks:true,
			lnk1: ["TEXTO","#"],
			lnk2: ["TEXTO","#"],
			lnk3: ["TEXTO","#"],
			lnk4: ["TEXTO","#"],
			lnk5: ["TEXTO","#"],
			lnk6: ["TEXTO","#"],
			lnk7: ["TEXTO","#"],
			lnk8: ["TEXTO","#"],
			lnk9: ["TEXTO","#"],
			lnk10:["TEXTO","#"],
			lnk11:["TEXTO","#"],
			lnk12:["TEXTO","#"],
			searchPage:"http://www2.pr.gov/allServices.aspx"
		};
		
		options = $.extend(defaults, options_int);  
		oContainer = $(this);
		
    	//por cada instancia del plugin hacer:
		return this.each(function(){
			LoadLinksFirstTime();
			LoadImagesFromSP();	
			SetListItemLinks(searchTerm);
			$('#btnOnlineServSearch').attr('href',options.searchPage);
			$('.allServices').attr('href',options.searchPage);		
			
			//Event Handlers
			$('#btnOnlineServSearch').click(function(){
				SearchTerm = $('#txtInfoSearchBox').val();				
				
				if (SearchTerm != ""){
					$('#btnOnlineServSearch').attr('href',options.searchPage + "?sterm=" + SearchTerm);
				}
				else{
					$('#btnOnlineServSearch').attr('href',"#");
					event.preventDefault();
				}				
			});
			
			//Search when press enter
			$('#txtInfoSearchBox').keypress(function(e) {
        		if(e.which == 13) {
        			SearchTerm = $('#txtInfoSearchBox').val();
        			window.location = options.searchPage + "?sterm=" + SearchTerm;			
        		}
    		});
			//End Of event Handlers
						
		});		
	};
})(jQuery);


		function SetListItemLinks(term){
			$('.listContainer li a').each(function(i){
				value = $(this).attr("href");
				//alert(value);
							
				if(value.indexOf("&type=") == -1){
					$(this).attr("href",value+"&type="+term );	
				}
				else{
					value =  value.substring(0,value.indexOf("&type=")+6);
					value = value + term;
					$(this).attr("href",value );
				}

			});
		
		}
		
		function remake(num, object){
			type = num;
			
			$(".tabStrip").find("li:gt(0)").removeClass("tabStripActive");
			
			$(object).addClass("tabStripActive");
			
			//remove all items from list before put new ones
			$('.serviceIconsMod li').each(function(){
				$(this).remove(); 
			});
			
			//repopulate list;
			LoadImagesFromSP();	
			
			//repopulate links;
			SetListItemLinks(searchTerm);
		}
		
		//Function to Load the Images from Sharepoint and loaded on the image table of the page
		function LoadImagesFromSP(){
			//if (state != 'init') return;     
			$().SPServices({
				operation: "GetListItems",
				async: true,
				webURL: options.spSiteUrl, 
				listName:  options.spList,
				completefunc: function(xData, Status) {	
					PaintImages(xData,"#"+oContainer.attr("id"),options.useLinks,options.numberOfRows,options.numberOfItems,type);			
				}		
			});
		}
		
		function LoadLinksFirstTime(){
			//Set First Tab on Header to active
			$(".tabStrip li:eq(1)").addClass("tabStripActive");
			
			//Set First Tab on Header to active
			$(".tabStrip li:eq(1)").addClass("tabStripActive");			
		
			for(i=1; i<=linkItems; i++)
			{	
				element = '#lnk'+i;
				texto  = eval("options.lnk"+i+"[0]");
				enlace = eval("options.lnk"+i+"[1]");				
			
				if(texto != undefined){
					$(element).text(texto);	
					$(element).attr("href",enlace);
				}
				else{
					$(element).css("display","none");
					$(element).css("list-style-image","none");
				}
			}		
		}

		function PaintImages(data, parentName, link, Rows, MaxImgPerRow,type){
			var counter = 0; var perRow = 0; var row = 1; var lastRow = 0; 				
	
					$(data.responseXML).SPFilterNode("z:row").each(function(i){
					
						var cText =  $(this).attr("ows_Title");
						var cLink =  $(this).attr("ows_RedirectionLink");						
						if ($(this).attr("ows_TrxPriority") == 0){ cLink ="/Pages/Mensajedetransaccionabajo.aspx" }
						var cImage =  options.spSiteUrl+ "/" + $(this).attr("ows_RequiredField");
						var HideIcon = $(this).attr("ows_HideIcon"); 
						var typeCiudadano = $(this).attr("ows_TrxIsCiudadano"); 
						var typePublicEmp = $(this).attr("ows_TrxIsEmpleadosPublicos");
						var typeBusiness = $(this).attr("ows_TrxIsEmpresas");
						
						switch(type)
						{
							case 1: //Ciudadano
								if( typeCiudadano == 1 || typeCiudadano === undefined  ) {
									searchTerm = "ciudadano";
								}
								else{ return;}
							break;
							
							case 2: //Empresa
								if( typePublicEmp == 1 || typePublicEmp === undefined  ) {
									searchTerm = "empresa";
								}
								else{ return;}
							break;
							  
							case 3: //Gobierno
								if( typeBusiness  == 1 || typeBusiness  === undefined  )   {
									searchTerm = "gobierno";
								}
								else{ return;}					  	
							break;
						}
						
						if(counter == 0 || row > lastRow){ // Add New UL
							 lastRow += 1;	
							$(parentName).append("<ul class='serviceIconsMod' id='Row"+row+"'></ul>");	
						}
						
						var aString = ['<div class="serviceIconImageMod"><a href="', cLink ,'"><img src="',cImage,'" alt="' ,cText, '" /></a></div>'];
						var liString = "<li id='icon_"+ counter +"'>"+ aString.join("") + "</li>"
						//alert(aString.join(""));
						
						if( HideIcon != 1 || HideIcon === undefined  ) {
							$("#Row"+row).append(liString);
							if(link == true){
								$("#icon_"+counter).append("<div class='serviceIconTextMod' ><a class='itemLink' target='_blank' href='"+ cLink +"'>"+ cText +"</div>");
							}
								
							counter += 1; perRow +=1;	
							if(perRow == MaxImgPerRow){row += 1; perRow = 0;}												
						}				
						if(counter == (MaxImgPerRow*Rows)){ if(Rows = row){return false}; return false ;}					
					});				
				
		}

