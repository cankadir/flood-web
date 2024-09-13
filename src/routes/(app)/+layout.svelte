<script>

    import Footer from "$lib/footer.svelte";
    import { page } from '$app/stores';

    let screenWidth;
    const pageBreak = 720;
    let pageUrl;
    
    // I am determining wether the page is the landing page or not.
    // If it is the landing page, I will make the home link unclickable
    $: {
        pageUrl = $page.url.hash;
        pageUrl = pageUrl.split('/');
        pageUrl = pageUrl[pageUrl.length - 1];
        pageUrl = pageUrl === '' ? 'landing' : 'other';
        console.log(pageUrl);

        // scroll to top ofthe page
        window.scrollTo(0, 0);
    }
</script>

<!-- svelte head -->
<svelte:head>
    <title>NYC Flood Data | Information about flooding in New York City</title>
    <meta name="description" content="Learn about street-level flooding in NYC, where it has been observed, and how it's changing, and view resources for residents who experience flooding.">
    <meta name= "keywords" content= "Floodnet, Flood watch, Floodwatch, Flood reports, NYC Flood" >
</svelte:head>

<div class="page" bind:clientWidth={screenWidth}>
    <nav data-sveltekit-reload>
        <div class="title">
            {#if pageUrl === 'landing' }
                <h1>NYC Flood Data</h1>
            {:else}
                <a href="#/" class="home" aria-label="Go back landing page" on:click={pageUrl='landing'}>
                    <h1>NYC Flood Data</h1>
                </a>
            {/if}
            {#if screenWidth > pageBreak }
                <h2>Learn about street-level flooding in NYC, where it has been observed, and what it looks like</h2>
            {/if}
        </div>
    </nav>

    <main>
        <slot></slot>
    </main>
    
    <Footer />
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
        line-height: 1.25;
    }

    /* if screen is larger than 1200 */
    @media screen and (min-width: 1200px){
        .title{
            max-width: 66%;
            margin-bottom: 2rem;
            margin-left: 1.5rem;
        }

        nav{
            width: var(--site-width);
            margin: 6rem auto 2rem auto;
        }
    }

    /* if screen is smaler or equal to */
    @media screen and (max-width: 1200px){
        .title{
            max-width: 100%;
            margin-bottom: 2rem;
            margin-left: 0;
        }

        nav{
            margin: 6rem 3rem 2rem 3rem !important;
        }
    }


    .page{
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    /* if screen larger than 960 */
    main{
        margin: 1rem auto;
        margin-bottom: 3rem;
        display: flex;
        flex-grow: 1;    
    }

    @media screen and (min-width: 1200px){
        main{
            width: var(--site-width);            
        }
    }

    /* if screen is smaler or equal to */
    @media screen and (max-width: 1200px){
        main{
            width: 100% !important;
        }
    }
    
    @media screen and (max-width: 720px){
        main{
            margin: 3rem auto;
        }
    }

</style>