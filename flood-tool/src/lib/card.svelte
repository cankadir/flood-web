<script>

    import SvelteMarkdown from 'svelte-markdown'

    export let button;
    import { page } from '$app/stores';
    let preparedness = $page.data.props.preparedness;
    
    console.log( button );

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
        }
        else{
            console.log("not expending");
        }
    }

</script>


    <div class="box" id="{button.Title.toLowerCase().replaceAll(" ","-")}">
        <div class="logo">{button.logo}</div>

        <!-- This gets replaced on click -->
        <div class="box-content">
            <h3>{button.Title}</h3>
            <p class="box-text">{button.ShortContent}</p>
        </div>

        <div class="box-content hidden">
            <h3>{button.Title}</h3>
            <p class="box-text">{button.ShortContent}</p>
            <!-- if there is a LongContent key in the button -->
            
            {#if button.Title != "Prepare"}
                {#if Object.keys(button).includes("LongContent")}
                    <div class="titlelink">
                    <div>&#10132;</div>
                    <a style="color:var(--blue);cursor:pointer;" href="{button.LongContent.Link}"><h3>{button.LongContent.Title}</h3></a>
                    </div>
                    <p class="long-content">{button.LongContent.Content}</p>
                    <img class='long-image' src="./assets/{button.LongContent.image}" alt="Dashboard View">
                {/if}
            {:else}
                {#each preparedness as prep}
                    <h4>{prep.fields.Subtitle}</h4>
                    <a href="{prep.fields.link}" class="helplink"><span>{prep.fields.link}</span></a>
                    <SvelteMarkdown source={prep.fields.Content} class='md'/>
                {/each}
            {/if}
        </div>
        <button class="expender" on:click={ (e) => handleClick(e) }><span class="button-content" style="font-weight:bold">{ @html assign_button(button.expends) }</span></button>
    </div>

<style>
    .titlelink{
        display: flex;
        align-items: center;
        margin: 1rem 0;
        font-size: 3 rem;
        font-weight: bold;
        gap: 1rem;
        color: var(--blue);
        border-radius: 10px;
        height: 3rem;
        align-items: center;
        z-index: 10;
    }

    .titlelink:hover{
        background-color: var(--orange);
        color: var(--white);
    }

    .titlelink:hover > a{
        color: var(--white);
    }

    img{
        width:100%;
        height: auto;
    }

    :global(.md){
        margin: 0;
    }

    .box-content{
        pointer-events: none !important;
        margin-bottom: 1.7rem;
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
        grid-template-columns: 1fr 12fr 1fr;
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
        padding: 1.5rem 1rem;
        background-color: var(--blue);
        color: white;
        font-size: 1.5rem;
    }

    .box:hover{
        border-color: var(--orange) ;
        color: var(--orange);
    }

    :global(.expended){
        background-color: white !important;
        color: var(--blue) !important;
        border: 4px solid var(--orange) !important;

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

    
    .logo{
        font-size: 1.7rem;
        display: flex;
        justify-content: center;
        color: var(--blue);
    }
</style>