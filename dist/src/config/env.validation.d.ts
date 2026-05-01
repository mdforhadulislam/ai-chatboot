declare class EnvValidation {
    PORT?: number;
    DATABASE_URL?: string;
    JWT_SECRET?: string;
    JWT_EXPIRES_IN?: string;
    OPENAI_API_KEY?: string;
    OPENAI_MODEL?: string;
    META_VERIFY_TOKEN?: string;
    META_PAGE_ACCESS_TOKEN?: string;
    WHATSAPP_VERIFY_TOKEN?: string;
    WHATSAPP_ACCESS_TOKEN?: string;
    WHATSAPP_PHONE_NUMBER_ID?: string;
    RESEND_API_KEY?: string;
    EMAIL_FROM?: string;
    REDIS_URL?: string;
    FRONTEND_URL?: string;
    THROTTLE_TTL?: number;
    THROTTLE_LIMIT?: number;
    CORS_ORIGINS?: string;
}
export declare function validate(config: Record<string, unknown>): EnvValidation;
export {};
