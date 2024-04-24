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

</script>

<div class="title">
    <h3>NYC Communiy Flood Watch Project</h3>
    <p>Recent flood documentation posted by the community members</p>
</div>

{#await observations}
    <p>Images are loading from MyCoast...</p>
{:then observations} 

    <div class="myCoast-photos">
        
        {#each observations as observation,i}
            <div class="my-coast">
                <img src={observation.properties.picUrl} alt="Coastal {i}"/>
                <p class="photo-content"><span>{observation.properties.title.replace("Photo Station report from ","").replace("High Water report from ","")}</span> • <span>{ convertDate(observation.properties.photo_date) }</span><span> {observation.properties.photo_time}</span></p>
                <p class="photo-content" style="font-style:italic">{observation.properties.comment}</p>
            </div>
        {/each}

    </div>



{/await}


<style>
    .title{
        margin-top: 3rem;
        margin-bottom: 1rem;
    }

    h3{
        margin: 0;
    }

    p{
        margin: 0;
    }

    .myCoast-photos {
        width: 100%;
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
    }

    .photo-content{
        margin-top: 0.75rem;
        font-size: 0.75rem;
    }
</style>