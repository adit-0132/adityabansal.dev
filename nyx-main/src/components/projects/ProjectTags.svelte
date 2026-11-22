<script lang="ts">
	import type { ProjectEntry } from '$types/projects';
	import { accentColorNames } from '$lib/stores/theme';
	import { IconTag } from '@tabler/icons-svelte';

	export let project: ProjectEntry;

	// Each tag gets a colour picked from its name, so "Python" looks the same on every card and visit
	function tagColor(tag: string) {
		let hash = 0;
		for (const char of tag.toLowerCase()) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
		return accentColorNames[hash % accentColorNames.length];
	}
</script>

{#if project.metadata.tags && project.metadata.tags.length > 0}
	<div class="flex max-h-8 flex-wrap gap-2 overflow-hidden pt-2 text-xs">
		<IconTag size={18} />

		{#each project.metadata.tags as tag (project.slug + tag)}
			<span
				class="tag bg-surface0 rounded px-2 py-1 font-semibold"
				style="color: var(--color-{tagColor(tag)})"
			>
				{tag}
			</span>
		{/each}
	</div>
{/if}
