export interface IFile {
    id: number;
    name: string;
    modified: string;
    resxCount: number;
    translatedCount: number;
    fileSize: number;
    resources: IResource[];
}

export interface IResource {
    key: string;
    source: string;
    translation?: string;
    editor: string;
}

// tslint:disable-next-line: max-line-length
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. Phasellus ornare, ante vitae consectetuer consequat, purus sapien ultricies dolor, et mollis pede metus eget nisi. Praesent sodales velit quis augue. Cras suscipit, urna at aliquam rhoncus, urna quam viverra nisi, in interdum massa nibh nec erat.";

let files: IFile[] = [];

export async function getFiles(): Promise<IFile[]> {
    return getMockFiles();
}

function getMockFiles(): IFile[] {
    const N = 2e2;
    const M = 1e3;
    const date = Date.now();
    const dateStr = new Date(date).toLocaleTimeString();
    const fileSize = loremIpsum.length * M;
    files = new Array(N);
    for (let i = 0; i < N; i++) {
        const resources: IResource[] = new Array(M);
        for (let j = 0; j < M; j++) {
            resources[j] = {
                editor: "Pavlo Filipchuk",
                key: `File_${i + 1}:Resource_${j + 1}`,
                source: loremIpsum,
            };
        }
        files[i] = {
            fileSize,
            id: i,
            modified: dateStr,
            name: `File ${i + 1}`,
            resources,
            resxCount: M,
            translatedCount: 0,
        };
    }
// tslint:disable-next-line: no-console
    console.log(`Generated ${N * M} objects in ${(Date.now() - date) / 1000}s`);
    return files;
}
