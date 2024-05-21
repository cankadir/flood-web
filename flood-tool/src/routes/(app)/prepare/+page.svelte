<script>
    export let data;

    let data_simple = data.props.prep.map(prep => prep.fields);
    data_simple.sort((a, b) => a.order - b.order);

    // group data by Title
    let data_grouped = data_simple.reduce((r, a) => {
        r[a.Title] = r[a.Title] || [];
        r[a.Title].push(a);
        return r;
    }, Object.create(null));

    function assign_button( is_expends){
        if(is_expends){
            return "&#43;"; // Plus Sign
        }else{
            return "&#10132;"; // Blocky Arrow
        }
    }

</script>

<section>
    {#each Object.keys(data_grouped) as key}
        <div class="prep-item">
            <h2>{key}</h2>

            <div class="resources">
                {#each data_grouped[key] as item}
                    <div class="box" id="{item.Subtitle.toLowerCase().replaceAll(" ","-")}">
                        <div class="box-content">
                            <h4>{item.Subtitle}</h4>
                            <p class="box-text">{item.Content}</p>
                        </div>
                        <a href="https://{item.link}/" class="expender" target="_blank">{ @html assign_button(item.expends) }</a>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</section>

<style>

    h2{
        font-size: 2.5rem;
        margin-bottom: 25px;
    }

    .resources{
        display: flex;
        flex-direction: column;
        margin: 0 0 0 5rem;
        gap: 1rem;
    }

    .prep-item {
        display: flex;
        flex-direction: column;
    }

    .box{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        border : 2px solid rgba(255,255,255,0.3);
        border-radius: 15px;
        position: relative;
        justify-content: center;
        align-items: normal;
        padding: 2rem 2rem;
        background-color: var(--blue);
        color: white;
        font-size: 1.5rem;
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

    .box:hover{
        border-color: var(--orange) ;
        color: var(--orange);
    }


</style>