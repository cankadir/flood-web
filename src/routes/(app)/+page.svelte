
<script>

    import Card from "$lib/card.svelte";
    import ImgGrid from '$lib/imgGrid.svelte';

    const reportsBannerItem = {
        Title: 'NYC Neighborhood Flood Reports',
        link: '#/local-reports',
        ShortContent: 'View and download information about flooding in your neighborhood, including what it looks like, how often it happens, and how deep the water gets at select locations. These reports draw on photographs from community members like you, data from flood sensors, and NYC 311 calls related to flooding. They are updated annually.',
        mapImage: 'assets/reports-map.png',
    };

    let buttonsContent = [
        {
            Title: 'NYC Neighborhood Flood Reports',
            link: '#/local-reports',
            ShortContent: 'View and download reports about flooding in your neighborhood',
            logo: 'assets/icons/FN_FW__local_reports.svg',
            order: 1,
            expends: false
        },
        {
            Title: 'Flood Tools & Resources',
            order: 2,
            logo: 'assets/icons/FN_FW_prepare_icon.svg',
            expends: false,
            link: '#/prepare',
            ShortContent: 'Learn about flood risk and preparedness in NYC'
        },
        {
            Title: 'Flood Photos',
            order: 3,
            logo: 'assets/icons/FN_FW_observation_icon.svg',
            expends: true,
            ShortContent: 'See photo documentation of flooding in NYC and submit your own',
            LongContent: {
                Title: 'MyCoast NY',
                Link: '#/floodwatch',
                image: 'MyCoast_SS.png',
                Content: 'Citizen scientists with the NYC Community Flood Watch Project have been contributing to a data archive of flood photos since 2018. Photos are integrated with environmental information such as tide level and recent rainfall through the MyCoast NY app. View this data and add your own photo reports to contribute to understanding of how flooding is changing in NYC.'
            }
        },
        {
            Title: 'Participate',
            order: 4,
            logo: 'assets/icons/FN_FW_participate_icon.svg',
            expends: false,
            link: '#/participate',
            ShortContent: 'Document flooding by submitting photographs to MyCoast NY'
        },
        {
            Title: 'Flood Sensor Data',
            order: 5,
            logo: 'assets/icons/FN_FW_sensor_icon.svg',
            expends: true,
            link: '#/floodnet',
            ShortContent: 'View real-time and historic flood depth data from the FloodNet NYC sensor network',
            LongContent: {
                Title: 'FloodNet NYC',
                Link: '#/floodnet',
                image: 'FloodNet-Dashboard.png',
                Content: 'FloodNet NYC is a network of sensors that register street-level flooding at specific locations in flood-prone areas of the city. You can view data from these sensors through the data dashboard here.'
            }
        },
        {
            Title: 'Sign up for our email list',
            order: 6,
            logo: 'assets/media_icons/subscribe.svg',
            expends: false,
            link: 'https://docs.google.com/forms/d/e/1FAIpQLSfIG7c5TdT-PGNvjnMF8lRpS5kr_SlpxTc0bW1wsyI4U_NlXQ/viewform?usp=sf_link',
            ShortContent: 'Receive notifications of coastal flooding'
        }
    ];

    buttonsContent.sort((a, b) => a.order - b.order);

    function fetchMyCoast() {
        const myCoastURL = 'https://mycoast.org/blueurchin-js/arcgis/can-ny.php?page=1';
        return fetch(myCoastURL)
            .then(response => response.json())
            .then(my_coast_data => {
                const lonmin = -74.3600;
                const lonmax = -73.6750;
                const latmin = 40.4878;
                const latmax = 40.9446;

                let filtered = my_coast_data.features.filter(item => {
                    const lat = item.geometry.coordinates[1];
                    const lon = item.geometry.coordinates[0];
                    return lat > latmin && lat < latmax && lon > lonmin && lon < lonmax && item.properties.comment != '';
                });

                filtered = filtered.slice(0, 20);
                return filtered.sort(() => Math.random() - Math.random()).slice(0, 4);
            });
    }

    let mycoast = fetchMyCoast();

</script>

<section >
    <div class="page-content">
        <a
            href={reportsBannerItem.link}
            class="reports-feature"
            aria-label="Visit {reportsBannerItem.Title} page"
        >
            <div class="reports-feature-image">
                <img
                    src={reportsBannerItem.mapImage}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                />
            </div>
            <div class="reports-feature-text">
                <h3>{reportsBannerItem.Title}</h3>
                <p class="reports-feature-subtitle">{reportsBannerItem.ShortContent}</p>
            </div>
        </a>

        <div class="flood-buttons-grid">
            {#each buttonsContent as button (button.Title)}
                <div class="card-slot" style="--order: {button.order}">
                    <Card {button} />
                </div>
            {/each}
        </div>

        <ImgGrid observations={mycoast} />

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

    .page-content {
        width: 100%;
    }

    .reports-feature {
        width: 100%;
        max-width: 960px;
        margin: 0 auto 2.5rem auto;
        display: flex;
        align-items: flex-start;
        gap: 2rem;
        padding: 1.25rem 1.5rem;
        box-sizing: border-box;
        text-decoration: none;
        color: var(--text-color);
        background-color: transparent;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 15px;
        transition: background-color 0.2s ease;
        cursor: pointer;
    }

    .reports-feature:hover {
        background-color: rgba(255, 255, 255, 0.12);
        color: var(--text-color);
    }

    .reports-feature-text {
        flex: 1;
        min-width: 0;
    }

    .reports-feature-text h3 {
        margin: 0;
        font-size: 1.5rem;
        color: inherit;
    }

    .reports-feature-subtitle {
        margin: 0.5rem 0 0 0;
        font-size: 1.25rem;
        line-height: 1.5;
        color: inherit;
    }

    .reports-feature-image {
        flex-shrink: 0;
        height: 200px;
        max-height: 200px;
    }

    .reports-feature-image img {
        height: 200px;
        max-height: 200px;
        width: auto;
        display: block;
        object-fit: contain;
        border-radius: 8px;
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

        .reports-feature {
            flex-direction: column;
            align-items: stretch;
            gap: 1.25rem;
            margin-bottom: 2rem;
            padding: 1rem 1.25rem;
        }

        .reports-feature-image {
            height: 200px;
            max-height: 200px;
        }

        .reports-feature-image img {
            height: 200px;
            max-height: 200px;
            width: auto;
            max-width: 100%;
        }
    }

</style>
