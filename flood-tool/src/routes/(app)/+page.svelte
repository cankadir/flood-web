
<script>

    import Card from "../../lib/card.svelte";
    import ImgGrid from '../../lib/imgGrid.svelte';
    // import Card from '../../lib/card.svelte';
    // import ImgGrid from '../lib/imgGrid.svelte';

    let buttonsContent = [
        {Title: 'Flood Sensor data', logo: '🌊', expends:true, ShortContent: 'Some Content Here and it is longer then a single line. So that we can see how it looks', LongContent: {Title:"FloodNet NYC", Link:"", image:'FloodNet-Dashboard.png', Content:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, ducimus cum? Provident vitae corrupti libero laborum dolorem nesciunt natus recusandae quis? Earum illo repellat odit aperiam labore perspiciatis atque reprehenderit!"}},
        {Title: 'Participate', logo: '🌊', expends:false, link:"", ShortContent: 'Some Content Here and it is longer then a single line. So that we can see how it looks'},
        {Title: 'Neighborhood Flood Reports', logo: '🌊', expends:false, link:"/local-reports", ShortContent: 'Some Content Here and it is longer then a single line. So that we can see how it looks'},
        {Title: 'Flood Observations', logo: '🌊', expends:true, ShortContent: 'Some Content Here and it is longer then a single line. So that we can see how it looks', LongContent: {Title:"Flood Watch NYC", Link:"", image:'FloodNet-Dashboard.png', Content:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, ducimus cum? Provident vitae corrupti libero laborum dolorem nesciunt natus recusandae quis? Earum illo repellat odit aperiam labore perspiciatis atque reprehenderit!"}},
        {Title: 'Prepare', logo: '🌊', expends:true, ShortContent: 'Some Content Here and it is longer then a single line. So that we can see how it looks' }
    ];

</script>


<section>
    <div class="page-content">

        <div class="title">
            <h1>NYC Flood Data</h1>
            <h2>Learn about street-level flooding where it has been observed and what it looks like</h2>
        </div>


        <div class="flood-buttons">

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

        <ImgGrid />

    </div>


</section>



<style>
    section {
        width: 1200px;
        display: flex;
        height: 100%;
        margin: 0 auto 0 auto;
    }

    .title{
        max-width: 800px;
        margin-bottom: 2rem;
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

    .flood-buttons{
        max-width: 960px;
        margin: 6rem auto 6rem auto;
        gap: 1.5rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .col{
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }


</style>