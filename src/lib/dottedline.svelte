

<script>

    export let screenWidth;

    let item_width = 10
    $: item_count = Math.floor(screenWidth / item_width);
    $: count_array = Array.from({ length: item_count }, (_, i) => i);
    console.log(count_array)

</script>



<div class="line-container" bind:clientWidth={screenWidth}>
    {#key screenWidth}
        {#each count_array as index}
            <hr class="line" >
        {/each}
    {/key}
</div>

<style>
    
    .line-container{
        width:100%;
        display: flex;
        flex-direction: row;
        gap: 5px;
        margin-bottom: 3rem;
    }

    .line{
        width:100%;
        margin:0;
        padding:0;
        border: 3px solid var(--light-orange);
    }


</style>