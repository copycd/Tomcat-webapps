	// Color by material checks for null values since not all
	// buildings have the material property.
	
	function tile3d_setStyle_None( tileset) {

		if( tileset == null || tileset == undefined )
		{
			return;
		}
		
		tileset.style = undefined;
	}

	
	function tile3d_setStyle_colorByMaterial( tileset, styleName ) {

		if( styleName == undefined )
		{
			tileset.style = undefined;
			return;
		}
		
		var properties = tileset.properties;
		if( false )
		{
			//if (Cesium.defined(properties) && Cesium.defined(properties.modelheight))
			{
			  tileset.style = new Cesium.Cesium3DTileStyle({
				defines: {
				  //height: "${feature['modelheight']}",
				  height: "Number(${modelheight})",
				},
				color: {
				  conditions: [
					["${height} > 50.0", "color('white')"],
					["${height} > 40.0", "color('skyblue', 0.5)"],
					["${height} > 30.0", "color('grey')"],
					["${height} > 25.0", "color('indianred')"],
					["${height} > 20.0", "color('lightslategrey')"],
					["${height} > 15.0", "color('lightgrey')"],
					["${height} > 10.0", "color('lightsteelblue')"],
					["true", "rgb(127, 59, 8)"], // This is the else case
				  ],
				},
			  });
			}
		}
		else if( styleName == 'building_solid' )
		{
			//if (Cesium.defined(properties) && Cesium.defined(properties.modelheight))
			{
				tileset.style = new Cesium.Cesium3DTileStyle({
					color: {
					  conditions: [
						["Number(${modelheight}) >= 300", "rgba(45, 0, 75, 0.5)"],
						["Number(${modelheight}) >= 200", "rgb(102, 71, 151)"],
						["Number(${modelheight}) >= 100", "rgb(170, 162, 204)"],
						["Number(${modelheight}) >= 50", "rgb(224, 226, 238)"],
						["Number(${modelheight}) >= 25", "rgb(252, 230, 200)"],
						["Number(${modelheight}) >= 10", "rgb(248, 176, 87)"],
						["Number(${modelheight}) >= 5", "rgb(198, 106, 11)"],
						["true", "rgb(127, 59, 8)"],
					  ],
					},
				});
  			}
		}
	}
	
	
	
	// Color features with conditions 거리에 따른 색상표현.
	function colorFeaturesWithConditions( tileset, lon, lat ) 
	{
		if( lon == null || lon == undefined )
			lon = 126.92612666419062;
		if( lat == null || lat == undefined )
			lat = 37.52357494172817;
		
	  tileset.style = new Cesium.Cesium3DTileStyle({
		  
		defines : {
			inLon : lon,
			inLat : lat,
			distance : "distance(vec2(${feature['lon']}, ${feature['Lat']}), vec2(126.92612666419062, 37.52357494172817) )",
		},			  
		color: {
		  conditions: [
			["${distance} > 0.010*0.3", "color('#d65c5c')"],
			["${distance} > 0.006*0.3", "color('#f58971')"],
			["${distance} > 0.002*0.3", "color('#f5af71')"],
			["${distance} > 0.0001*0.3", "color('#f5ec71')"],
			["true", "color('#ffffff')"],
		  ],
		},
	  });
	}	
	
	
	function tile3d_setStyle_showhide_timeSeries1( tileset, styleName, sdate, edate ) {

		if( styleName == undefined )
		{
			tileset.style = undefined;
			return;
		}
		
		// 현존 건물.
		if( edate == 0 )
		{
			edate = 30000101;
		}
		
		var properties = tileset.properties;
		if( false )
		{
			//if (Cesium.defined(properties) && Cesium.defined(properties.modelheight))
			{
			  tileset.style = new Cesium.Cesium3DTileStyle({
				defines: {
				  //height: "${feature['modelheight']}",
				  height: "Number(${modelheight})",
				},
				color: {
				  conditions: [
					["${height} > 50.0", "color('white')"],
					["${height} > 40.0", "color('skyblue', 0.5)"],
					["${height} > 30.0", "color('grey')"],
					["${height} > 25.0", "color('indianred')"],
					["${height} > 20.0", "color('lightslategrey')"],
					["${height} > 15.0", "color('lightgrey')"],
					["${height} > 10.0", "color('lightsteelblue')"],
					["true", "rgb(127, 59, 8)"], // This is the else case
				  ],
				},
			  });
			}
		}
		else if( styleName == 'building_TimeSeries' )
		{
			//if (Cesium.defined(properties) && Cesium.defined(properties.modelheight))
			{
				tileset.style = new Cesium.Cesium3DTileStyle({
					defines : {
						inSdate : sdate,
						inEdate : edate
					},					
					color: {
						conditions: [
							["Number(${SDate}) > 20000101", "color('white')"],
							["Number(${SDate}) > 19990101", "color('skyblue', 0.5)"],
							["Number(${SDate}) > 19980101", "color('lightsteelblue')"],
							["true", "rgb(127, 59, 8)"] // This is the else case
						]
					},					
					show: {
						conditions : [
							// Any building that has this elementId will have `show = false`.
							["Number(${SDate}) >= ${inSdate} && Number(${EDate}) <= ${inEdate}", true],
							[true, false]
						]
					}
				});
			}
		}
	}	