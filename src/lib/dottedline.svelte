
<div class="line-container" >
    <hr class="line" >
</div>

<style>
    
    .line-container{
        width:100%;
        max-width: 100%;
        display: flex;
        flex-direction: row;
        gap: 5px;
        margin-bottom: 3rem;
    }

    .line{
        width:100%;
        margin:0;
        padding:0;
        /* border: 2px dashed var(--light-orange); */
        border: none;
        height: 4px;
        background: repeating-linear-gradient(
            to right,
            var(--light-orange),
            var(--light-orange) 5px, /* Length of the dash */
            transparent 5px, /* Start of the gap */
            transparent 10px /* Length of the gap */
        );
    }


</style>