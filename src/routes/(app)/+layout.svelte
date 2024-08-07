<script>

    import Footer from "$lib/footer.svelte";
    
    let screenWidth;
    const pageBreak = 720;

    // get page url
    import { page } from '$app/stores';
    let pageUrl = $page.url.href;
    pageUrl = pageUrl.split('/');
    pageUrl = pageUrl[pageUrl.length - 1];

    // if pageUrl is empty the page is a landing page
    pageUrl = pageUrl === '' ? 'landing' : 'other';

</script>

<!-- svelte head -->
<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/style.css">
    <title>NYC Flood Data</title>
</svelte:head>


<div class="page" bind:clientWidth={screenWidth}>

    <nav>
        <div class="title">
            {#if pageUrl === 'landing' }
                <h1>NYC Flood Data</h1>
            {:else}
                <a href="../" class="home" aria-label="Go back landing page">
                    <h1>NYC Flood Data</h1>
                </a>
            {/if}
            {#if screenWidth > pageBreak }
                <h2>Learn about street-level flooding, where it has been observed, and what it looks like</h2>
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