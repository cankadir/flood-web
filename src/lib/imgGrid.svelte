<script>

    // import page
    import { page } from '$app/stores';
    let observations = $page.data.props.mycoast;
    
    function convertDate(date){
        let newDate = new Date(date);
        // convert date to string in mm/dd/yyyy format
        newDate = newDate.toLocaleDateString()
        return newDate;
    }

    let screenWidth;

</script>

<div class="title">
    <h3>NYC Community Flood Watch Project</h3>
    <p>Recent photos of flooding submitted by community members in NYC</p>
</div>

<div class="myCoast-photos" bind:clientWidth={screenWidth}>
    {#await observations}
        <p>Images are loading from MyCoast...</p>
    {:then observations} 
        {#if screenWidth > 720 }
            {#each observations as observation,i}
                <div class="my-coast">
                    <img src={observation.properties.picUrl} alt="Coastal {i}"/>
                    <p class="photo-content"><span>{observation.properties.title.replace("Photo Station report from ","").replace("High Water report from ","")}</span> • <span>{ convertDate(observation.properties.photo_date) }</span> <span> {observation.properties.photo_time}</span></p>
                    <p class="photo-content" style="font-style:italic">{observation.properties.comment}</p>
                </div>
            {/each}
        {:else}
            {#each observations.slice(0, 2) as observation,i}
                <div class="my-coast">
                    <img src={observation.properties.picUrl} alt="Coastal {i}"/>
                    <p class="photo-content"><span>{observation.properties.title.replace("Photo Station report from ","").replace("High Water report from ","")}</span> • <span>{ convertDate(observation.properties.photo_date) }</span><span> {observation.properties.photo_time}</span></p>
                    <p class="photo-content" style="font-style:italic; margin-top:0 !important;">{observation.properties.comment}</p>
                </div>
            {/each}
        {/if}
            
    {/await}
</div>

<style>
    .title{
        margin-top: 4rem;
        margin-bottom: 1rem;
    }

    h3{
        margin: 0;
        font-size: 1.5rem;
    }

    p{
        margin: 0;
        font-size: 1.2rem;
    }

    .myCoast-photos {
        width: 100%;
        min-width: 1200px;
        gap: 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        margin-top: 3rem;
    }

    .my-coast{
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: hidden;
    }

    .myCoast-photos > .my-coast > img{
        object-fit: cover;
        width: 100%;
        height: 200px !important;
        margin-bottom: 0.5rem;
    }

    .photo-content{
        margin-top: 0.25rem;
        font-size: 0.75rem;
    }

    /* if screen is smaller then 960 */
    @media (max-width: 1200px) {
        .myCoast-photos {
           min-width: 0px;
        }
    }

    @media (max-width: calc(720px + 6rem)) {
        .myCoast-photos {
            grid-template-columns: 1fr 1fr;
        }
    }

</style>