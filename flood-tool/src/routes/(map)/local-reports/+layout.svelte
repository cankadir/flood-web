
<script>
    import '../../../style.css';
</script>

<!-- Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>

<!-- All webmap Content goes here -->
<section>
    <slot />
</section>


<style>
    section{
        margin: 0;
        padding: 0;

    }
</style>