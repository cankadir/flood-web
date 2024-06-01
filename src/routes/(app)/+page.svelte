
<script>

    import Card from "../../lib/card.svelte";
    import ImgGrid from '../../lib/imgGrid.svelte';

    let buttonsContent = [
        {
            Title: 'Flood Sensor data', 
            Norder:1 , 
            logo: '/assets/icons/FN_FW_sensor_icon.svg', 
            expends:true, link:"../floodnet", 
            ShortContent: 'View real-time and historic flood depth data from the FloodNet NYC sensor network', 
            LongContent: {
                Title:"FloodNet NYC", 
                Link:"../floodnet", 
                image:'FloodNet-Dashboard.png', 
                Content:"FloodNet NYC is a network of sensors that register street-level flooding at specific locations in flood-prone areas of the city. You can view data from these sensors through the data dashboard here."
            }
        },
        {
            Title: 'Participate', 
            Norder:3 , 
            logo: '/assets/icons/FN_FW_participate_icon.svg', 
            expends:false, link:"../participate", 
            ShortContent: 'Share photos and details about flooding you see with MyCoast NY'
        },
        {
            Title: 'Neighborhood Flood Reports', 
            Norder:5 , 
            logo: '/assets/icons/FN_FW__local_reports.svg', 
            expends:false, link:"/local-reports", 
            ShortContent: 'Access regularly updated reports about recent flooding in your neighborhood'},

        {
            Title: 'Flood Observations', 
            Norder:4 , 
            logo: '/assets/icons/FN_FW_observation_icon.svg', 
            expends:true, 
            ShortContent: 'See photo documentation of flooding in New York and contribute your own photos', 
            LongContent: {
                Title:"Flood Watch NYC", 
                Link:"../floodwatch", 
                image:'MyCoast_SS.png', 
                Content:"Citizen scientists with the NYC Community Flood Watch Project have been contributing to a data archive of flood photos since 2018. Photos are integrated with environmental information such as tide level and recent rainfall through the MyCoast NY app. View this data and add your own photo reports to contribute to understanding of how flooding is changing in NYC."}
        },
        {
            Title: 'Prepare', 
            Norder:3 , 
            logo: '/assets/icons/FN_FW_prepare_icon.svg', 
            expends:false, link:"/prepare", 
            ShortContent: 'Flood Resources & Flood Risk information'
        }
    ];

    // sort buttonsContent by Norder
    buttonsContent.sort((a, b) => a.Norder - b.Norder);

    // watch for the screensize changes
    let screenWidth;
    $: console.log(screenWidth);

    const pageBreak = 720;

</script>

<section >
    <div class="page-content" bind:clientWidth={screenWidth}>

        <div class="title">
            <h1>NYC Flood Data</h1>
            {#if screenWidth > pageBreak }
                <h2>Learn about street-level flooding where it has been observed and what it looks like</h2>
            {/if}
        </div>
        
        {#if screenWidth > pageBreak }
        <div class="flood-buttons-grid" >
            <!-- 2 col layout -->
            <div class="col col-1">
                {#each buttonsContent as button,i}
                    {#if i <= 2 }
                        <Card {button} />
                    {/if}
                {/each}
            </div>

            <div class="col col-2">

                {#each buttonsContent as button,i}
                    {#if i > 2 }
                        <Card {button} />
                    {/if}
                {/each}
            </div>
        </div>

        {:else}
            <div class="flood-buttons-col" >
                <!-- 1 col layout, boxes reordered -->
                <div class="col">
                    {#each [...buttonsContent].sort((a, b) => a.Norder - b.Norder) as button}
                        <Card {button} />
                    {/each}
                </div>
            </div>
        {/if}

        
        <ImgGrid />

    </div>


</section>


<style>
    section {
            display: flex;
            height: 100%;
            
        }
    /* if screen is larger than 960 */
    @media screen and (min-width: 1200px){
        section {
            margin: 0 auto;
            width: 1200px;
        }

        .title{
            max-width: 66%;
            margin-bottom: 2rem;
        }
    }

    /* if screen is smaler or equal to */
    @media screen and (max-width: 1200px){
        section {
            width: 100% !important;
            margin: 0 3rem !important;
        }

        .title{
            max-width: 100%;
            margin-bottom: 1.5rem;
        }


    }

    .flood-buttons-col{
        margin: 3rem auto !important;
        gap: 1rem !important;
        grid-template-columns: 1fr !important;
    }

    .flood-buttons-grid{
        max-width: 960px;
        margin: 6rem auto;
        gap: 1.5rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    h1{
        font-size: 3rem;
        margin-bottom: 0.5rem;
        margin-top: 0;
    }

    h2{
        font-size: 2.8rem;
        font-weight: 300;
        margin-bottom: 1rem;
        margin-top: 0;
    }

    .col{
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }


</style>