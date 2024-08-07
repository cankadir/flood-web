
<script>
    
    // Read data from Airtable

    export let data;

    let reports_data = data.props.reports;
    const reports_geo = data.props.report_geojson.features;

    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let mapElement;
    let map;
    let active_polygon;

    let showModal = false; // show modal for the report
    let pad = 1.3; // padding for the panel

    onMount(async () => {
        if(browser) {

            // Load leaflet
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
                layer.options.id = feature.properties.id;
            }

            // Create a geojson layer with the filtered reports
            const geojsonLayer = L.geoJSON(
                filtered_reports_geo,
                {
                    style: polygonStyle,
                    onEachFeature: polygonProps,
                }
            ).addTo(map);

            // Create ids for polygons and define click event, click evet sets the active_polygon
            let polygonClicked = false; // use this to test if the map or the polygon was clicked
            geojsonLayer.eachLayer(function (polygon) {
                polygon._path.id = polygon.options.id;
                polygon._path.classList.add('report-bound');
                polygon.on('click', function (e) {
                    polygonClicked = true;
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
                active_polygon = id;

                // remove all clicked classes from other polygons
                const clicked = document.querySelectorAll('.report-bound.map-clicked');
                clicked.forEach((el) => el.classList.remove('map-clicked'));

                // find the polygon with the id and add the clicked class
                const polygon = document.querySelector(`.report-bound[id="${id}"]`);
                polygon.classList.add('map-clicked');
            });

            // if the map is clicked but not a polygon, remove the active_polygon
            map.on('click', function(e) {
                // check if the clicked element is a polygon
                console.log( polygonClicked );
                if (polygonClicked === false) {
                    // remove active polygon
                    active_polygon = null;
                
                    // remove active styling from all polygons
                    const clicked = document.querySelectorAll('.report-bound.map-clicked');
                    clicked.forEach((el) => el.classList.remove('map-clicked'));
                    // reset the selected option to the default
                    const select = document.querySelector('select');
                    select.value = select.options[0].value;
                }
                polygonClicked = false;
            });
        }
    });


    // Get the image from the report based on the active_polygon
    function getImage( active_polygon ) {
        const report = reports_data.find(report => report.fields.id === active_polygon);
        const thumbnail = report.fields.thumbnail[0].url;
        return thumbnail;
    }

    // listen for change in active_polygon and if it has a value, set the panel height to 100%
    $: if(active_polygon) {
        const panel = document.querySelector('.panel');
        panel.style.height = '100%';
    }

    function report_download(e){
        // get clicked button id
        const queryID = e.target.parentElement.id;
        const report = reports_data.find(report => report.fields.id === active_polygon);

        // Download the relevant report, using Airtable links.
        let report_url = queryID === 'pdf' ? report.fields.Report[0].url : report.fields.thumbnail[0].thumbnails.full.url;
        window.open(report_url, '_blank');
    }

</script>

{#if showModal}
    <div class="report-modal" aria-label="Larger view of the printed local report">
        <button on:click={()=>showModal=false} style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;border:none;padding:0;margin:0;" aria-label="Close modal"></button>
        <div class="report-display">
            <img src="{getImage(active_polygon)}" alt="Printed local report" class="report-viz" style="border:#333 solid 1px" /> 
            
            <button class="report-close" on:click={() => showModal = false} aria-label="Close modal">
                <img src="./assets/icons/FN_FW_UI_icon_open.svg" alt="" aria-hidden="true" width="100%" height="100%" style="transform:rotate(45deg)">
            </button>
        </div>    
    </div>
{/if}

<div class="reports-container">
    <!-- Panel is offsetted -->
    <div class="panel">
        <div class="content">
            <div class="map-title" style="padding: 0 {pad}rem;">
                <img src="./assets/icons/FN_FW_report_icon.svg" alt="" aria-hidden="true" width="70px" height='auto' style="filter:invert(1);">
                <h1 style="font-size:1.75rem;margin:0 0 1.5rem 0">Neighborhood<br>Flood Reports</h1>
            </div>
            <h2 style='margin-top:0;margin-bottom:1rem;padding:0 {pad}rem'>Access a Local Flood Report</h2>
            <h3 style='margin-top:0;margin-bottom:1rem;padding:0 {pad}rem'>Select a neighborhood from the map or dropdown</h3>

            <!-- Create a dropdown elements where the fields are report.fields.labels -->
            <div style="padding:0 {pad}rem;">
                <p>View report for:</p>

                <div class="styled-select">
                    <select class="custom-select">
                        <option disabled selected>Select a neighborhood</option>
                        {#each reports_data as label}
                            {#if label.fields.has_report === "Y"}
                                <option id="{label.fields.id}">{label.fields.labels}</option>
                            {/if}
                        {/each}
                    </select>
                </div>

            </div>

            
            {#if active_polygon}
                <div class="report-smallpic" style="padding:1rem {pad}rem">
                    <!-- create a transparent button that covers the full div -->
                    <button on:click={()=>showModal=true} style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;border:none;padding:0;margin:0;" aria-label="View report larger in a modal"></button>
                    <h3 style="margin:0.5rem;">{reports_data.find(report => report.fields.id === active_polygon).fields.labels}</h3>
                    <p>Click on the image below to view the report larger in the browser</p>
                    <img src="{getImage(active_polygon)}" alt="Printed Local Report Report for the selected region" class="report-viz" />        
                </div>
            {:else}
                <div class="info" style="padding:0 {pad}rem">
                    <p>Neighborhood flood reports were created in conversation with communities in flood prone areas across NYC who wanted an easy way to gather verified information about flooding their neighborhoods. You could use these reports to share information with your elected officials, as a classroom tool, or to organize your community to find ways to prepare for and respond to flooding. If you have questions or want to share a story about how you’ve used these reports, get in touch with us!</p>
                    <p><strong>Contribute your own information:</strong><br>Submit a flood photo to the MyCoast NY app, and you may see your experience reflected in the next set of neighborhood flood reports.</p>
                </div>
            {/if}
            
            {#if active_polygon}
                <div class="panel-footer">
                    <div class="footer-button">Download </div>
                    
                    {#each ['pdf','img'] as reporttype}
                        <button class="download" on:click={(e) => report_download(e)} id="{reporttype}" aria-label="download the report for {reports_data.find(report => report.fields.id === active_polygon).fields.labels}">
                            <div class="footer-button">{reporttype.toLocaleUpperCase()}</div>
                            <img src="./assets/icons/FN_FW_UI_icon_download.svg" alt="" aria-hidden="true" width="25px" height="25px">
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    </div>

    <!-- Leaflet Map is here -->
    <div class="map" bind:this={mapElement} aria-label="Interactive map showing regions with reports. Use the dropdown menu to access the same report."></div>
</div>


<style>

    .report-close{
        position: absolute;
        top: 10px;
        right: 10px;
        width: 35px;
        height: 35px;
        background-color: transparent;
        border: none;
        padding: 0;
        margin: 0;
        filter: invert(60%) sepia(11%) saturate(1646%) hue-rotate(169deg) brightness(92%) contrast(97%) !important;
    }

    .report-modal{
        position: absolute;
        display: flex;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.7);
        justify-content: center;
        align-items: center;
        z-index: 100000;
    }

    .report-display{
        position: relative;
        width: 80%;
        height: auto;
        max-width: 1200px;
        background-color: white;
        justify-content: center;
        align-items: center;
        padding: 3rem;
        box-sizing: border-box;
    }

    .map-title{
        display:flex; 
        gap: 1rem;
        margin: 0;
        align-items: start;
        margin-bottom:1rem;
    }

    select {
        width:100%;
        padding: 0 0 0 10px;
        color: var(--orange);
        font-size: 1rem;
        font-weight: bold;
        background-color: white;
        line-height: 1.25rem;
        border: none;
        border-radius: 5px;
        height: 34px;
        background: url(/assets/icons/FN_FW_UI_icon_dropdown_orange.svg) no-repeat right #ddd;
        background-size: 1.25rem;
        appearance:none;
        -moz-appearance:none; /* Firefox */
        -webkit-appearance:none; /* Safari and Chrome */
        background-position-x: calc(100% - 10px);
    }

    button{
        cursor: pointer;
    }

    .download{
        background-color: var(--blue);
        border: none;
        padding: 0;
        margin: 0;
        color: var(--white);
        font-weight: bold;
    }

    .download > img{
        filter: invert(1);
    }

    .report-viz {
        width: 100%;
        height: auto;
    }

    .panel-footer {
        height: 50px;
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(3, 1fr);
        color: var(--white);
        font-size: 1.1rem;
        padding: 0.5rem;
    }

    .footer-button{
        margin-bottom: 0.25rem;
    }

    .panel{
        position: absolute;
        min-width: 400px;
        max-width: 600px;
        max-height: 100vh;
        width: 30%;
        height: auto;
        padding: 1rem;
        overflow-y: hidden;
        display: flex;
        top:0;
        left:0;
        background: transparent;
        box-sizing: border-box;

    }

    .panel > .content {
        width:100%;
        overflow-y: auto;
        background: var(--blue);
        display: flex;
        flex-direction: column;
        z-index: 1000;
        border-radius: 10px;
        padding: 2rem 0;
        border-bottom: 0.5rem solid var(--blue);
        border-top: 0.5rem solid var(--blue);
        box-sizing: border-box;
    }

    .reports-container {
        position: relative;
        width: 100%;
        height: 100%;
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

    .info{
        margin: 1rem 0;
    }

    .info > p {
        margin: 1rem 0;
        padding: 0;
        font-size: 1.2rem;
    }

    .report-smallpic{
        margin: 1.5rem 0;
        background-color: var(--orange);
        position: relative;
    }

    /* styleing the scrollbar */
    .content {
        scrollbar-width: thin;
        scrollbar-color: #ccc transparent;
    }

    .content::-webkit-scrollbar {
        width: 6px;
    }

    .content::-webkit-scrollbar-track {
        background-color: transparent;
    }

    .content::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 3px;
    }

</style>