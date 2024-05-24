<script>
    import { browser } from '$app/environment';
    // I can make this better using a library or something
    let screenWidth;
    $: isMobile = screenWidth <= 500;
    $: isTablet = screenWidth > 500 && screenWidth <= 960;
    $: isDesktop = screenWidth > 960;

    let appstore = "https://apps.apple.com/us/app/mycoast/id1530135797";
    let playstore = "https://play.google.com/store/apps/details?id=edu.ucsb.geog.mycoast";


    import { onMount } from 'svelte';

    let map;
    let currentLocation;
    let mapElement;

    onMount(async () => {
        if(browser) {

            const L = await import('leaflet');

            map = L.map(mapElement).setView([40.7128, -74.0060], 11);
            map.zoomControl.setPosition('bottomright');

            L.tileLayer( "https://api.mapbox.com/styles/v1/cankadir/clplqlyio001o01qmewg54ov3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2Fua2FkaXIiLCJhIjoiY2pteXplNnEzMHF3YTNrcGx0dGd4MmJrdiJ9.zbhQ39YIdfZufTljuTSl1w" , {
                attribution: '© designed by Studio 2263'
            }).addTo(map);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords;
                    L.marker([latitude, longitude]).addTo(map);
                    map.setView([latitude, longitude], 16);
                });
            }

            map.on('click', (e) => {
                console.log(e.latlng);
                const latitude = e.latlng.lat;
                const longitude = e.latlng.lng;
                // remove all existing markers
                map.eachLayer((layer) => {
                    if(layer instanceof L.Marker){
                        map.removeLayer(layer);
                    }
                });
                // console.log(latitude, longitude);
                L.marker([latitude, longitude]).addTo(map);
                map.setView([latitude, longitude], 16);
            });
            
        }
    });
    
</script>

<div class="page-content" bind:clientWidth={screenWidth}>
    {#if isDesktop }

        <div class="title">
            <h2>Submit your data to MyCoast</h2>
            <p>MyCoast is a citizen science project that allows you to submit photos and information about coastal events, such as flooding, erosion, and king tides. Your data will help scientists and managers better understand and address coastal hazards.</p>
        </div>

        <h3>1.Add Photo</h3>

        <div class="survey">
            <div class="query">
                <h4>Select Photo</h4>
                <input type="file" accept="image/*" />
            </div>
            <div class="query">
                <h4>Date of Photo</h4>
                <input type="date" />
            </div>
            <div class="query">
                <h4>Time of Photo</h4>
                <input type="time" />
            </div>
            <div class="query">
                <h4>Alternate location name (optional)</h4>
                <input type="text">
            </div>
            
            <div class="query">
                <h4>Cause of flooding, if known</h4>
                <label>
                    <input type="checkbox" value="Overland flooding (Nearby waterbody)" />
                    Overland flooding (Nearby waterbody)
                </label>
                <label>
                    <input type="checkbox" value="Rainfall (Water pooling from direct rainfall)" />
                    Rainfall (Water pooling from direct rainfall)
                </label>
                <label>
                    <input type="checkbox" value="Storm drain (Water pooling near a storm drain)" />
                    Storm drain (Water pooling near a storm drain)
                </label>
                <label>
                    <input type="checkbox" value="Broken pipes/water main break" />
                    Broken pipes/water main break
                </label>
                <label>
                    <input type="checkbox" value="Unsure" />
                    Unsure
                </label>
                <label>
                    <input type="checkbox" value="Other" />
                    Other
                </label>
            </div>
            
            <div class="query">
                <h4>What is flooded?</h4>
                <label>
                    <input type="checkbox" value="Roads/streets" />
                    Roads/streets
                </label>
                <label>
                    <input type="checkbox" value="Sidewalks" />
                    Sidewalks
                </label>
                <label>
                    <input type="checkbox" value="Parking lots" />
                    Parking lots
                </label>
                <label>
                    <input type="checkbox" value="Lawns/vegetation" />
                    Lawns/vegetation
                </label>
                <label>
                    <input type="checkbox" value="Structures" />
                    Structures
                </label>
                <label>
                    <input type="checkbox" value="Other" />
                    Other
                </label>
            </div>
            
            <div class="query">
                <h4>Estimated water depth (inches)</h4>
                <input name="input_37" id="input_92_37" type="number" step="any" value="" >
            </div>
            <div class="query">
                <h4>Comments</h4>
                <textarea></textarea>
            </div>

            <div class="query">
                    <h4>Location</h4>
                    <p>Click on the map to select the location of the photo or allow the browser to detect the location automatically.</p>
                    <div class="map" style="height:400px;" bind:this={mapElement}></div>
            </div>

            <div class="query">
                <h4>
                    By clicking “SUBMIT,” I authorize this photo & data to be used with or without attribution.
                    Hide my name on this report
                </h4>
                <input type="radio" value="yes" name="authorization" id="yes" />
                <label for="yes">Yes</label>
                <input type="radio" value="no" name="authorization" id="no" />
                <label for="no">No</label>

            </div>

            <button class="submit">Submit</button>

        </div>
    
    
    {/if}

    {#if isMobile || isTablet}
        <div class="response">
            <a href="{appstore}">Download the app on App Store</a>
            <a href="{playstore}">Download the app on Google Play</a>
        </div>
    {/if}

</div>

<style>

    label{
        display: block;
        margin-bottom: 0.25rem;
    }

    .submit{
        width: 100%;
        height: 75px;
        border-radius: 15px;
        background-color: var(--orange);
        color: var(--white);
        margin-top: 2rem;
        padding: 0.5rem 1rem;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: bold;
    }

    .survey{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 720px;
    }

    .query > h4 {
        margin-bottom: 0.5rem;
    }

    .page-content{
        max-width: 1200px;
        margin: 6rem auto;
    }

    /* if smaller than 1200px */
    @media screen and (max-width: 1200px){
        .page-content{
            width:100%;
            padding: 0 6rem;
            box-sizing: border-box;
        }
    }


    textarea{
        width: 100%;
        height: 100px;
    }


</style>