interface GitHubLoginProps {
    buttonText?: string;
    children?: React.ReactNode;
    className?: string; 
    clientId: string;
    onRequest?: () => void;
    onSuccess?: (data) => void;
    onFailure?: (error) => void;
    redirectUri: string;
    scope: string;
}

declare module "react-github-login" {
    export default class GitHubLogin extends React.Component<GitHubLoginProps> {
        public static defaultProps = {
            buttonText: 'Sign in with GitHub',
            scope: 'user:email',
            onRequest: () => {},
            onSuccess: () => {},
            onFailure: () => {},
        }

        public render(): JSX.Element;
    }
}
