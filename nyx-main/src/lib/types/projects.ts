export interface ProjectLink {
	text: string;
	url: string;
	icon?: string;
}

export interface ProjectImage {
	url: string;
	alt: string;
}

export interface ProjectMetadata {
	title: string;
	description: string;
	date: string;
	published: boolean;
	featured?: boolean;
	/** The body is a full landing page with its own hero: skip the generic banner and header. */
	landing?: boolean;
	tags?: string[];
	image?: ProjectImage;
	links?: ProjectLink[];
}

export interface WithMetadata {
	metadata: ProjectMetadata;
}

export interface ProjectEntry {
	slug: string;
	metadata: ProjectMetadata;
}

export interface ProjectPageData extends ProjectEntry {
	content: ConstructorOfATypedSvelteComponent;
}
