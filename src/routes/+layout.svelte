<script lang="ts">
	import favicon from '$lib/assets/favicon.jpg';
    import StarsBackground from '$lib/components/StarsBackground.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
    import 'katex/dist/katex.min.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<PageTitle/>
<StarsBackground/>
{@render children()}

<style>
	:global(body, html) {
		margin: 0;
		padding: 0;
        background-color: black;
		font-family: "Times New Roman", Times, serif;

		color: #e0e0de;
	}
</style>