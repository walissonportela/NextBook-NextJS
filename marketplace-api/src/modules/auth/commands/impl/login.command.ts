export class LoginCommand {
    constructor(
        public readonly data: {
            email: string;
            password: string;
        }
    ) {}
}