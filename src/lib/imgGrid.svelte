<script>

    export let observations;

    let loadedUrls = {};

    function setImageLoaded(url) {
        loadedUrls = { ...loadedUrls, [url]: true };
    }

    function revealWhenReady(node, url) {
        function reveal() {
            setImageLoaded(url);
        }

        if (node.complete && node.naturalHeight > 0) {
            reveal();
        } else {
            node.addEventListener('load', reveal);
            node.addEventListener('error', reveal);
        }

        return {
            destroy() {
                node.removeEventListener('load', reveal);
                node.removeEventListener('error', reveal);
            }
        };
    }
    
    function convertDate(date){
        let newDate = new Date(date);
        // convert date to string in mm/dd/yyyy format
        newDate = newDate.toLocaleDateString()
        return newDate;
    }

    function photoTitle(title) {
        return title.replace("Photo Station report from ", "").replace("High Water report from ", "");
    }

</script>

<div class="title">
    <a href="https://srijb.org/jbfloodwatch" aria-label="Visit SRIJB's community flood watch project (opens in a new tab)" target="_blank">
        <h3>NYC Community Flood Watch Project</h3>
    </a>
    <p>Recent photos of flooding submitted by community members in NYC</p>
</div>

<div class="myCoast-photos" aria-label="Recent flood observations submitted by community members using My Coast">
    {#await observations}
        <p>Images are loading from MyCoast...</p>
    {:then observations}
        {#each observations as observation, i (observation.properties.picUrl)}
            {@const picUrl = observation.properties.picUrl}
            {@const title = photoTitle(observation.properties.title)}
            <div class="my-coast" class:hide-on-mobile={i >= 2} class:loaded={loadedUrls[picUrl]}>
                <div class="photo-frame">
                    {#if !loadedUrls[picUrl]}
                        <div class="photo-placeholder" aria-hidden="true"></div>
                    {/if}
                    <img
                        src={picUrl}
                        alt={title}
                        use:revealWhenReady={picUrl}
                    />
                </div>
                <p class="photo-content"><span>{title}</span> • <span>{ convertDate(observation.properties.photo_date) }</span> <span> {observation.properties.photo_time}</span></p>
                <p class="photo-content photo-comment">{observation.properties.comment}</p>
            </div>
        {/each}
    {/await}
</div>

<style>
    .title > a{
        text-decoration: none;
        color: var(--text-color);
        padding: 0;
        box-sizing: border-box;
    }

    .title > a :hover{
        text-decoration: none;
        color: var(--light-orange);
    }

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

    .photo-frame{
        position: relative;
        width: 100%;
        height: 200px;
        margin-bottom: 0.5rem;
        overflow: hidden;
        border-radius: 4px;
    }

    .photo-placeholder{
        position: absolute;
        inset: 0;
        background: rgba(255, 255, 255, 0.12);
    }

    .myCoast-photos > .my-coast > .photo-frame > img{
        object-fit: cover;
        width: 100%;
        height: 200px;
        opacity: 0;
        transition: opacity 0.35s ease;
    }

    .my-coast.loaded > .photo-frame > img{
        opacity: 1;
    }

    .my-coast .photo-content,
    .my-coast .photo-comment{
        opacity: 0;
        transition: opacity 0.35s ease;
    }

    .my-coast.loaded .photo-content,
    .my-coast.loaded .photo-comment{
        opacity: 1;
    }

    .photo-comment{
        font-style: italic;
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

        .hide-on-mobile {
            display: none;
        }
    }

</style>