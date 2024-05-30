<script>

    export let button;

    let rotation = 0;
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

            // check if the box is expended, rotate the arrow
            rotation += 45;
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
                <img src="./assets/icons/arrow_black.svg" alt="" class="arrow">
                <a style="color:var(--blue);cursor:pointer;" href={button.LongContent.Link} target="_blank">{button.LongContent.Title}</a>
            </div>
            
            <p class="long-content">{button.LongContent.Content}</p>
            <img class='long-image' src="./assets/{button.LongContent.image}" alt="Dashboard View">
        {/if}
    </div>

    {#if button.expends}
        <button class="expender" on:click={ (e) => handleClick(e) }>
            <img src="./assets/icons/UI_icon_open.svg" alt="" class="expends-button" width="100%" height=100% style="transform:rotate({rotation}deg)">
        </button>

    {:else}
        <a href="{button.link}" class="expender" target="_blank">
            <img src="./assets/icons/UI_icon__arrow.svg" alt="" class="expends-button" width="100%" height=100%>
        </a>
    {/if}
</div>

<style>

    .expends-button{
        filter: invert(1);
    }

    .arrow{
        width: 2.5rem;
        height: auto;
        filter: invert(85%) sepia(48%) saturate(6687%) hue-rotate(351deg) brightness(98%) contrast(102%);
    }

    .titlelink:hover > .arrow{
        filter: invert(1);
    }

    .titlelink{
        display: flex;
        align-items: center;
        margin: 0.5rem 0rem;
        padding-left: 0.75rem;
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
        width:100%;
        height: auto;
    }

    :global(.md){
        margin: 0;
    }

    .box-content{
        user-select: none;;
    }

    .box-content > p{
        margin: 0.5rem 0;
    }

    .box-text, .long-content{
        font-size: 1.25rem;
    }

    .long-image{
        margin-top: 2rem;
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
        grid-template-columns: 2.25fr 12fr 1fr;
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
        padding: 1.7rem 1.3rem;
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
        border-color: var(--light-orange) ;
        color: var(--light-orange);
    }

    :global(.expended ){
        background-color: white !important;
        color: var(--blue) !important;
        border: 4px solid var(--orange) !important;
    }

    .box > .expender{
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        border: none;
        color: var(--text-color);
        background-color: transparent;
        cursor: pointer;
        outline: none;
        width: 25px;
        height: 25px;
        padding: 0 !important
    }

    .box:hover > .expender{
        transition: linear 0.5s;
        color: var(--light-orange);
    }

    .box:hover > .expender > img{
        filter: invert(100%) sepia(94%) saturate(2937%) hue-rotate(306deg) brightness(101%) contrast(108%);
        transition: linear 0.5s;
    }
    
    :global( .expended > .expender){
        transition: linear 0.5s;
        background-color: transparent !important;
        color: var(--blue) !important;
    }

    :global( .expended > .expender > img ){
        transition: linear 0.5s;
        filter: invert(60%) sepia(11%) saturate(1646%) hue-rotate(169deg) brightness(92%) contrast(97%) !important;
    }

    .box-logo{
        width: 100%;
        height: auto;
        filter: invert(1);
    }

    .logo{
        max-width: 45px;
        min-width: 35px;
    }

    :global(.expended > .logo > .box-logo){
        filter:  invert(60%) sepia(11%) saturate(1646%) hue-rotate(169deg) brightness(92%) contrast(97%) !important;
    }


</style>