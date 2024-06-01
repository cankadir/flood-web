<script>

    let screenWidth;
    let item_width = 10
    $: item_count = Math.floor(screenWidth / item_width);
    $: count_array = Array.from({ length: item_count }, (_, i) => i);

</script>

<section>

    <div class="title">
        <!-- <div class="logo" style="width:70px;height:auto;filter:invert(1)">
            <img src=".\assets\icons\FN_FW_prepare_icon.svg" alt="prepare logo" width="100%" height="100%" />
        </div> -->
        <div class="title-info">
            <h1>About this project</h1>
            <p style="font-size:1.5rem">Flood Resources & Flood Risk Information</p>
        </div>
    </div>


    <div class="line-container" bind:clientWidth={screenWidth}>
        {#each count_array as index}
            <hr class="line" >    
        {/each}
    </div>

    <div class="box">
        <p class="box-text">This website brings together multiple sources of data about flooding in NYC, including links to official information about flood risk, quantitative data about the frequency and depth of measured street-level floods, as well as photographs of flooding submitted by residents across the city. This information is intended to be a resource for communities as they educate and advocate for resources related to flood resilience. Neighborhood Flood Reports contain a summary of historical information about how often flooding occurs and what it looks like at the neighborhood level. These reports are updated multiple times per year and are designed to be easily downloaded and shared with neighbors, advocates, and decision makers.</p>
    </div>

    <div class="box">
        <div class="subtitle">
            <img src="/assets/icons/FN_FW_observation_icon.svg" alt="Flood Net logo">
            <h2>About Community Flood Watch Project</h2>
        </div>

        <p class="box-text">The <a href="https://srijb.org/jbfloodwatch/">Community Flood Watch Project</a> is a collaboration between New York Sea Grant and the Science and Resilience Institute at Jamaica Bay that serves a growing network of residents and organizations who report local flooding, share experiences, and access resources related to flooding in NYC coastal communities. Flood Watch has two main areas of focus: (1) building a public archive of flood photos through community science and (2) carrying out programs aimed at increasing community flood resilience through collaborative research, workshops, talks, and, and the <a href="https://srijb.org/jamaica-bay-community-flood-fellowship-program/">Community Flood Fellowship series</a>.</p>
        <p class="box-text">The Flood Watch photo archive is a community science initiative that documents where flooding occurs, what it looks like, and how it is changing. Photo reports are collected using the <a href="https://mycoast.org/ny/flood-watch">MyCoast NY Flood Watch tool</a>, which links photographs and narrative information to weather data, tide gauge readings, and other environmental information. Researchers use these reports to visualize how “normal” high tides could look in the future due to sea level rise, and to improve forecasts of flooding and coastal hazards. Communities can use this shared database of images, reports and maps to communicate their neighborhood’s needs and visions to city leaders.</p>
        <p class="box-text">Flood Watch began in 2018, and it is co-led by New York Sea Grant and the Science and Resilience Institute at Jamaica Bay, and produced in collaboration with the NYC Mayor’s Office of Climate and Resiliency, Stevens Institute of Technology, NYC Office of Emergency Management, US Forest Service Urban Field Station, and valued community partners, including the New Hamilton Beach Civic Association, Broad Channel Civic Association, Meyers Emergency Management, Rockaway Initiative for Sustainability and Equity (RISE), Rockaway Beach Civic Association, City Island Rising Inc., Coney Island Beautification Project.</p>
    </div>

    <div class="box">
        <div class="subtitle">
            <img src="/assets/icons/FN_FW_sensor_icon.svg" alt="Flood Net logo">
            <h2>About FloodNet</h2>
        </div>
        <p class="box-text">FloodNet’s mission is to develop tools for real-time urban flood monitoring, implement these tools to measure flooding in New York City, and make flood data and monitoring tools available in a manner that is accessible and useful to stakeholders including residents, community-based organizations, government agencies, and researchers. The FloodNet team is composed of researchers and practitioners at New York University, the City University of New York, and New York City government agencies working in collaboration with stakeholders to collect and share data that contribute toward flood risk mitigation and building community flood resilience.  FloodNet began in 2020 as a partnership between academic researchers at New York University (NYU) and City University of New York (CUNY), and NYC agencies, including the Mayor’s Office of Climate & Environmental Justice, NYC Department of Environmental Protection (DEP), and NYC Office of Technology & Innovation. Together, the group works with various stakeholders and in consultation with community organizations to monitor hyperlocal street-level flooding in NYC.</p>
        <h3>Sensors & Data</h3>
        <p class="box-text">All FloodNet sensor data can be viewed publicly on our data dashboard (<a href="https://dataviz.floodnet.nyc/">https://dataviz.floodnet.nyc/</a>). The dashboard landing page illustrates where all FloodNet sensors are located, as well as the values of the depth measurements each sensor is taking in real time. Users can click on a sensor icon to view data from that sensor over time. There is also a ‘List’ view, accessible from the dashboard landing page, where users can scroll to view recent data from all flood sensors. List view is a useful tool for identifying locations that have flooded in the 48 hours following a flood event.</p>
        <p class="box-text">Flood sensor data have multiple potential uses including:</p>
        
        <div style="margin-left:2rem;">
            <p class="box-text">
                    1. informing potential road closures or travel bans and alerting drivers to avoid flooded and dangerous streets;
                    <br>2. alerting communities to the need for emergency preparedness and response;
                    <br>3. informing city agencies of locations that are flooding in real-time to inform localized flood response;
                    <br>4. identifying areas the most urgently in need of post-storm assistance;
                    <br>5. validating existing flood models (stormwater model and future flood models); and
                    <br>6. informing stormwater and tidal flooding resiliency planning.
            </p>
        </div>
        <p class="box-text">Our hope is that access to our openly available flood sensor data can be useful to city agencies and also to community residents, organizations, and coalitions as they work to understand how flooding impacts their neighborhood, explore how flooding is connected to other relevant community issues, and create action strategies in response to the two. Community input and engagement with this project is central to its success but, more importantly, to its ability to foster sustainable impact within the most at-risk communities.</p>
    </div>
    
</section>



<style>

    .subtitle{
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
    }

    .subtitle > img{
        width: 35px;
        height: auto;
        filter: invert(100%) sepia(94%) saturate(2937%) hue-rotate(306deg) brightness(101%) contrast(108%);
    }

    .line-container{
        width:100%;
        display: flex;
        flex-direction: row;
        gap: 5px;
        margin-bottom: 4rem;
    }

    .line{
        width:100%;
        margin:0;
        padding:0;
        border: 3px solid var(--light-orange);
    }

    .title{
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-bottom: 4rem;
        align-items: flex-start;
    }

    .title-info > p{
        margin: 0.5rem 0 0 0;
        font-size: 1.25rem;
    }

    .box-text > a{
        color: var(--light-orange);
        text-decoration: none;
        margin:0;
    }

    a{
        color: white;
        text-decoration: none;
        margin: 0;
    }

    h1{
        font-size: 3rem;
        margin: 0;
        color: var(--light-orange);
        line-height: 3rem;
    }

    h2{
        font-size: 2.5rem;
        color: var(--light-orange);
        margin: 1rem 0;
    }

    h4{
        font-size: 1.5rem;
        margin: 0 0 0.5rem 0;
    }

    .box{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        background-color: var(--blue);
        color: white;
        font-size: 1.25rem;
    }

    section{
        max-width: var(--site-width);
    }

    /* if screen is smaller then 1200 */
    @media screen and (max-width: 1200px){
        section{
            margin: 0 4rem;
        }
    }


</style>