<script>
    import { slide } from 'svelte/transition';

    export let title = '';
    export let id = '';
    export let headingLevel = 2;

    let open = false;

    $: buttonId = `${id}-button`;
    $: panelId = `${id}-panel`;

    function toggle() {
        open = !open;
    }
</script>

<div class="accordion" class:open id={id}>
    <svelte:element this={"h" + headingLevel} class="accordion-heading">
        <button
            type="button"
            class="accordion-trigger"
            id={buttonId}
            aria-expanded={open}
            aria-controls={panelId}
            on:click={toggle}
        >
            {title}
            <img
                src="./assets/icons/FN_FW_UI_icon_open.svg"
                alt=""
                aria-hidden="true"
                class="toggle-icon"
                class:rotated={open}
            />
        </button>
    </svelte:element>

    {#if open}
        <div
            id={panelId}
            class="accordion-panel"
            role="region"
            aria-labelledby={buttonId}
            transition:slide={{ duration: 200 }}
        >
            <slot />
        </div>
    {/if}
</div>

<style>
    .accordion {
        width: 100%;
    }

    .accordion-heading {
        margin: 0 0 25px 0;
        font-size: 2.5rem;
        font-weight: inherit;
        line-height: 1.2;
        color: var(--white);
        border-bottom: 1px solid var(--white);
        transition: color 0.2s ease, border-color 0.2s ease;
    }

    .accordion.open .accordion-heading,
    .accordion:hover .accordion-heading {
        color: var(--light-orange);
        border-bottom-color: var(--light-orange);
    }

    .accordion.open .accordion-heading {
        margin-bottom: 0;
    }

    .accordion-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        width: 100%;
        padding: 0;
        border: none;
        margin: 0;
        background: none;
        color: inherit;
        font: inherit;
        text-align: left;
        cursor: pointer;
    }

    .accordion-trigger:focus-visible {
        outline: 2px solid var(--light-orange);
        outline-offset: 2px;
    }

    .toggle-icon {
        flex-shrink: 0;
        width: 1.25rem;
        height: auto;
        transition: transform 0.2s linear, filter 0.2s ease;
        filter: invert(1);
    }

    .accordion.open .toggle-icon,
    .accordion:hover .toggle-icon {
        filter: invert(85%) sepia(48%) saturate(6687%) hue-rotate(351deg) brightness(98%) contrast(102%);
    }

    .toggle-icon.rotated {
        transform: rotate(45deg);
    }

    .accordion-panel {
        margin-top: 25px;
        overflow: hidden;
    }
</style>
