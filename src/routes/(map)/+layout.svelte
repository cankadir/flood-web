
<script>

    // get page parameteres using Svelte's params
    import { page } from '$app/stores';
    let url = $page.url.pathname;
    // remove last /
    url = url.slice(0, -1);

    const layoutItems = [
        {
            logo: '../assets/icons/FN_FW_sensor_icon.svg',
            name: 'Flood Sensor Data',
            link: '../floodnet'
        },
        {
            logo: '../assets/icons/FN_FW_observation_icon.svg',
            name: 'Flood Observations',
            link: '../floodwatch'
        },
        {
            logo: '../assets/icons/FN_FW_participate_icon.svg',
            name: 'Participate',
            link: '../participate'
        },
        {
            logo: '../assets/icons/FN_FW__local_reports.svg',
            name: 'Local Flood Reports',
            link: '../local-reports'
        },
        {
            logo: '../assets/icons/FN_FW_prepare_icon.svg',
            name: 'Prepare',
            link: '../prepare'
        },
        {
            logo: '../assets/icons/FN_FW_home_icon.svg',
            name: 'Home',
            link: '../'
        } 
    ]

    let screenwidth;
    // filter layoutItems where link parameter contains url
    const pageItems = layoutItems.filter(item => item.link.includes(url));

    const filteredItems = layoutItems.filter(item => item.link !== pageItems[0]['link']);

    let rotation = 45;
    function handleClick(e){
        // find .nav-content under floating-nav, find .nav-content first
        const navContent = e.target.parentElement.parentElement.nextElementSibling;
        // toggle the visibility and display
        navContent.style.visibility = navContent.style.visibility === 'hidden' ? 'visible' : 'hidden';
        navContent.style.display = navContent.style.display === 'none' ? 'flex' : 'none';

        rotation += 45;
    }


</script>

<!-- Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
<link rel="stylesheet" href="/style.css">

<!-- All webmap Content goes here -->

<div class="external-content" bind:clientWidth={screenwidth}>
    <div class="floating-nav">
        
        <div class="nav-title">
            <!-- Title bar -->
            <h3>{pageItems[0]['name'].toUpperCase()}</h3>
            <!-- Close Open -->
            <button class="expender" on:click={(e)=>handleClick(e)}>
                <img class="shrink-nav" src="./assets/icons/FN_FW_UI_icon_open.svg" alt="expend nav bar" style="transform:rotate({rotation}deg);">
            </button>
        </div>
        

        <div class="nav-content">
            {#each filteredItems as item}

                {#if screenwidth > 960}
                    <div class="link-1">
                        <a class="nav-buttons" href="{item.link}" target="_blank" aria-label="go back to {item.name} page">
                            <img class="nav-logo" src={item.logo} alt="{item.name} logo" width="30" height="30">
                            <span class='nav-text'>{item.name}</span>
                        </a>
                    </div>
                {:else}
                    <div class="link-1">
                        <a class="nav-buttons" href="{item.link}" target="_blank" aria-label="go back to {item.name} page">
                            <img class="nav-logo" src={item.logo} alt="{item.name} logo" width="25" height="25">
                        </a>
                    </div>
                {/if}

            {/each}
        </div>

    </div>

    <section>
        <slot />
    </section>
</div>

<style>

    .nav-title > h3{
        margin: 0;
        padding: 0;
        font-size: 1.2rem;
        color: var(--white);
        align-items: baseline;
    }

    .external-content{
        height: 100vh;
        width: 100%;
        overflow-y: hidden;
    }

    section{
        margin: 0;
        padding: 0;
    }

    .nav-logo{
        filter: invert(100%);
        -webkit-filter: invert(100%);
    }

    .link-1:hover > .nav-buttons > .nav-logo{
        filter:  invert(60%) sepia(11%) saturate(1646%) hue-rotate(169deg) brightness(92%) contrast(97%);
    }

    /* if screen is larger then 960 */
    @media screen and (min-width: 960px){
        
        .nav-title{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0.5rem 0.5rem 0.5rem;
            box-sizing: border-box;
        }

        .floating-nav{
            position: fixed;
            top: 10px;
            right: 10px;
            width: 325px;
            color: black;
            z-index: 1000;
            background-color: var(--blue);
            box-sizing: border-box;
            border: solid 4px var(--orange);
            border-radius: 15px;
            padding: 0.5rem 0.5rem;
        }

        .shrink-nav{
            width: auto;
            height: 1.3rem;
            cursor: pointer;
            transition: linear 0.5s;
            filter:invert(1);
            background:transparent
        }

        .nav-buttons{
            display: flex;
            align-items: center;
            gap: 0.7rem;
        }

        .expender{
            background-color: transparent;
            border: none;
            cursor: pointer;
            padding:0;
        }

        .nav-content{
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: space-evenly;
            gap:0.8rem;
            height: auto;
            padding: 0 0 0.5rem 0;
        }

        .link-1{
            display: flex;
            align-items: baseline;
            gap: 1rem;
            font-size: 1rem;
            color: var(--white);
            font-weight: bold;
            padding: 0 0.5rem
        }

        .link-1:hover {
            background-color: var(--white);
        }



        .link-1 > a {
            color: var(--white);
            text-decoration: none;
        }

        .link-1:hover > a {
            color: var(--blue);
        }

        section{
            height: 100%;
        }
    }

    /* if screen is smaller then 960 */
    @media screen and (max-width: 960px){

        .floating-nav{
            width: 100%;
            height: 50px;
            color: black;
            padding: 0.5rem 0;
            background-color: var(--blue);
            box-sizing: border-box;
        }

        .nav-content{
            display: flex;
            flex-direction: row;
            height: 100%;
            width: 100%;
            /* justify-content: space-evenly; */
            gap: 3rem;
            box-sizing: border-box;
            padding: 0 1.5rem;
        }

        .link-1{
            display: flex;
            align-items: center;
            color: var(--white);
            font-weight: bold;
        }

        .link-1:hover {
            background-color: var(--white);
        }

        .nav-text{
            display: none;
            visibility: hidden;
        }

        .nav-title{
            display: none;
            visibility: hidden;
        }

        section{
            height: calc(100% - 50px);
        }


    }


</style>