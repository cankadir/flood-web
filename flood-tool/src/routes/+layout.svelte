<script>
    import '../style.css';
    let logos = ['facebook','twitter','instagram']
</script>

    <main>
        <slot></slot>
    </main>

    <footer>
        <div class="footer-content info">
            <div class="footer-row row-1">
                <div class="item-1">About</div>
                <div class="item-2">Contact</div>
                <div class="item-3">
                    {#each logos as logo}
                        <a id="{logo}" class='social-media'><div class="logo"></div></a>
                    {/each}
                </div>
            </div>
            <div class="footer-row row-2">
                <p id="disclaimer"><strong>Disclaimer: </strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit reiciendis, dicta omnis commodi deleniti accusantium itaque, exercitationem, a modi quo saepe voluptatem rerum hic vel velit voluptates. Ex, saepe omnis!</p>
            </div>
        </div>

        <div class="footer-content blank"></div>

        <div class="footer-content logos">
            <img class="inst-logos" src="./assets/FloodNet-White-01.png" alt="flood net logo">
            <img class="inst-logos" src="./assets/SeaGrantLogo.png" alt="sea grant logo">
        </div>
    </footer>


<style>

    .logos{
        flex-direction: row !important;
        gap:2rem;
        /* align-items: baseline !important; */
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
        width: 2rem;
        height: 2rem;
        background-color: var(--text-color);
        border-radius: 50%;
    }
    .row-1{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        font-size: 2.5rem;
        font-weight: bold;
    }

    .footer-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem 0 1rem 0;
    }

    nav{
        height: 3rem;
        border-bottom: 1px solid var(--text-color);
    }

    footer{
        height: 12rem;
        border-top: 1px solid var(--text-color);
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        max-width: var(--site-width);
        margin: 0 auto 3rem auto;
    }

    main{
        max-width: var(--site-width);
        margin: 6rem auto 6rem auto;
        display: flex;
        
    }

</style>