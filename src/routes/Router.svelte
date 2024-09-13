<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    const currentRoute = writable({ route: 'landing', component: null, layout: null });

    const updateRoute = async () => {
        const hash = window.location.hash || '#/';
        const route = hash.substring(2) || 'landing'; // Extract the route from the hash

        let component, layout;
        try {
            switch (route) {
                case 'landing':
                case 'home':
                case 'contact':
                case 'about':
                case 'prepare':
                    ({ component, layout } = await getAppRoute(route));
                    break;
                case 'floodnet':
                case 'floodwatch':
                case 'local-reports':
                case 'participate':
                    ({ component, layout } = await getMapRoute(route));
                    break;
            }
        } catch (e) {
            console.error(`Failed to load component or layout for route: ${route}`, e);
            layout = null; // No layout for Error
        }

        currentRoute.set({ route, component, layout });
    };

    const getAppRoute = async (route) => {
        let layout = (await import('./(app)/+layout.svelte')).default;
        let component;
        if (route === 'landing'){
            component = (await import('./(app)/+page.svelte')).default;
        } else {
            component = (await import(`./(app)/${route}/+page.svelte`)).default;
        }
        return { component, layout };
    };

    const getMapRoute = async (route) => {
        // let component;
        let layout = (await import('./(map)/+layout.svelte')).default;
        let component = (await import(`./(map)/${route}/+page.svelte`)).default;
    
        return { component, layout };
    };

    // Listen for hash changes
    window.addEventListener('hashchange', updateRoute);

    // Initialize the current route on load
    onMount(updateRoute);

    export { currentRoute };
</script>


{#if $currentRoute.layout}
    <svelte:component this={$currentRoute.layout}>
        <svelte:component this={$currentRoute.component} />
    </svelte:component>
{/if}
