
<script>
    
    export let data;

    let reports_data = data.props.reports;
    const reports_geo = data.props.report_geojson.features;
    // console.log( reports_geo )
    console.log( reports_data )
    // reports_data = reports_data.filter(report => report.fields.has_report === "Y");

    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    let mapElement;
    let map;
    let active_polygon;

    onMount(async () => {
        if(browser) {

            const L = await import('leaflet');

            map = L.map(mapElement).setView([40.7128, -74.0060], 11);
            map.zoomControl.setPosition('bottomright');

            L.tileLayer( "https://api.mapbox.com/styles/v1/cankadir/clplqlyio001o01qmewg54ov3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2Fua2FkaXIiLCJhIjoiY2pteXplNnEzMHF3YTNrcGx0dGd4MmJrdiJ9.zbhQ39YIdfZufTljuTSl1w" , {
                attribution: '© designed by Studio 2263'
            }).addTo(map);
            
            // From each reports_data, get id in the fields dictionary and create an arracy with the values
            const report_ids = reports_data.map(report => report.fields.id);
            // filter reports_geo with the report_ids
            const filtered_reports_geo = reports_geo.filter(d => report_ids.includes(d.properties.id));

            // POLYGON LAYER
            const polygonStyle = {
                fillcolor: '#C4E2FF',
                weight: 1,
                fillOpacity: 0.2,
                color: '#4580BA'

            };

            // Add id to each polygon in options to be replicated in the click event
            function polygonProps(feature, layer) {
                const id = feature.properties.id;
                layer.options.id = id;
            }

            // Create a geojson layer with the filtered reports
            const geojsonLayer = L.geoJSON(
                filtered_reports_geo,
                {
                    style: polygonStyle,
                    onEachFeature: polygonProps,
                }
            ).addTo(map);

            // Create ids for polygons and define click event
            geojsonLayer.eachLayer(function (polygon) {
                polygon._path.id = polygon.options.id;
                polygon._path.classList.add('report-bound');

                polygon.on('click', function (e) {
                    // add a class to the clicked polygon called clicked and remove all clicked classes from other polygons
                    const clicked = document.querySelectorAll('.report-bound.map-clicked');
                    clicked.forEach((el) => el.classList.remove('map-clicked'));
                    e.target._path.classList.add('map-clicked');
                    active_polygon = e.target._path.id;
                   
                    // center map on clicked polygon
                    let center = e.target.getBounds().getCenter();
                    map.panTo(center);

                    // set the selected option to the clicked polygon
                    const select = document.querySelector('select');
                    // find value from the data based on active_polygon id
                    const report = reports_data.find(report => report.fields.id === active_polygon);
                    select.value = report.fields.labels;
                });
                    
            }); 

            // Match dropdown selection with map click
            const select = document.querySelector('select');
            select.addEventListener('change', function(e) {
                const id = e.target.selectedOptions[0].id;
                console.log(id);
                active_polygon = id;

                // remove all clicked classes from other polygons
                const clicked = document.querySelectorAll('.report-bound.map-clicked');
                clicked.forEach((el) => el.classList.remove('map-clicked'));

                // find the polygon with the id and add the clicked class
                const polygon = document.querySelector(`.report-bound[id="${id}"]`);
                polygon.classList.add('map-clicked');
        
            });
        }
    });


    // Get the image from the report based on the active_polygon
    function getImage( active_polygon ) {
        const report = reports_data.find(report => report.fields.id === active_polygon);
        const thumbnail = report.fields.thumbnail[0].url;
        return thumbnail;
    }
 

</script>


<div class="reports-container">
    <!-- Panel is offsetted -->
    <div class="panel">
        <div class="content">
            <h1>Neighborhood Flood Reports</h1>
            <h2>Access a Local Flood Report </h2>

                <!-- Create a dropdown elements where the fields are report.fields.labels -->
                <select>
                    {#each reports_data as label}
                        {#if label.fields.has_report === "Y"}
                            <option id="{label.fields.id}">{label.fields.labels}</option>
                        {/if}
                    {/each}
                </select>

            <h3>Select an area from the map</h3>
            <p>Local floods reports are updated twice a year for neighborhoods with flood sensors. The reports cover flood sensor data, flood reports, 311 flood related complaints through visualizations, photos and statistics. </p>
            
            <div class="report-smallpic">
                {#if active_polygon}
                    <img src="{getImage(active_polygon)}" alt="Report" class="report-viz">
                {/if}
            </div>

            <div class="panel-footer">
                {#if active_polygon}
                    <div class="footer-button">download</div>
                    <div class="footer-button">pdf</div>
                    <div class="footer-button">Image</div>
                {/if}
            </div>

        </div>
    </div>


    <!-- Map is here -->
    <div class="map" bind:this={mapElement}></div>
</div>


<style>

    .report-viz {
        width: 100%;
        height: auto;
    }

    .panel-footer {
        height: 80px;
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(3, 1fr);
    }

    .panel{
        position: absolute;
        width: 30%;
        height: 100%;
        padding: 1rem;
        overflow-y: auto;
        display: flex;
        top:0;
        left:0;
        background: transparent;
        box-sizing: border-box;
    }

    .panel > .content {
        background: var(--blue);
        display: flex;
        flex-direction: column;
        z-index: 10000;
        padding: 0.5rem;
    }

    .reports-container {
        position: relative;
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
    }

    .map {
        height: 100%;
        width: 100%;
    }

    :global(.map-clicked) {
        fill: var(--orange) !important;
        fill-opacity: 0.8;
        transition: linear 0.15s;
    }


</style>