<script>

    import SvelteMarkdown from 'svelte-markdown'

    export let button;
    // import { page } from '$app/stores';
    // let preparedness = $page.data.props.preparedness;
    
    function assign_button( is_expends){
        if(is_expends){
            return "&#43;"; // Plus Sign
        }else{
            return "&#10132;"; // Blocky Arrow
        }
    }

    function handleClick( e ){
        // This function handles all epxending and content changes on click to expend.
        let expender;

        Object.keys( button ).forEach(element => {
            if( element == "expends" ){ expender = button[element]; }
        });

        // If a box is allowed to expend
        if(expender){
            // toggle the expended class of the box
            let clicked_box = e.target.parentElement.parentElement;
            clicked_box.classList.toggle("expended");

            // toggle the hidden class of the box-content
            let content = clicked_box.getElementsByClassName("box-content");
            for(let i = 0; i < content.length; i++){
                content[i].classList.toggle("hidden");
            }

            // check if the box is expended
            if(clicked_box.classList.contains("expended")){
                console.log("Expended");
                // change the e's content to -
                e.target.innerHTML = "&#8722;";
            }else{
                console.log("Not Expended");
                // change the e's content to +
                e.target.innerHTML = "&#43;";
            }


        }
    }

</script>

    <div class="box" id="{button.Title.toLowerCase().replaceAll(" ","-")}">
        <div class="logo">
            <img src="{button.logo}" alt="item icon" class="box-logo" />
        </div>
        
        <!-- This gets replaced on click -->
        <div class="box-content">
            <h3>{button.Title}</h3>
            <p class="box-text">{button.ShortContent}</p>
        </div>

        <!-- For Flood Net and Flood Watch Boxes-->
        <div class="box-content hidden">
            <h3>{button.Title}</h3>
            <p class="box-text">{button.ShortContent}</p>
            <!-- if there is a LongContent key in the button -->
            
            {#if Object.keys(button).includes("LongContent")}
                <!-- Link the the site -->
                <div class="titlelink">
                    <div>&#10142;</div>
                    <a style="color:var(--blue);cursor:pointer;" href="../floodnet" target="_blank">{button.LongContent.Title}</a>
                </div>
                
                <p class="long-content">{button.LongContent.Content}</p>
                <img class='long-image' src="./assets/{button.LongContent.image}" alt="Dashboard View">
            {/if}

        </div>


        {#if button.expends}
            <button class="expender" on:click={ (e) => handleClick(e) }><span class="button-content" style="font-weight:bold">{ @html assign_button(button.expends) }</span></button>
        {:else}
            <a href="{button.link}" class="expender" target="_blank">{ @html assign_button(button.expends) }</a>
        {/if}
    </div>

<style>
    .titlelink{
        display: flex;
        align-items: center;
        margin: 0.5rem 0rem;
        padding-left: 0.5rem;
        font-size: 1.5rem;
        font-weight: bold;
        gap: 1rem;
        color: var(--blue);
        border-radius: 10px;
        height: 3rem;
        align-items: center;
        z-index: 1000;
    }

    .titlelink:hover{
        background-color: var(--orange);
        color: var(--white);
    }

    .titlelink:hover > a{
        color: var(--white) !important;
    }

    img{
        margin-top: 2rem;
        width:100%;
        height: auto;
    }

    :global(.md){
        margin: 0;
    }

    .box-content{
        margin-bottom: 1.7rem;
        user-select: none;
    }

    .box-content > p{
        margin: 0.5rem 0;
    }

    h4{
        margin: 3rem 0 0 0;
    }
    
    h3{
        margin:0;
    }

    .hidden{
        visibility: hidden;
        display: none;
    }

    .box{
        transition: linear 0.5s;
        display: grid;
        grid-template-columns: 2.5fr 12fr 1fr;
        gap: 1rem;
        min-height: var(--box-min-height);
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        border : 2px solid rgba(255,255,255,0.3);
        border-radius: 15px;
        position: relative;
        justify-content: center;
        align-items: normal;
        padding: 1.25rem 0.8rem;
        background-color: var(--blue);
        color: white;
        font-size: 1.5rem;
    }

    @media screen and (max-width: 720px){
        .box{
            min-height: auto !important;
            grid-template-columns: 1.5fr 12fr 1fr !important;
            gap: 0.5rem !important;
        }

        .box-content{
            margin-bottom: 0 !important;
        }
    }

    .box:hover{
        border-color: var(--orange) ;
        color: var(--orange);
    }

    :global(.expended ){
        background-color: white !important;
        color: var(--blue) !important;
        border: 4px solid var(--orange) !important;
    }

    :global(.expended > .logo > .box-logo){
        filter:  invert(60%) sepia(11%) saturate(1646%) hue-rotate(169deg) brightness(92%) contrast(97%) !important;
    }

    .box > .expender{
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        font-size: 2rem;
        border: none;
        color: var(--text-color);
        background-color: transparent;
        cursor: pointer;
        outline: none;
    }

    .box:hover > .expender{
        transition: linear 0.5s;
        color: var(--orange);
    }
    
    :global( .expended > .expender){
        transition: linear 0.5s;
        background-color: white !important;
        color: var(--blue) !important;
    }

    
    .box-logo{
        width: 100%;
        height: auto;
        filter: invert(1);
    }



</style>