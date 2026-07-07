<script>

    import Accordion from "$lib/accordion.svelte";

    let dataPromise = fetchData();

    async function fetchData() {
        const public_key = 'patfoFHZpi11znkas.afefdf9daa13bb452cbd559575156e67e6d2c880da7f2c69d10ff820586dd84b';
        const at_url = 'https://api.airtable.com/v0/appvTkmJJRpz8x95D/Preparedness';
        const Bearer = 'Bearer ' + public_key;
        const at_res = await fetch(at_url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Bearer
            }
        });

        const at_data = await at_res.json();

        const data_simple = at_data.records.map(prep => prep.fields);
        data_simple.sort((a, b) => a.order - b.order);

        return data_simple.reduce((r, a) => {
            r[a.Title] = r[a.Title] || [];
            r[a.Title].push(a);
            return r;
        }, Object.create(null));
    }

    function slugify(text) {
        return text.toLowerCase().replaceAll(' ', '-');
    }

    function getToolImageUrl(item) {
        const image = item.tool_image;
        if (!image) return null;

        if (Array.isArray(image)) {
            if (image.length === 0) return null;
            const first = image[0];
            return first?.thumbnails?.large?.url || first?.url || first?.thumbnails?.small?.url || null;
        }

        if (typeof image === 'string' && image.trim()) return image;

        return null;
    }

</script>

<section>
    <div class="page-content">
        <div class="title">
            <div class="logo" style="width:70px;height:auto;filter:invert(1)">
                <img src="./assets/icons/FN_FW_prepare_icon.svg" alt="" aria-hidden="true" width="100%" height="100%" />
            </div>
            <div class="title-info">
                <h1>Flood Resources</h1>
                <p style="font-size:1.5rem">Learn about flood risk and preparedness</p>
            </div>
        </div>

        {#await dataPromise}
            <p>Loading...</p>
        {:then data_grouped}
            {#each Object.keys(data_grouped) as key}
                <div class="prep-item">
                    <Accordion id={slugify(key)} title={key} headingLevel={2}>
                        <div class="resources">
                            {#each data_grouped[key] as item}
                                {@const toolImageUrl = getToolImageUrl(item)}
                                <div class="box" id="{item.Subtitle.toLowerCase().replaceAll(' ','-')}">
                                    <div class="tool-thumbnail-wrap">
                                        {#if toolImageUrl}
                                            <img
                                                class="tool-thumbnail"
                                                src={toolImageUrl}
                                                alt=""
                                                aria-hidden="true"
                                                loading="lazy"
                                            />
                                        {/if}
                                    </div>
                                    <div class="box-content">
                                        {#if item.link}
                                            <a href={item.link} aria-label="Visit {item.Subtitle} site (opens in a new tab)" target="_blank" class="resource-link"><h4>{item.Subtitle}</h4></a>
                                        {:else}
                                            <h4>{item.Subtitle}</h4>
                                        {/if}
                                        <p class="box-text">{item.Content}</p>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </Accordion>
                </div>
            {/each}
        {:catch error}
            <p style="color:red">{error.message}</p>
        {/await}
    </div>
</section>



<style>

    .page-content{
        max-width: 960px;
        margin: 0 auto;
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

    h4{
        font-size: 1.5rem;
        margin: 0 0 0.5rem 0;
    }

    .resources{
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-bottom: 1rem;
    }

    .prep-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
    }

    .box{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        background-color: var(--blue);
        color: white;
        font-size: 1.25rem;
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        gap: 4rem;
    }

    .box-content {
        flex: 1;
        min-width: 0;
    }

    .tool-thumbnail-wrap {
        flex-shrink: 0;
        width: 120px;
        max-width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: stretch;
    }

    .tool-thumbnail {
        max-width: 120px;
        width: auto;
        height: auto;
        max-height: 100%;
        object-fit: contain;
    }

    .box-content > p {
        margin: 0.25rem 0;
        padding: 0;
    }

    .box-text{
        line-height: 1.5rem;
    }

    section{
        width: 100%;
        max-width: var(--site-width);
        margin: 0 auto;
        box-sizing: border-box;
    }

    /* if screen is smaller then 1200 */
    @media screen and (max-width: 1200px){
        section{
            width: 100%;
            margin: 0 4rem;
        }
    }

    .resource-link:hover{
        color: var(--light-orange);
        text-decoration: underline;
    }


</style>