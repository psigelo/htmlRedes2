var menuXML = loadXMLDoc("./xml/menu.xml");
var isSelected;

function loadXMLDoc(filename)
{
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else // code for IE5 and IE6
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",filename,false);
	xhttp.send();
	return xhttp.responseXML;
} 



/*

	Al comenzar el programa se cargara el menu con el item home como seleccionado

*/
$(document).ready(function() {	
	isSelected = 0;
	var menuObject 	= document.createElement('div');
	var titulo 		= document.createElement('title');
	var txtTitulo 	= document.createTextNode("t");
	menuObject.setAttribute('id', 'idMenu');
	titulo.setAttribute('id', 'idTitulo');
	var txt 		= document.createTextNode(" This text was added to the DIV.");
	document.childNodes[0].appendChild(titulo);
	//document.getElementById('idTitulo').appendChild(txtTitulo);


	// CREANDO LA BARRA MENU
	//========================================================================================================================
	document.getElementById('cuerpo').appendChild(menuObject); 
	var menu = document.getElementById('idMenu');
	menu.appendChild( document.createElement('ul') );
	
	var lista = menu.childNodes[0];
	lista.setAttribute('id', 'listaMenu');
	for (i = 0; i < menuXML.getElementsByTagName("menuItem").length; i++) {
    	lista.appendChild(document.createElement('li'));
    	lista.childNodes[i].appendChild(document.createElement('a'));
    	var nodo = $(lista.childNodes[i].childNodes[0]);
    	var nodo2 = $(menuXML.getElementsByTagName("menuItem")[i].getElementsByTagName("name")[0]);
    	nodo.text(  nodo2.html()  );

    	nodo.click(function() {
    		var elegido=0;
    		var arreglo = menuXML.getElementsByTagName("name");
    		for (var i = arreglo.length - 1; i >= 0; i--) {
    			if ( $(arreglo[i]).text() == $(this).text() ){
    				elegido = i;
    				break;
    			}	
    		};

    		actualizarMenu(elegido);
    		actializarDesarrollo(elegido);
		});
	} 
	//========================================================================================================================


	// Creando el area de desarriollo
	//========================================================================================================================

	var desarrollo 	= document.createElement('div');
	desarrollo.setAttribute('id', 'desarrollo');
	document.getElementById('cuerpo').appendChild(desarrollo); 

	//========================================================================================================================
	// Se entiende que primeramente se comienza con el home.
	actualizarMenu(isSelected);
	actializarDesarrollo(isSelected);
});


function actualizarMenu(elegido){
	var lista = document.getElementById("listaMenu");
	// Se descolorea el que anteriormente era elegido.
	var nodoAnterior = $(lista.childNodes[isSelected].childNodes[0]);
	nodoAnterior.css("background-color", "#F7F7F7");
	nodoAnterior.css("color", "#666");

	// Se colorea al actual.
	var nodoElegido = $(lista.childNodes[elegido].childNodes[0]);
	nodoElegido.css("background-color", "#E9ECF0");
	nodoElegido.css("color", "#000");
	
	// Se pone el titulo correcto
	var nodo2 = $(menuXML.getElementsByTagName("menuItem")[elegido].getElementsByTagName("name")[0]);
	$(document.getElementById('idTitulo')).text(nodo2.html());
	isSelected=elegido;
}


function actializarDesarrollo(elegido)
{
	var ruta = $(menuXML.getElementsByTagName("menuItem")[elegido].getElementsByTagName("link")[0]).text();
	var contenidoXML = loadXMLDoc(ruta);
	var nodo2 = $(contenidoXML.getElementsByTagName("contenido")[0]).html();
	$( document.getElementById("desarrollo") ).html(nodo2);
}
