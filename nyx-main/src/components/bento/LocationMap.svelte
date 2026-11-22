<script lang="ts">
	import { onMount } from 'svelte';
	import { IconMapPin, IconSun, IconMoon } from '@tabler/icons-svelte';
	import { browser } from '$app/environment';
	import { site } from '$lib/config/site';

	const { city, country, latitude, longitude, timeZone } = site.identity.seo.location;
	const center: [number, number] = [latitude, longitude];

	let mapContainer = $state<HTMLDivElement>();
	let leafletLoaded = $state(false);
	let mapInstance: L.Map | null = null;
	let currentTime = $state('');
	let isDaytime = $state(true);

	function updateTime() {
		const now = new Date();
		const localTime = new Intl.DateTimeFormat('en-US', {
			timeZone,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		}).format(now);
		currentTime = localTime;

		// Check if daytime (6 AM - 9 PM)
		const hour = parseInt(localTime.split(':')[0]);
		isDaytime = hour >= 6 && hour < 21;
	}

	onMount(() => {
		// Start clock
		updateTime();
		const interval = setInterval(updateTime, 1000);
		let destroyed = false;

		if (browser && mapContainer) {
			(async () => {
				const L = (await import('leaflet')).default;
				await import('leaflet/dist/leaflet.css');

				if (destroyed || !mapContainer) {
					return;
				}

				mapInstance = L.map(mapContainer, {
					zoomControl: false,
					attributionControl: false, // added below without the Leaflet prefix
					dragging: true,
					scrollWheelZoom: true,
					doubleClickZoom: true,
					boxZoom: true,
					keyboard: true,
					touchZoom: true
				}).setView(center, 11);
				L.control.attribution({ prefix: false }).addTo(mapInstance);

				// CARTO's dark tiles now need an API key; OpenStreetMap's don't, and are darkened in CSS below.
				L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
					maxZoom: 19,
					attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
					keepBuffer: 4,
					updateWhenIdle: false,
					updateWhenZooming: false
				}).addTo(mapInstance);

				leafletLoaded = true;
			})();
		}

		return () => {
			destroyed = true;
			clearInterval(interval);
		};
	});

	function recenterMap() {
		if (mapInstance) {
			mapInstance.setView(center, 11);
		}
	}
</script>

<div class="border-surface0 bg-base flex flex-col rounded-xl border p-4 shadow-lg lg:col-span-1">
	<button
		onclick={recenterMap}
		class="text-text hover:text-accent mb-3 flex w-full cursor-pointer items-center gap-2 text-left text-sm font-semibold transition-colors"
	>
		<IconMapPin size={16} class="text-accent" />
		Currently Based In 📍
	</button>
	<div class="bg-surface0 relative min-h-48 w-full flex-1 overflow-hidden rounded-lg">
		{#if browser}
			<div bind:this={mapContainer} class="location-map bg-surface0 h-full w-full"></div>
			{#if !leafletLoaded}
				<div class="bg-surface0 absolute inset-0 flex items-center justify-center">
					<span class="text-subtext1 text-xs">Loading map...</span>
				</div>
			{/if}
		{:else}
			<div class="absolute inset-0 flex items-center justify-center">
				<span class="text-subtext1 text-xs">Loading map...</span>
			</div>
		{/if}
	</div>
	<div class="mt-3 flex items-center justify-between gap-2">
		<button
			onclick={recenterMap}
			class="text-subtext0 hover:text-accent cursor-pointer text-xs whitespace-nowrap transition-colors"
		>
			{city}, {country}
		</button>
		{#if currentTime}
			<div class="flex items-center gap-1">
				{#if isDaytime}
					<IconSun size={12} class="text-yellow" />
				{:else}
					<IconMoon size={12} class="text-blue" />
				{/if}
				<span class="text-accent font-mono text-xs whitespace-nowrap">
					{currentTime}
				</span>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(.leaflet-container) {
		background: var(--color-base) !important;
	}

	:global(.leaflet-tile-container) {
		background: var(--color-base) !important;
	}

	:global(.leaflet-pane) {
		background: var(--color-base) !important;
	}

	/* OpenStreetMap only has light tiles, so turn them dark for the dark palettes */
	:global(html:not(.latte) .location-map .leaflet-tile-pane) {
		filter: invert(1) hue-rotate(180deg) brightness(0.95) contrast(0.85) saturate(0.4);
	}

	:global(.location-map.leaflet-container .leaflet-control-attribution) {
		background: color-mix(in srgb, var(--color-base) 80%, transparent);
		color: var(--color-subtext0);
		font-size: 9px;
	}

	:global(.location-map.leaflet-container .leaflet-control-attribution a) {
		color: var(--color-subtext1);
	}
</style>
