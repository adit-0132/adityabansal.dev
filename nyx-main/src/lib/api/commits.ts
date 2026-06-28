export interface CommitLanguage {
	size: number;
	name: string;
	color: string;
}

export interface ProcessedCommit {
	repo: string;
	message: string;
	href: string;
	sha: string;
	date: string;
	additions?: number;
	deletions?: number;
}

export interface CommitData {
	commits: ProcessedCommit[];
	languages: CommitLanguage[];
	totalAdditions: number;
	totalDeletions: number;
	totalCommits: number;
}

export const emptyCommitData: CommitData = {
	commits: [],
	languages: [],
	totalAdditions: 0,
	totalDeletions: 0,
	totalCommits: 0
};
