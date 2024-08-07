<script>
    let logos = [
        {'sm':'FloodNet Instagram', 'link':'https://www.instagram.com/floodnetnyc/', 'icon':'/assets/media_icons/instagram.svg'},
        {'sm':'NYC Community Flood Watch Project FB Page', 'link':'https://www.facebook.com/groups/floodwatch ', 'icon':'/assets/media_icons/facebook.svg'},
        {'sm':'Flood Watch Email Sign Up', 'link':'https://docs.google.com/forms/d/e/1FAIpQLSfIG7c5TdT-PGNvjnMF8lRpS5kr_SlpxTc0bW1wsyI4U_NlXQ/viewform?usp=sf_link', 'icon':'/assets/media_icons/email.svg'},
    ];
</script>

<footer>
    <div class="footer-content info">
        <div class="footer-row row-1">
            <div class="item-1"><a href="../about" style="color:var(--white)" aria-label="Go to about page">About</a></div>
            <div class="item-2"><a href="../contact" style="color:var(--white)" aria-label="Go to contact us page">Contact</a></div>
            <div class="item-3">
                
                <!-- Social Media icons and links -->
                {#each logos as logo}
                    <a class='social-media' href="{logo.link}" aria-label="{logo.sm}" target="_blank">
                        <div class="logo">
                            <img src="{logo.icon}" alt="" aria-hidden="true">
                        </div>
                    </a>
                {/each}

            </div>
        </div>
        <div class="footer-row row-2">
            <p id="disclaimer"><strong>Disclaimer: </strong> The information on this site only pertains to street-level flooding in New York City and does not include indoor or below ground flooding. Because this information relies on community observations and data from flood sensors, not all floods are recorded, only those that are documented by a person or measured by a sensor. The links and advice on this page were last updated May 5th, 2024 and could be out of date.</p>
        </div>
    </div>

    <div class="footer-content blank"></div>

    <div class="footer-content logos">
        <a href="https://www.floodnet.nyc/" target="_blank" aria-label="Visit FloodNet website (open in a new tab)"><img class="inst-logos" src="./assets/FloodNet-White-01.png" alt="" aria-hidden="true"></a>
        <a href="https://seagrant.sunysb.edu/" target="_blank" aria-label="Visit Seagrant website (open in a new tab)"><img class="inst-logos" src="./assets/SeaGrantLogo.png" alt="" aria-hidden="true"></a>
    </div>

</footer>

<style>
    footer{
        height: 12rem;
        border-top: 1px solid var(--text-color);
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        max-width: var(--site-width);
        margin: 0 auto 3rem auto;

    }

    .footer-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem 0;
    }

    .logos{
        flex-direction: row !important;
        gap:2rem;
        justify-content: flex-end !important;
    }

    .inst-logos{
        width: 6rem;
        height: auto;
    }

    .footer-row{
        margin-top:1rem;
    }

    .item-3{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        gap: 1rem;
    }

    .logo{
        width: auto;
        height: 2rem;
    }

    .logo > img{
        width: 100%;
        height: 100%;
        filter: invert(1);
    }

    .row-1{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        font-size: 1.7rem;
        font-weight: bold;
    }

    /* if screen is smaler or equal to */
    @media screen and (max-width: 1200px){

        footer{
            margin-left: 2.5rem;
            margin-right: 2.5rem;
            grid-template-columns: 2fr 0.5fr 1fr;
        }
    }

    @media screen and (max-width: 680px){
        footer{
            height: auto;
            display: flex;
            flex-direction: column;
            flex-direction: column-reverse;
            gap: 0.1rem;
            padding-top: 1rem;
        }

        .footer-content{
            padding: 0.5rem;
        }

        .inst-logos{
            max-height: 100px;
            width: auto;
        }

        .logos{
            justify-content: center !important;
        }

        .blank{
            display: none;
        }
    }

</style>