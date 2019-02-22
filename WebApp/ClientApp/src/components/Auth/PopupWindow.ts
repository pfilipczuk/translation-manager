import { toParams, toQuery } from "./Utils";

export interface ISuccess {
    code: string;
    [key: string]: string;
}

export class PopupWindow {

    public static open(id: string, url: string, options = {}) {
        const popup = new PopupWindow(id, url, options);

        popup.open();
        popup.poll();

        return popup;
    }

    private _iid: number | null | undefined;
    private promise: Promise<ISuccess>;

    private id: string;
    private url: string;
    private options: {};
    private window: Window | null | undefined;

    public constructor(id: string, url: string, options = {}) {
        this.id = id;
        this.url = url;
        this.options = options;
        this.promise = new Promise<ISuccess>((resolve) => resolve());
    }

    public open(): void {
        const { url, id, options } = this;

        this.window = window.open(url, id, toQuery(options, ","));
    }

    public close(): void {
        this.cancel();
        if (this.window) {
            this.window.close();
        }
    }

    public poll(): void {
        this.promise = new Promise((resolve, reject) => {
            this._iid = window.setInterval(() => {
                try {
                    const popup = this.window;

                    if (!popup || popup.closed !== false) {
                        this.close();

                        reject(new Error("The popup was closed"));

                        return;
                    }

                    if (popup.location.href === this.url || popup.location.pathname === "blank") {
                        return;
                    }

                    const params = toParams(popup.location.search.replace(/^\?/, "")) as ISuccess;

                    resolve(params);

                    this.close();
                } catch (error) {
                    // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
                }
            }, 500);
        });
    }

    public cancel(): void {
        if (this._iid) {
            window.clearInterval(this._iid);
            this._iid = null;
        }
    }

    public then(onSuccess: (data: ISuccess) => void, onFailure?: (error: Error) => void) {
        return this.promise.then(onSuccess, onFailure);
    }

    public catch(onFailure: (error: Error) => Promise<Error>) {
        return this.promise.catch(onFailure);
    }
}
