
<script>
    let screenWidth = 600;
    let formHeight;
    $: console.log( screenWidth );
</script>


<div class="page-content" bind:clientWidth={screenWidth}>
    <iframe title='Contact us form' bind:this={ formHeight } src="https://docs.google.com/forms/d/e/1FAIpQLSdlfUTXbw90RaO2YJerysx0FV27jRZi9cI8Yttl0jDgB7whMA/viewform?embedded=true" width="{screenWidth-40}" height='1150' frameborder="0">Loading…</iframe>
</div>

<style>

    .page-content{
        width: 100%;
        max-width: 1200px;
        display: flex;
        flex-direction: column;
        overflow-y: hidden;
    }

    /* if smaller than 1200 */
    @media screen and (max-width: 1200px){
        .page-content{
            width: 100%;
        }
    }
    
</style>