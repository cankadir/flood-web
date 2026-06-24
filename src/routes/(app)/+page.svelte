
<script>

    import Card from "$lib/card.svelte";
    import ImgGrid from '$lib/imgGrid.svelte';

    let buttonsContent = [
        {
            Title: 'NYC Neighborhood Flood Reports',
            order: 1,
            logo: '/assets/icons/FN_FW__local_reports.svg',
            expends: false,
            link: "/local-reports",
            ShortContent: 'View and download reports about flooding in your neighborhood'
        },
        {
            Title: 'Flood Tools & Resources',
            order: 2,
            logo: '/assets/icons/FN_FW_prepare_icon.svg',
            expends: false,
            link: "/prepare",
            ShortContent: 'Learn about flood risk and preparedness in NYC'
        },
        {
            Title: 'Flood Photos',
            order: 3,
            logo: '/assets/icons/FN_FW_observation_icon.svg',
            expends: true,
            ShortContent: 'See photo documentation of flooding in NYC and submit your own',
            LongContent: {
                Title: "MyCoast NY",
                Link: "../floodwatch",
                image: 'MyCoast_SS.png',
                Content: "Citizen scientists with the NYC Community Flood Watch Project have been contributing to a data archive of flood photos since 2018. Photos are integrated with environmental information such as tide level and recent rainfall through the MyCoast NY app. View this data and add your own photo reports to contribute to understanding of how flooding is changing in NYC."
            }
        },
        {
            Title: 'Participate',
            order: 4,
            logo: '/assets/icons/FN_FW_participate_icon.svg',
            expends: false,
            link: "../participate",
            ShortContent: 'Document flooding by submitting photographs to MyCoast NY'
        },
        {
            Title: 'Flood Sensor Data',
            order: 5,
            logo: '/assets/icons/FN_FW_sensor_icon.svg',
            expends: true,
            link: "../floodnet",
            ShortContent: 'View real-time and historic flood depth data from the FloodNet NYC sensor network',
            LongContent: {
                Title: "FloodNet NYC",
                Link: "../floodnet",
                image: 'FloodNet-Dashboard.png',
                Content: "FloodNet NYC is a network of sensors that register street-level flooding at specific locations in flood-prone areas of the city. You can view data from these sensors through the data dashboard here."
            }
        },
        {
            Title: 'Sign up for our email list',
            order: 6,
            logo: '/assets/media_icons/subscribe.svg',
            expends: false,
            link: "https://docs.google.com/forms/d/e/1FAIpQLSfIG7c5TdT-PGNvjnMF8lRpS5kr_SlpxTc0bW1wsyI4U_NlXQ/viewform?usp=sf_link",
            ShortContent: 'Receive notifications of coastal flooding'
        }
    ];

    buttonsContent.sort((a, b) => a.order - b.order);

</script>

<section >
    <div class="page-content">
        <div class="flood-buttons-grid">
            {#each buttonsContent as button (button.Title)}
                <div class="card-slot" style="--order: {button.order}">
                    <Card {button} />
                </div>
            {/each}
        </div>

        <ImgGrid />

    </div>
</section>


<style>
    section {
            display: flex;
            height: 100%;
            
        }
    /* if screen is larger than 960 */
    @media screen and (min-width: 1200px){
        section {
            margin: 0 auto;
            width: 1200px;
        }

    }

    /* if screen is smaler or equal to */
    @media screen and (max-width: 1200px){
        section {
            width: 100% !important;
            margin: 0 3rem !important;
        }
    }

    .flood-buttons-grid{
        max-width: 960px;
        margin: 1rem auto;
        gap: 1.5rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(3, auto);
        grid-auto-flow: column;
    }

    @media screen and (max-width: calc(720px + 6rem)){
        .flood-buttons-grid{
            grid-template-columns: 1fr;
            grid-template-rows: unset;
            grid-auto-flow: row;
            gap: 1rem;
        }

        .card-slot{
            order: var(--order);
        }
    }

</style>
