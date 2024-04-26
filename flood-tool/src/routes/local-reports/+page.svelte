
<script>
    
    export let data;

    let reports_data = data.props.reports;
    const reports_geo = data.props.report_geojson.features;

    // console.log(reports_data);
    console.log(reports_geo);

    reports_data = reports_data.filter(report => report.fields.has_report === "Y");
    console.log(reports_data);

    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    let mapElement;
    let map;

    onMount(async () => {
        
        if(browser) {
            const leaflet = await import('leaflet');

            map = leaflet.map(mapElement) //.setView([51.505, -0.09], 13);

            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // create and map a ploygon layer from reports_geo
            const geojsonLayer = leaflet.geoJSON(reports_geo).addTo(map);
            // fit the map to the geojson layer
            map.fitBounds(geojsonLayer.getBounds());

            
        }
    });

    // onDestroy(async () => {
    //     if(map) {
    //         console.log('Unloading Leaflet map.');
    //         map.remove();
    //     }
    // });

</script>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>


<div class="reports-container">
    <div class="panel">
        <div class="content">
            <h1>Local Reports</h1>

                <!-- Create a dropdown elements where the fields are report.fields.labels -->
                <select>
                    {#each reports_data as label}
                        {#if label.fields.has_report === "Y"}
                            <option>{label.fields.labels}</option>
                        {/if}
                    {/each}
                </select>


        </div>
    </div>
    <div class="map" bind:this={mapElement}></div>
</div>


<style>

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
        display: flex;
        flex-direction: column;
        background-color: #f4f4f4;
        z-index: 10000;
        background: var( --blue );
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
</style>