export declare const generateKey: (length?: number) => string;
export declare const generateDigitCode: (length?: number) => string;
export declare const generatePassword: (password: string, saltOrRounds?: number) => Promise<string>;
export declare const comparePassword: (password: string, hashPassword: string) => Promise<boolean>;
