
<script>

    import Card from "../../lib/card.svelte";
    import ImgGrid from '../../lib/imgGrid.svelte';

    let buttonsContent = [
        {Title: 'Flood Sensor data', Norder:1 , logo: '/assets/icons/FN_FW__sensor_icon.svg', expends:true, link:"../floodnet", ShortContent: 'Some Content Here and it is longer then a single line. So that we can see how it looks', LongContent: {Title:"FloodNet NYC", Link:"", image:'FloodNet-Dashboard.png', Content:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, ducimus cum? Provident vitae corrupti libero laborum dolorem nesciunt natus recusandae quis? Earum illo repellat odit aperiam labore perspiciatis atque reprehenderit!"}},
        {Title: 'Participate', Norder:4 , logo: '/assets/icons/FN_FW__report_icon.svg', expends:false, link:"../participate", ShortContent: 'Some Content Here and it is longer then a single line. So that we can see how it looks'},
        {Title: 'Neighborhood Flood Reports', Norder:3 , logo: '/assets/icons/FN_FW__local_reports.svg', expends:false, link:"/local-reports", ShortContent: 'Some Content Here and it is longer then a single line. So that we can see how it looks'},
        {Title: 'Flood Observations', Norder:2 , logo: '/assets/icons/FN_FW__Observation_icon.svg', expends:true, ShortContent: 'Some Content Here and it is longer then a single line. So that we can see how it looks', LongContent: {Title:"Flood Watch NYC", Link:"", image:'FloodNet-Dashboard.png', Content:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, ducimus cum? Provident vitae corrupti libero laborum dolorem nesciunt natus recusandae quis? Earum illo repellat odit aperiam labore perspiciatis atque reprehenderit!"}},
        {Title: 'Prepare', Norder:5 , logo: '/assets/icons/FN_FW__prepare_icon.svg', expends:false, link:"/prepare", ShortContent: 'Some Content Here and it is longer then a single line. So that we can see how it looks' }
    ];

    let screenWidth;

</script>

<section>
    <div class="page-content">

        <div class="title">
            <h1>NYC Flood Data</h1>

            {#if screenWidth > 720 }
                <h2>Learn about street-level flooding where it has been observed and what it looks like</h2>
            {/if}

            </div>

        <div class="flood-buttons" bind:clientWidth={screenWidth}>
            
            {#if screenWidth > 720 }
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

            {:else}
                <!-- 1 col layout, boxes reordered -->
                <div class="col">
                    {#each [...buttonsContent].sort((a, b) => a.Norder - b.Norder) as button}
                        <Card {button} />
                    {/each}
                </div>

            {/if}

        </div>

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

        .flood-buttons{
            margin: 3rem auto !important;
        }
    }

    /* This is an additional break only for the column layout. */
    /* This converts the 2 cols to a single one. */
    @media screen and (max-width: 720px){
        .flood-buttons{
            margin: 3rem auto !important;
            gap: 1rem !important;
            grid-template-columns: 1fr !important;
        }
    }

    .flood-buttons{
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