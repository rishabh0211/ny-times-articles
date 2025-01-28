export type Article = {
	uri: string;
	url: string;
	id: number;
	asset_id: number;
	source: string;
	published_date: string;
	updated: string;
	section: string;
	subsection: string;
	nytdsection: string;
	adx_keywords: string;
	column: any;
	byline: string;
	type: string;
	title: string;
	abstract: string;
	des_facet: string[];
	org_facet: string[];
	per_facet: string[];
	geo_facet: string[];
	media: Media[];
	eta_id: number;
};

export type Media = {
	type: string;
	subtype: string;
	caption: string;
	copyright: string;
	approved_for_syndication: number;
	'media-metadata': Metadaum[];
};

export type Metadaum = {
	url: string;
	format: ImageFormat;
	height: number;
	width: number;
};

export type ImageFormat =
	| 'Standard Thumbnail'
	| 'mediumThreeByTwo210'
	| 'mediumThreeByTwo440';
