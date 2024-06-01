<script>
    import '../../style.css';
    import Footer from "../../lib/footer.svelte";
    


</script>

<div class="page">
    <main>
        <slot></slot>
    </main>
    
    <Footer />
</div>


<style>
    .page{
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    /* if screen larger than 960 */
    main{
        margin: 6rem auto;
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