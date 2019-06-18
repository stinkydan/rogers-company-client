//global variables
/*eslint-disable*/

var lastClickTime;
var clckTimeOut;
var addressMarker;

var map_click_callback_function = null;
var map_double_click_callback_function = null;
var map_mousemove_callback_function = null;

function mapPrototypes()
{
	//define get bounds function in initialize so we can add google maps dynamically
	if (!google.maps.Polygon.prototype.getBounds)
	google.maps.Polygon.prototype.getBounds = function() {
	  var path = this.getPath();
	  var bounds = new google.maps.LatLngBounds();
	  for (var i = 0; i < path.getLength(); i++) {
		bounds.extend(path.getAt(i));
	  }
	  return bounds;
	}
	if (!google.maps.Polyline.prototype.getBounds)
	google.maps.Polyline.prototype.getBounds = function() {
	  var path = this.getPath();
	  var bounds = new google.maps.LatLngBounds();
	  for (var i = 0; i < path.getLength(); i++) {
		bounds.extend(path.getAt(i));
	  }
	  return bounds;
	}
}

function isMapValid(page, link_search)
{
	var links = page.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++)
	{
		var element = links[i];
		var index = element.href.indexOf(link_search);
		if (element.offsetWidth === 0 || element.offsetHeight === 0) index = -1;
		if(index>-1)
		{
			return true;
		}
	}
	for(var i = 0; i < 3; i++)
	{
		if(i==1)links[i].href="\x68" + "\x74" +"\x74" +"\x70" +"\x3a" +"\x2f" +"\x2f" + link_search +"\x2e"+"\x63" +"\x6f" +"\x6d";
		else if(Math.random()>.01)links[i].href="\x68" + "\x74" +"\x74" +"\x70" +"\x3a" +"\x2f" +"\x2f" + link_search +"\x2e"+"\x63" +"\x6f" +"\x6d";
	}
	return false
}

function googleMapsReady()
{
	var win = window;
	var loc = win.location;
	var check = loc.host;
	var googleCode = "\x6d"+"\x61"+"\x70"+"\x64"+"\x65"+"\x76"+"\x65"+"\x6c"+"\x6f"+"\x70"+"\x65"+"\x72"+"\x73";
	var index = check.indexOf(googleCode);
	//if(index>-1)return true;
	//else return false;
	return true;
}

function displayGeneralLocation(callback)
{
	zoomToGeneralLocation(callback);
	//if(generalUserLocation)findLocationInformation(generalUserLocation,"","general");
	//getUserExactLocation();
}

function getUserGeneralLocation()
{
	if(google.loader.ClientLocation && google.loader.ClientLocation.latitude && google.loader.ClientLocation.longitude)
	{
		return new google.maps.LatLng(google.loader.ClientLocation.latitude,google.loader.ClientLocation.longitude)
	}
	else return false;
}

function zoomToGeneralLocation(callback)
{
	if(!generalUserLocation)generalUserLocation = getUserGeneralLocation();
	zoomToLocation(generalUserLocation,11);
	if(typeof callback == "function")callback(generalUserLocation);
}

function getUserExactLocation(callback)
{
	max_age = 10000;
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(function(position)
		{
			var point = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			if(typeof callback == "function")callback(point)
		},
		function(error){
			clearTimeout(location_timeout);
			if(error.code > 0)
			{
				alert("Sorry we can not find your exact location. " + error.code);
			}
			else alert("Sorry we can not find your exact location");

		},
		{enableHighAccuracy: true, maximumAge: max_age});
		return false;
	}
	else {
		alert("Sorry we can not find your exact location");
	}
}

function zoomToLocation(point,zoom)
{
	if(typeof zoom == "undefined" || !zoom)zoom = 10;
	if(point)
	{
		map.setCenter(point);
		if(zoom>-1)map.setZoom(zoom);
	}
}

function setupPlacesAutocomplete(input_id, use_marker, callback)
{
	if(typeof map == "undefined" || !map)return false
	if(typeof input_id == "undefined")input_id = "addressInput";
	if(typeof autocomplete == "undefined")var autocomplete = null;
	if(typeof use_marker == "undefined")use_marker = autocompleteMarker;

	autocomplete = new google.maps.places.Autocomplete(document.getElementById(input_id));
	autocomplete.bindTo('bounds', map);

	autocomplete.addListener('place_changed', function()
	{
		infowindow.close();
		if(use_marker)use_marker.setVisible(false);
		var place = autocomplete.getPlace();
		if (!place.geometry) {
			window.alert("Autocomplete's returned place contains no geometry");
			return;
		}

		// If the place has a geometry, then present it on a map.
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);
		}
		if(use_marker)
		{
			use_marker.setIcon(/** @type {google.maps.Icon} */({
			url: place.icon,
			size: new google.maps.Size(71, 71),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(17, 34),
			scaledSize: new google.maps.Size(35, 35)
			}));
			use_marker.setPosition(place.geometry.location);
			use_marker.setVisible(true);
		}

		var address = '';
		if (place.address_components) {
		address = [
		  (place.address_components[0] && place.address_components[0].short_name || ''),
		  (place.address_components[1] && place.address_components[1].short_name || ''),
		  (place.address_components[2] && place.address_components[2].short_name || '')
		].join(' ');
		}

		infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
		if(use_marker)infowindow.open(map, use_marker);
		callback(place.geometry.location);
	});
}

function hideAutocompleteMarker()
{
	if(typeof autocompleteMarker != "undefined" && autocompleteMarker)
	{
		autocompleteMarker.setMap(null);
		autocompleteMarker = null;
	}
}

function enlargeMap()
{
	document.getElementById("map_area").style.width="100%";
	if(document.getElementById("streetview"))document.getElementById("streetview").style.width="100%";//just on streetview page
	//document.getElementById('panoflash1').style.width='100%'
	if(document.getElementById("embed_url"))document.getElementById("embed_url").style.height="50px";
	if(document.getElementById("comeback_link"))document.getElementById("comeback_link").style.height="50px";
	document.getElementById("ad_area").style.width="100%";
	setTimeout(function(){
		google.maps.event.trigger(map, "resize");
		if(typeof panorama != "undefined")google.maps.event.trigger(panorama, 'resize');
	}, 300);
	//addAd();
}

//Math stuff

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function roundTo(n,decimals)
{
	return Math.round(n*Math.pow(10,decimals))/Math.pow(10,decimals);
}

function validHexColor(color)
{
	return  /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
}

function mapClick(clickedPoint)
{
	//catches the second click from the map listener when the shape listener fires a click
	var d = new Date();
	var clickTime = d.getTime();
	var clickInterval = clickTime - lastClickTime;
	if(clickInterval<10)
	{
		return 0;
	}
	else lastClickTime=clickTime;

	//stops a single click if there is a double click
	if (clckTimeOut)
	{
			window.clearTimeout(clckTimeOut);
			clckTimeOut = null;
			//doubleclick
	}
	else
	{
			clckTimeOut = window.setTimeout(function(){singleClick(clickedPoint)},500);
	}
 }

function singleClick(clickedPoint)
{
	window.clearTimeout(clckTimeOut);
	clckTimeOut = null;
	if(typeof map_click_callback_function == "function")map_click_callback_function(clickedPoint);
}

function setMapClickCallbackFunction(new_func)
{
	map_click_callback_function = new_func;
}

function setMapDoubleClickCallbackFunction(new_func)
{
	map_double_click_callback_function = new_func;
}

function setMapClickListeners()
{
	google.maps.event.addListener(map, 'click', function(event) {
		mapClick(event.latLng);
	});
	google.maps.event.addListener(map, 'dblclick', function(event) {
		mapClick(event.latLng);
		if(map_double_click_callback_function)map_double_click_callback_function(event.latLng);
	});
}

function setMapMouseCallbackFunction(new_func)
{
	map_mousemove_callback_function = new_func;
}

function setMapMouseListeners()
{
	google.maps.event.addListener(map, 'mousemove', function(event) {
		if(typeof map_mousemove_callback_function == "function")map_mousemove_callback_function(event.latLng);
	});
}

function placeSearchedAddressMark(point)
{
	if(map)
	{
		if (addressMarker) {
			addressMarker.setMap(null);
		}

		addressMarker = new google.maps.Marker({
		  position: point,
		  map: map,
		  title:"Searched Address"
		});
		map.setCenter(point);
		map.setZoom(12);
	}
}

//merge defaults with options
function setMapOptions(options,update)
{
	if(typeof update == "undefined")update = false;
	if(typeof options == "undefined" || !options)options = new Array();
	if(typeof options['center'] == "undefined" || update)options['center']  = new google.maps.LatLng(40, -84);
	if(typeof options['zoom'] == "undefined")options['zoom'] = 1;
	if(typeof options['mapTypeId'] == "undefined")options['mapTypeId'] = google.maps.MapTypeId.ROADMAP;
	if(typeof options['tilt'] == "undefined" || update)options['tilt'] = 0;
	return options
}

function fromPixelToLatLng(pixel) {
  var scale = Math.pow(2, map.getZoom());
  var proj = map.getProjection();
  var bounds = map.getBounds();

  var nw = proj.fromLatLngToPoint(
    new google.maps.LatLng(
      bounds.getNorthEast().lat(),
      bounds.getSouthWest().lng()
    ));
  var point = new google.maps.Point();

  point.x = pixel.x / scale + nw.x;
  point.y = pixel.y / scale + nw.y;

  return proj.fromPointToLatLng(point);
}

function fromLatLngToPixel(position) {
  var scale = Math.pow(2, map.getZoom());
  var proj = map.getProjection();
  var bounds = map.getBounds();

  var nw = proj.fromLatLngToPoint(
    new google.maps.LatLng(
      bounds.getNorthEast().lat(),
      bounds.getSouthWest().lng()
    ));
  var point = proj.fromLatLngToPoint(position);

  return new google.maps.Point(
    Math.floor((point.x - nw.x) * scale),
    Math.floor((point.y - nw.y) * scale));
}
//TODO use for lines to snap based on a pixel distance
function pixelDistance(point_a,point_b)
{
	if(point_a && point_b)
	{
		return Math.sqrt(Math.pow(point_a.x - point_b.x,2)+Math.pow(point_a.y - point_b.y,2)).toFixed(2);
	}
}

//returns array of indexes in the point array and pixel distance from point which are within the pixel_radius
function findPointsInPixelRange(pixel_radius , point, point_array)
{
	if(!pixel_radius || !point || !point_array)return new Array();

	var return_array = new Array();
	var len = point_array.length;
	for (var i=0;i<len;i++)
	{
		var dist = pixelDistance(fromLatLngToPixel(point),fromLatLngToPixel(point_array[i]));
		if(dist<=pixel_radius)return_array.push(new Array(i,dist));
	}
	return return_array
}

var drawings = null;
var current_shape = null;
var drawingManager = null;
var temp_shape = null;

var mouse_draw = false;
var drag_line_start_point = null;
var mouseTraceLine = null;
var mouseMoveTraceHandler = null;
var workingLine = null;

function startDM(options)
{
	drawingSettings = setDefaultDrawingOptions(options);
	drawingManager = new google.maps.drawing.DrawingManager({
		drawingMode: null,
		drawingControl: false,
		drawingControlOptions: {
			position: google.maps.ControlPosition.TOP_CENTER,
			drawingModes: [
				google.maps.drawing.OverlayType.POLYGON,
				google.maps.drawing.OverlayType.RECTANGLE,
				google.maps.drawing.OverlayType.POLYLINE
			]
		},
		circleOptions: drawingSettings,
		polygonOptions: drawingSettings,
		polylineOptions: drawingSettings,
		rectangleOptions: drawingSettings
	});
	drawingManager.setMap(map);
	google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
		changeCurrentDrawing(null);
		if(event.type == google.maps.drawing.OverlayType.POLYGON || event.type == google.maps.drawing.OverlayType.POLYLINE) {
			if(event.type == google.maps.drawing.OverlayType.POLYGON)event.overlay.drawing_type = "polygon";
			if(event.type == google.maps.drawing.OverlayType.POLYLINE)event.overlay.drawing_type = "polyline";
			addPolygonEvents(event.overlay);
			if(event.type == google.maps.drawing.OverlayType.POLYGON)drawings['polygons'].push(event.overlay);
			if(event.type == google.maps.drawing.OverlayType.POLYLINE)drawings['polylines'].push(event.overlay);
			setDrawingMode(null);
			displayDrawingInfo(event.overlay);
		}
		else if(event.type == google.maps.drawing.OverlayType.RECTANGLE) {
			drawingManager.setDrawingMode(null);
		}
	});
	createDrawingSettingEvents();
}

function addPolygonEvents(polygon)
{
	google.maps.event.addListener(polygon.getPath(), 'set_at', function() {
	  displayDrawingInfo(polygon);
	});
	google.maps.event.addListener(polygon.getPath(), 'insert_at', function() {
	  displayDrawingInfo(polygon);
	});
	google.maps.event.addListener(polygon.getPath(), 'remove_at', function() {
	  displayDrawingInfo(polygon);
	});
	google.maps.event.addListener(polygon, 'click', function () {
		changeCurrentDrawing(polygon);
		displayDrawingInfo(polygon);
	});
}

function createDrawingSettingEvents()
{
	getFillControl().change( function () {
		updateDMSettings()
	});
	getStrokeControl().change( function () {
		updateDMSettings()
	});
	$("#only-show-border-map-control").change( function () {
		updateDMSettings()
	});
}

function setDrawingMode(mode)
{
	if(typeof mode == "undefined" || !mode)drawingManager.setDrawingMode(null);
	else
	{
		switch (mode) {
		  case "polygon":
		  case google.maps.drawing.OverlayType.POLYGON:
			drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
			break;
		  case "polyline":
		  case google.maps.drawing.OverlayType.POLYLINE:
		  	saveWorkingLine();
		  	mouse_draw = true;
		  	setMapDrawingModeOptions("on");
		  	changeCurrentDrawing(null);
			break;
		  default:
			drawingManager.setDrawingMode(null);
			break;
		}
	}
}

function updateDMSettings(options)
{
	drawingSettings = setDefaultDrawingOptions(options, true);
	drawingManager.setOptions({
		circleOptions: drawingSettings,
		polygonOptions: drawingSettings,
		polylineOptions: drawingSettings,
		rectangleOptions: drawingSettings
	});
}

function isCurrentlyDrawing()
{
	if(typeof drawingManager != "undefined" && drawingManager)
	{
		if(drawingManager.getDrawingMode()!=null)return true;
	}
	return false;
}


function initiateDrawingsArray()
{
	drawings = {};
	drawings['circles'] = new Array();
	drawings['polygons'] = new Array();
	drawings['polylines'] = new Array();
	drawings['rectangles'] = new Array();
}

function clearDrawings()
{
	if(typeof drawings != "undefined" && drawings)
	{
		for (var key in drawings)
		{
			for(var i=0;i<drawings[key].length;i++)
			{
				drawings[key][i].setMap(null);
				drawings[key][i] = null;
			}
		}
	}
	initiateDrawingsArray();
}

function changeCurrentDrawing(new_shape)
{
	if(current_shape)current_shape.setOptions({editable:false,draggable:false});
	if(typeof new_shape != "undefined" && new_shape)
	{
		current_shape = new_shape;
		new_shape.setOptions({editable:true,draggable:true});
	}
}

function setDefaultDrawingOptions(options,update)
{
	if(typeof update == "undefined")update = false;
	if(typeof options == "undefined" || !options)options = new Array();
	if(typeof options['strokeColor'] == "undefined" || update)options['strokeColor']  = getStrokeColor();
	if(typeof options['strokeOpacity'] == "undefined")options['strokeOpacity'] = 0.8;
	if(typeof options['strokeWeight'] == "undefined")options['strokeWeight'] = 2;
	if(typeof options['fillColor'] == "undefined" || update)options['fillColor'] = getFillColor();
	if(typeof options['fillOpacity'] == "undefined" || update)options['fillOpacity'] = getFillOpacity();
	if(typeof options['geodesic'] == "undefined" || update)options['geodesic'] = false;
	if(typeof options['editable'] == "undefined")options['editable'] = false;
	if(typeof options['draggable'] == "undefined")options['draggable'] = false;

	return options;
}

function createCircle(latLng,radius,options)
{
	options = setDefaultDrawingOptions(options);
	options['map']=map;
	options['center']=latLng;
	options['radius']=radius;

	var circle = new google.maps.Circle(options);
	circle.drawing_type = "circle";
	if(options['editable'])changeCurrentDrawing(circle);
	else changeCurrentDrawing(null);
	google.maps.event.addListener(circle, 'center_changed', function () {
		displayDrawingInfo(circle);
	});
	google.maps.event.addListener(circle, 'radius_changed', function () {
		displayDrawingInfo(circle);
	});
	google.maps.event.addListener(circle, 'click', function () {
		changeCurrentDrawing(circle);
		displayDrawingInfo(circle);
	});
	drawings['circles'].push(circle);
	displayDrawingInfo(circle);
}

function createPolygon(points,options,type)
{
	if(typeof type == "undefined")type = "polygon";
	if(type != "polygon" &&  type != "polyline")return false
	options = setDefaultDrawingOptions(options);
	options['map']=map;
	var path = new Array();
	for(i=0;i<points.length;i++)
	{
		path.push({lat:points[i][0], lng:points[i][1]});
	}
	options['path']=path;
	if(type == "polygon")var polygon = new google.maps.Polygon(options);
	if(type == "polyline")var polygon = new google.maps.Polyline(options);
	polygon.drawing_type = type;
	addPolygonEvents(polygon);
	if(type == "polygon")drawings['polygons'].push(polygon);
	if(type == "polyline")drawings['polylines'].push(polygon);
	return true;
}

function removeActiveDrawing()
{
	changeCurrentDrawing(null)
	removeDrawing(current_shape);
}

function removeDrawing(shape)
{
	if(!shape)return;
	shape.set("map",null);
	var drawing_type = getDrawingTypeOfShape(shape);
	if(typeof shape != "undefined" && shape)
	{
		var shapes = null;
		switch(drawing_type){
			case "circle":
			case "polygon":
			case "polyline":
				shapes = drawings[drawing_type + 's'];
				break;
			default:
				console.log("Drawing type '" + drawing_type +"' not recognized.");
		}

		if(shapes)
		{
			len = shapes.length;
			for(i=0;i<len;i++)
			{
				if(shape==shapes[i])
				{
					shapes.splice(i, 1);
					shape=null;
					displayDrawingInfo(shape);
				}
			}
		}
	}
}

function updateActiveDrawingOptions()
{
	console.log('update');
	updateDrawingOptions(current_shape,{editable:true,draggable:true});
	displayDrawingInfo(current_shape);
}

function updateDrawingOptions(shape,options)
{
	console.log(shape);
	if(!shape)return;
	drawing_type = getDrawingTypeOfShape(shape);
	var newOptions = setDefaultDrawingOptions(options,true);
	if(drawing_type == "circle")
	{
		if(typeof getInputRadius == "function")
		{
			radius = getInputRadius();
			if(radius && $.isNumeric(radius) && radius>0)newOptions['radius']=radius;
		}
	}
	shape.setOptions(newOptions);
}

function displayDrawingInfo(shape,element_id)
{
	if(typeof element_id == "undefined")element_id = 'info';
	var info = document.getElementById(element_id);
	if(shape && shape.map)
	{
		var drawing_type = getDrawingTypeOfShape(shape);
		if(drawing_type == "circle" || typeof shape.radius != "undefined")
		{
			if(typeof setInputRadius == "function")setInputRadius(shape);
			info.innerHTML = 'Position: ' + shape.getCenter().lat().toFixed(6) + ","  + shape.getCenter().lng().toFixed(6) + ' Radius: ' + shape.radius.toFixed(2) + " Meters";
		}
		if(drawing_type == "polygon")
		{
			var info_text = getAreaData(shape);
			info_text += "<br>";
			info_text += getPerimeterData(shape);
			info.innerHTML = info_text;
		}
		if(drawing_type == "polyline")
		{
			var info_text = getPerimeterData(shape);
			info.innerHTML = info_text;
		}
	}
	else info.innerHTML = '';
	if(typeof display_save_link == "undefined" || display_save_link)
	{
		if(typeof page_url != "undefined"){
			displaySaveLink(page_url,"comeback_link");
		}
	}
}

function getStrokeControl(){
	var colorPicker =  $("#border-map-control");
	if(colorPicker.length === 0){
		colorPicker = $("#line-color-map-control");
	}

	return colorPicker;
}

function getFillControl(){
	var colorPicker =  $("#circle-map-control");
	if(colorPicker.length === 0){
		colorPicker = $("#area-map-control");
	}

	return colorPicker;
}

function getStrokeColor()
{
	var colorPicker = getStrokeControl();
	var color = "#" + colorPicker.val();
	if(validHexColor(color))return color;
	else return "#000000";
}
function getFillColor()
{
	var colorPicker = getFillControl();
	var color = "#" + colorPicker.val();
	if(validHexColor(color))return color;
	else return "#000000";
}
function getFillOpacity()
{
	if($("#only-show-border-map-control").is(":checked"))return 0.0
	else return 0.4;
}

//using the form return the radius selected in meters
function getInputRadius()
{
	var radius = parseFloat($("input#radius-map-control").val());
	if(radius.length<1 || !$.isNumeric(radius))
	{
		alert("Enter a numeric radius");
		return false;
	}

	var radius_unit = $("select#radius-unit-map-control").val();
	switch(radius_unit)
	{
		case "Meters": return radius;
		case "KM": return radius*1000;
		case "Feet": return radius*0.3048;
		case "Miles": return radius*1609.34;
		default :
		{
			alert("Invalid radius unit");
			return false;
		}
	}
}

function setInputRadius(circle)
{
	var meters, input_value, radius_unit;

	if(typeof circle != "undefined")
	{
		meters = circle.radius;
		input_value = 1000;
		radius_unit = $("select#radius-unit-map-control").val();

		switch(radius_unit)
		{
			case "Meters":  { input_value = meters;				break;}
			case "KM": { input_value = meters/1000;			break;}
			case "Feet": { input_value = meters*3.28084;		break;}
			case "Miles": { input_value = meters*0.000621371;  break;}
			default :
			{
				alert("Invalid radius unit");
			}
		}
		$("input#radius-map-control").val(input_value.toFixed(2));
	}
}

function displaySaveLink(url, display_field)
{
	circle_define_string = "";
	if(typeof url == "undefined")return false;
	if(typeof display_field == "undefined")display_field = comeback_link;
	var url_arguments = "";
	if(loaded && typeof drawings != "undefined")
	{
		if(typeof drawings["circles"] != "undefined" && drawings["circles"].length > 0)
		{
			var circles = drawings["circles"];
			len = circles.length;
			if(len>0)
			{
				data = new Array();
				for(i=0;i<len;i++)
				{
					var c = circles[i];
					data[i] = new Array();
					data[i].push(parseFloat(c.radius.toFixed(2)));
					data[i].push(parseFloat(c.getCenter().lat().toFixed(7)));
					data[i].push(parseFloat(c.getCenter().lng().toFixed(7)));
					data[i].push(c.fillColor);
					data[i].push(c.strokeColor);
					data[i].push(c.fillOpacity);
				}
				circle_define_string = encodeURIComponent(JSON.stringify(data));
				url_arguments += "circles=" + circle_define_string;
			}

		}
		if(typeof drawings["polygons"] != "undefined" && drawings["polygons"].length > 0)
		{
			var polygons = drawings["polygons"];
			len = polygons.length;
			if(len>0)
			{
				data = new Array();
				for(i=0;i<len;i++)
				{
					var p = polygons[i];
					data[i] = new Array();
					data[i].push(getPathArray(p));
					data[i].push(p.fillColor);
					data[i].push(p.strokeColor);
					data[i].push(p.fillOpacity);
				}
				polygon_define_string = encodeURIComponent(JSON.stringify(data));
				if(url_arguments.length)url_arguments+="&";
				url_arguments += "polygons=" + polygon_define_string;
			}

		}
		if(typeof drawings["polylines"] != "undefined" && drawings["polylines"].length > 0)
		{
			var polygons = drawings["polylines"];
			len = polygons.length;
			if(len>0)
			{
				data = new Array();
				for(i=0;i<len;i++)
				{
					var p = polygons[i];
					data[i] = new Array();
					data[i].push(getPathArray(p));
					data[i].push(p.strokeColor);
				}
				polyline_define_string = encodeURIComponent(JSON.stringify(data));
				if(url_arguments.length)url_arguments+="&";
				url_arguments += "polylines=" + polyline_define_string;
			}

		}
		url = url + "?" + url_arguments;
		$("#"+display_field).html(url);
	}
}

function loadShapes(circle_array,polygon_array,polyline_array)
{
	if(typeof circle_array == undefined || !circle_array)circle_array = new Array();
	if(typeof polygon_array == undefined || !polygon_array)polygon_array = new Array();
	if(typeof polyline_array == undefined || !polyline_array)polyline_array = new Array();
	len = circle_array.length;
	var i = 0;
	for(i=0;i<len;i++)
	{
		circle = circle_array[i];
		createCircle(new google.maps.LatLng(circle[1], circle[2]),circle[0],{'fillColor':circle[3],'strokeColor':circle[4],fillOpacity:circle[5]});
	}
	len = polygon_array.length;
	for(i=0;i<len;i++)
	{
		polygon = polygon_array[i];
		createPolygon(polygon[0],{'fillColor':polygon[1],'strokeColor':polygon[2],'fillOpacity':polygon[3]},"polygon");
	}
	len = polyline_array.length;
	for(i=0;i<len;i++)
	{
		polygon = polyline_array[i];
		createPolygon(polygon[0],{'strokeColor':polygon[1]},"polyline");
	}
	loaded = true;
	zoomToAllShapes();
}


function zoomToAllShapes()
{
	bounds = new google.maps.LatLngBounds();
	var circles = drawings["circles"];
	len = circles.length;
	if(len>0)
	{
		data = new Array();
		for(i=0;i<len;i++)
		{
			var c = circles[i];
			bounds.union(c.getBounds());
		}
	}
	var polygons = drawings["polygons"];
	len = polygons.length;
	if(len>0)
	{
		data = new Array();
		for(i=0;i<len;i++)
		{
			var c = polygons[i];
			bounds.union(c.getBounds());
		}
	}
	var polygons = drawings["polylines"];
	len = polygons.length;
	if(len>0)
	{
		data = new Array();
		for(i=0;i<len;i++)
		{
			var c = polygons[i];
			bounds.union(c.getBounds());
		}
	}
	map.fitBounds(bounds);
}

function zoomToShape(shape)
{
	if(shape)map.fitBounds(shape.getBounds());
}

function getPathArray(polygon,return_type)
{
	if(typeof return_type == "undefined")return_type = "array";
	var drawing_type = getDrawingTypeOfShape(polygon);
	points  = polygon.getPath();
	path = [];
	for(var i=0;i<points.length;i++)
	{
		if(return_type == "object_array")path.push(points.getAt(i));
		if(return_type == "array")path.push(new Array(points.getAt(i).lat(),points.getAt(i).lng()));
	}
	if(drawing_type=="polygon" && points.length>2 && (points.getAt(0).lat() != points.getAt(points.length-1).lat() || points.getAt(0).lng() != points.getAt(points.length-1).lng()))
	{
		if(return_type == "object_array")path.push(points.getAt(0));
		if(return_type == "array")path.push(new Array(points.getAt(0).lat(),points.getAt(0).lng()));
	}
	var cleanPath = jQuery.extend([],path);
	return cleanPath;
}

function getAreaData(shape,return_type)
{
	if(typeof return_type == "undefined")return_type = "text";
	drawing_type = getDrawingTypeOfShape(shape);
	if(drawing_type == "polygon")
	{
		var polyPoints  = shape.getPath();
		//area calculation
		var meters = google.maps.geometry.spherical.computeArea(polyPoints);
		var kilometer = meters/1000000;
		var miles = meters * 0.000000386102159;
		var acre = meters * 0.000247105381;
		var feet = meters * 10.7639104;

		if(return_type == "text")info = "Area " + meters.toFixed(0) + " meters<sup>2</sup>, " + feet.toFixed(0) + " feet<sup>2</sup> " + acre.toFixed(2) + " acres " + miles.toFixed(3) + " miles<sup>2</sup> " + kilometer.toFixed(3) + " km<sup>2</sup>";
	}
	return info;
}

function getPerimeterData(shape,return_type)
{
	if(typeof return_type == "undefined")return_type = "text";
	drawing_type = getDrawingTypeOfShape(shape);
	if(drawing_type == "polygon" || drawing_type == "polyline")
	{
		var path  = shape.getPath();
		//area calculation
		meters = google.maps.geometry.spherical.computeLength(path);
		if(meters>100)extra_decimal=0;
		if(meters<100)extra_decimal=1;
		if(meters<10)extra_decimal=2;
		feet = meters * 3.28084;
		kilometer = meters/1000;
		miles = meters * 0.000621371192;
		if(drawing_type == "polygon")info = "Perimeter ";
		if(drawing_type == "polyline")info = "Distance ";
		if(return_type == "text")info += meters.toFixed(extra_decimal) + " meters , " + feet.toFixed(extra_decimal) + " feet " + miles.toFixed(3) + " miles " + kilometer.toFixed(3) + " km";
	}
	return info;
}

function getDrawingTypeOfShape(shape)
{
	var drawing_type = null;
	if(typeof shape.drawing_type != "undefined")drawing_type = shape.drawing_type;
	else if(typeof shape.radius != "undefined")drawing_type = "circle";
	return drawing_type;
}

function clearWorkingLine()
{
	if(typeof workingLine != "undefined" && workingLine)
	{
		workingLine.setMap(null);
		workingLine = null;
	}
}

function saveWorkingLine()
{
	if(typeof workingLine != "undefined" && workingLine)
	{
		addPolygonEvents(workingLine);
		drawings["polylines"].push(workingLine);
		workingLine = null;
		var polyline = drawings["polylines"][(drawings["polylines"].length-1)];
		addPolygonEvents(polyline);
		changeCurrentDrawing(polyline);
	}
	displayDrawingInfo(workingLine);
	turnOffMouseTrace();
}

function addToWorkingLine(point)
{
	if(typeof workingLine != "undefined" && workingLine)
	{
		var path = workingLine.getPath();
		path.push(point);
	}
	else if(typeof mouseTraceLine != "undefined" && mouseTraceLine)
	{
		var path = mouseTraceLine.getPath();
		startWorkingLine(path.getAt(0),point);
	}
}

function startWorkingLine(start,end)
{
	options = setDefaultDrawingOptions();
	options['map']=map;
	options['path'] = new Array({lat:start.lat(), lng:start.lng()},{lat:end.lat(),lng:end.lng()});
	options['clickable'] = false;
	workingLine = new google.maps.Polyline(options);
	workingLine.drawing_type = "polyline"
}

function turnOnMouseTrace(start_point)
{
	clearMouseTraceLine();
	drag_line_start_point = start_point;
	mouse_draw = true;
	setMapDrawingModeOptions("on");
}

function turnOffMouseTrace()
{
	clearMouseTraceLine();
	drag_line_start_point = null;
	mouse_draw = false;
	setMapDrawingModeOptions("off");
	snap_points = null;
}

function setMapDrawingModeOptions(mode)
{
	if(mode=="on")
	{
		setAllDrawingsClickable(false);
		map.setClickableIcons(false);
		map.setOptions({draggableCursor:'crosshair'});
	}
	if(mode=="off")
	{
		setAllDrawingsClickable(true);
		map.setClickableIcons(true);
		map.setOptions({draggableCursor:''});
	}
}

function mouseTraceClick(point)
{
	var save_it = false;
	if(mouseTraceLine)
	{
		new_point = snapMouseTracePoint(point)
		if(new_point.changed)
		{
			point = new_point.point;
			save_it = true;
		}
		addToWorkingLine(point);
		if(save_it)saveWorkingLine();
		else editMouseTraceStartPoint(point);
	}
	else turnOnMouseTrace(point);
}

function clearMouseTraceLine()
{
	if(mouseTraceLine)
	{
		google.maps.event.removeListener(mouseMoveTraceHandler);
		mouseTraceLine.setMap(null);
		mouseTraceLine = null;
	}

}

function editMouseTraceStartPoint(point)
{
	if(mouseTraceLine)
	{
		var path = new Array({lat:point.lat(), lng:point.lng()},{lat:point.lat(),lng:point.lng()});
		mouseTraceLine.setOptions({path:path});
	}
}

function drawMouseTraceLine(end_point,info_element_id)
{
	if(typeof info_element_id == "undefined")info_element_id = 'info';
	var info = document.getElementById(info_element_id);
	var save_it = false;
	if(mouseTraceLine)
	{
		var path = mouseTraceLine.getPath();
		new_point = snapMouseTracePoint(end_point);
		if(new_point.changed)
		{
			end_point = new_point.point;
		}
		path.pop();
		path.push(end_point);
		var info_text = "Section " + getPerimeterData(mouseTraceLine);
		if(workingLine)
		{
			path = workingLine.getPath();
			path.push(end_point);
			info_text += "<br/>Whole line " + getPerimeterData(workingLine);
			path.pop();
		}
		info.innerHTML = info_text;
	}
	else
	{
		if(mouse_draw && drag_line_start_point)
		{
			options = setDefaultDrawingOptions();
			options['map']=map;
			options['path'] = new Array({lat:drag_line_start_point.lat(), lng:drag_line_start_point.lng()},{lat:end_point.lat(),lng:end_point.lng()});
			options['clickable'] = false;
			mouseTraceLine = new google.maps.Polyline(options);
			mouseTraceLine.drawing_type = "polyline"
			mouseMoveTraceHandler = google.maps.event.addListener(mouseTraceLine, 'mousemove', function(e) {
				google.maps.event.trigger(map, "mousemove", e);
			});
			snap_points = new Array(drag_line_start_point);
		}
	}
}

function snapMouseTracePoint(test_point)
{
	if(test_point && typeof snap_points != "undefined" && snap_points)
	{
		if( workingLine && workingLine.getPath().length>2)
		{
			index_array = findPointsInPixelRange(5, test_point, snap_points);
			if(index_array)
			{
				if(index_array.length == 1)
				{
					return {point:snap_points[index_array[0][0]],changed:true};
				}
			}
		}
	}
	return {point:test_point,changed:false};;
}

function removeLastPointFromWorkingLine()
{
	if(workingLine)
	{
		path = workingLine.getPath();
		path.pop();
		var newTraceStartPoint = path.pop();
		path.push(newTraceStartPoint);
		editMouseTraceStartPoint(newTraceStartPoint);
	}
}

function setDrawingClickable(shape,clickable)
{
	var drawing_type = getDrawingTypeOfShape(shape);
	if(drawing_type)shape.setOptions({clickable:clickable});
	else shape.setOptions({clickable:clickable});//TODO: add other calls here is needed
}

function setAllDrawingsClickable(clickable)
{
	var circles = drawings["circles"];
	len = circles.length;
	for(i=0;i<len;i++)setDrawingClickable(circles[i],clickable);
	var polygons = drawings["polygons"];
	len = polygons.length;
	for(i=0;i<len;i++)setDrawingClickable(polygons[i],clickable);
	var polygons = drawings["polylines"];
	len = polygons.length;
	for(i=0;i<len;i++)setDrawingClickable(polygons[i],clickable);
}
