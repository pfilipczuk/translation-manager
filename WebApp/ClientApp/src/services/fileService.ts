import { loremIpsum } from "./loremIpsum";

export interface IFile {
    id: number;
    name: string;
    resources: IResource[];
    modified: string;
    fileSize: number;
    resxCount: number;
    translatedCount: number;
}

export interface IResource {
    key: string;
    source: string;
    translation?: string;
    editor: string;
}

let files: IFile[] = [];

export async function getFiles(): Promise<IFile[]> {
    return getMockFiles();
}

function getMockFiles(): IFile[] {
    const N = 2e2;
    const M = 115;
    const date = Date.now();
    const dateStr = new Date(date).toLocaleString();
    const fileSize = 14000;
    files = new Array(N);
    for (let i = 0; i < N; i++) {
        const resources: IResource[] = new Array(M);
        for (let j = 0; j < M; j++) {
            resources[j] = {
                key: `${i + 1}.${j + 1}.achievement_for_the_glory_tooltip`,
                source: `${i + 1}:${j + 1} ${loremIpsum}`,
                translation: `${i + 1}:${j + 1}` + " Translated " + loremIpsum,
                // cSpell: disable
                editor: "Pavlo Filipchuk",
                // cSpell: enable
            };
        }
        files[i] = {
            id: i,
            name: `achievements ${i + 1}`,
            resources,
            modified: dateStr,
            fileSize,
            resxCount: M,
            translatedCount: 115,
        };
    }
    // tslint:disable-next-line: no-console
    console.log(`Generated ${N * M} objects in ${(Date.now() - date) / 1000}s`);
    return files;
}
