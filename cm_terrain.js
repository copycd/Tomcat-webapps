
//import GoogleEarthEnterpriseMetadata from "../Source/Core/GoogleEarthEnterpriseMetadata.js";


function getTerrainProvider_Seoul()
{

	var id = 29012;	// 서울 5m dem을 cesium ion에 올려서 서비스 받는 코드.
	//var id = 243821;	// 서울시청 근처 1m DEM
	var terrainProvider = new Cesium.CesiumTerrainProvider({
		url : Cesium.IonResource.fromAssetId(id)
		// maptiler에서 제공하는 무료
		//url: 'https://maps.tilehosting.com/data/terrain-quantized-mesh/?key={key}' // get your own key at https://cloud.maptiler.com/
		//ellipsoid : targetEllipsoid
	});
	return terrainProvider;
}

function getTerrainProvider_SeoulCityholl()
{
	var terrainProvider = new Cesium.CesiumTerrainProvider({
		url : 'http://localhost:8080/cesium/Apps/SampleData/dem/seoul_cityholl_tms2'
	});
	return terrainProvider;
}

function getTerrainProvider_World()
{
	var terrainProvider = Cesium.createWorldTerrain({
		requestWaterMask: true,
		requestVertexNormals: false
	});
	return terrainProvider;
}

function getTerrainProvider_Ellipsoid()
{
	return new Cesium.EllipsoidTerrainProvider();
}


function getTerrainProvider_VRTheWorldTerrain()
{
	const terrainProvider = new Cesium.VRTheWorldTerrainProvider({
	  url: "http://www.vr-theworld.com/vr-theworld/tiles1.0.0/73/",
	  credit: "Terrain data courtesy VT MÄK",
	});
	
	return terrainProvider;
}



function getTerrainProvider_GoogleEarthEnterpriseTerrain()
{
	const geeMetadata = new GoogleEarthEnterpriseMetadata('http://www.example.com');
	const terrainProvider = new Cesium.GoogleEarthEnterpriseTerrainProvider({
		metadata : geeMetadata
	});
	
	return terrainProvider;
}


// 이것도 권한이 있어야함.
function getTerrainProvider_CesiumIonTerrain()
{
    const terrainProvider = new Cesium.CesiumTerrainProvider({
        url : Cesium.IonResource.fromAssetId(3956),
        requestVertexNormals : true
    });
	
	return terrainProvider;
}


function getTerrainProvider_ArcGISTiledElevationTerrain()
{
	const terrainProvider = new Cesium.ArcGISTiledElevationTerrainProvider({
	  url:
		"https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
	});
	
	return terrainProvider;
}