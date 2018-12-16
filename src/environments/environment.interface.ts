export interface EnvironmentInterface {
    mode: 'production' | 'development' | 'staging';
    app?: {
        title?: string,
        description?: string,
        keywords?: string,
        companyName?: string
    };
    port?: number;
    host?: string;
    mongodb_host?: string;
    root_path?: string;
    jwt_secret?: string;
    mailer?: {
        from?: string,
        options?: {
            service?: string,
            auth?: {
                user?: string,
                pass?: string
            }
        }
    };
    destination_path?: string;
    public_folder_path?: string;
}