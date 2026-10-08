import * as z from 'zod'


export const envValidationSchema = z.object({
    //coerce converts the value to a number using Number(value) and then validates it.
    APP_PORT: z.coerce.number().int().positive(),
    APP_NODE: z.enum(['development', 'test', 'production']),
    CORS_ORIGIN: z.string().min(1),

    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().int().positive(),    
    DB_USER: z.string().min(1),    
    DB_PASSWORD: z.string().min(1),    
    DB_NAME: z.string().min(1),    
    
    JWT_SECRET: z.string().min(32),
    JWT_EXPIRES_IN: z.string()
    // It is initialized with ^; the “d” means it must be more than one number; “smhd” stands for “s” for seconds, “m” for minutes, ‘h’ for hours, and “d” for days; and it ends with $
    //Also it should be 1h or 60m or 3600s and 7d, the normaly is put it in hours 
    .regex(/^\d+[smhd]$/)
    .optional(),

    OBSERVE_APP_KEY: z.string().optional(), 
    OBSERVE_APP_SECRET: z.string().optional(),
    OBSERVE_SERVICE_ID: z.string().optional(),
}); 


export const validateEnv = (config: Record<string, unknown>) => {
    const result = envValidationSchema.safeParse(config);

    if(!result.success) {
        const details = result.error.issues
            .map((issue) => ` - ${issue.path.join('.')}: ${issue.message}`)
            .join('\n');
        console.log(details)
        throw new Error(`Invalid environment variables \n${details}`)
    }
    
    return config;
};