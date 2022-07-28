async function addBuildingGeoJSON() {
  // Load the GeoJSON file from Cesium ion.
  const geoJSONURL = await Cesium.IonResource.fromAssetId(your_asset_id_1);
  // Create the geometry from the GeoJSON, and clamp it to the ground.
  const geoJSON = await Cesium.GeoJsonDataSource.load(geoJSONURL, { clampToGround: true });
  // Add it to the scene.
  const dataSource = await viewer.dataSources.add(geoJSON);
  // By default, polygons in CesiumJS will be draped over all 3D content in the scene.
  // Modify the polygons so that this draping only applies to the terrain, not 3D buildings.
  for (const entity of dataSource.entities.values) {
	entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
  }
  // Move the camera so that the polygon is in view.
  viewer.flyTo(dataSource);
}


async function addOSMBuildings( viewer ) {
    // Add Cesium OSM Buildings.
    const buildingsTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
	
    // Hide individual buildings in this area using 3D Tiles Styling language.
    buildingsTileset.style = new Cesium.Cesium3DTileStyle({
      // Create a style rule to control each building's "show" property.
      show: {
        conditions : [
          // Any building that has this elementId will have `show = false`.
          ['${elementId} === 532245203', false],
          ['${elementId} === 332469316', false],
          ['${elementId} === 332469317', false],
          ['${elementId} === 235368665', false],
          ['${elementId} === 530288180', false],
          ['${elementId} === 530288179', false],
          // If a building does not have one of these elementIds, set `show = true`.
          [true, true]
        ]
      },
      // Set the default color style for this particular 3D Tileset.
      // For any building that has a `cesium#color` property, use that color, otherwise make it white.
      color: "Boolean(${feature['cesium#color']}) ? color(${feature['cesium#color']}) : color('#ffffff')"
    });	
}

function myGeometryTest01( viewer, ellipsoid )
{
	var polyline = viewer.entities.add({
	  polyline: {
		positions: Cesium.Cartesian3.fromDegreesArray([
		  126.97792962,
		  37.56609339058507,
		  126.9779522,
		  37.56609339058507,
		  126.9779522,
		  37.5656581877674,
		  126.97792962,
		  37.5656581877674,
		  126.97792962,
		  37.56609339058507,
		],
		ellipsoid ),
		width: 1,
		material: new Cesium.PolylineOutlineMaterialProperty({
		  color: Cesium.Color.YELLOW,
		  outlineWidth: 1,
		  outlineColor: Cesium.Color.RED,
		}),
		clampToGround: true
	  },
	});
	
	var polyline2 = viewer.entities.add({
	  polyline: {
		positions: Cesium.Cartesian3.fromDegreesArray([
			126.97792962,
			37.56565818354398,
			126.97738012949131,
			37.56565807953064,
			126.97738013493192,
			37.565640086474055,
			126.97792962,
			37.56564019048732,
			126.97792962,
			37.56565818354398			
		],
		ellipsoid ),
		width: 1,
		material: new Cesium.PolylineOutlineMaterialProperty({
		  color: Cesium.Color.YELLOW,
		  outlineWidth: 0,
		  outlineColor: Cesium.Color.RED,
		}),
		clampToGround: true
	  },
	});	
}



function myGeometryTest02( viewer, ellipsoid )
{
	var polyline = viewer.entities.add({
	  polyline: {
		positions: Cesium.Cartesian3.fromDegreesArray([
		  127.10323743548878,
		  36.048105089938583,
		  127.10323943548878,
		  36.048105089938583,
		  127.10323943548878,
		  36.048103089938583,
		  127.10323743548878,
		  36.048103089938583,
		  127.10323743548878,
		  36.048105089938583,
		],
		ellipsoid ),
		width: 1,
		material: new Cesium.PolylineOutlineMaterialProperty({
		  color: Cesium.Color.YELLOW,
		  outlineWidth: 1,
		  outlineColor: Cesium.Color.RED,
		}),
		clampToGround: true
	  },
	});
}


function myModelTest_glb( viewer )
{
	var scene = viewer.scene;
	// 원효대교 중간쯤.
	var position = Cesium.Cartesian3.fromDegrees( 126.945526605187, 37.52695615674003, 500 );
	var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame( position );
	var gltfmodel = Cesium.Model.fromGltf(
	{
		url : './SampleData/models/test/AB01_AF01.glb',
		show : true,                     // default
		modelMatrix : modelMatrix,
		scale : 1,
		name: "name_test1",
		debugShowBoundingVolume : true // default
	});
	var model = viewer.scene.primitives.add(gltfmodel);
	viewer.scene.primitives.add(model);
}



function myModelTest01( viewer )
{
	var scene = viewer.scene;
	// 원효대교 중간쯤.
	var position = Cesium.Cartesian3.fromDegrees( 126.945526605187, 37.52695615674003, 50 );
	var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame( position );
	var name = "test";
	var gltfmodel = Cesium.Model.fromGltf(
	{
		// 되는 모델.
		//url : './SampleData/models/test/60033_203075_draco.glb',
		url : './SampleData/models/test/3752_12692_drc.glb',
		//url : './SampleData/models/test/B_1_49_3.glb',
		show : true,                     // default
		modelMatrix : modelMatrix,
		scale : 1,
		name: name,
		debugShowBoundingVolume : false // default
	});
	var model = viewer.scene.primitives.add(gltfmodel);
	viewer.scene.primitives.add(model);
	

	// 서울시청 잔디.
	// 부산에코시티의 경우, 좌표가 같으면 아래와 같은 증상이 나옴.
	var position = Cesium.Cartesian3.fromDegrees( 126.9779522, 37.565661, 1 );
	var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame( position );
	var gltfmodel = Cesium.Model.fromGltf(
	{
		// 되는 모델.
		url : './SampleData/models/test/echocity3/Tile_+002_+003_+000.glb',
		show : true,                     // default
		modelMatrix : modelMatrix,
		scale : 1
	});
	viewer.scene.primitives.add(gltfmodel);	
	
	var position = Cesium.Cartesian3.fromDegrees( 126.9779522, 37.56588, 1 );
	var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame( position );
	var gltfmodel = Cesium.Model.fromGltf(
	{
		// 되는 모델.
		url : './SampleData/models/test/echocity3/Tile_+002_+004_+000.glb',
		show : true,                     // default
		modelMatrix : modelMatrix,
		scale : 1
	});
	viewer.scene.primitives.add(gltfmodel);	

	var position = Cesium.Cartesian3.fromDegrees( 126.978225, 37.565661, 1 );
	var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame( position );
	var gltfmodel = Cesium.Model.fromGltf(
	{
		// 되는 모델.
		url : './SampleData/models/test/echocity3/Tile_+003_+003_+000.glb',
		show : true,                     // default
		modelMatrix : modelMatrix,
		scale : 1
	});
	viewer.scene.primitives.add(gltfmodel);	
}