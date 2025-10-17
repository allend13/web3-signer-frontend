import { match, P } from "ts-pattern"

export const INITIAL_ENVS = {
    DYNAMIC_ENV_ID: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID,
    TARGET_CHAIN_ID: process.env.NEXT_PUBLIC_TARGET_CHAIN_ID,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    EXPECTED_DOMAIN: process.env.NEXT_PUBLIC_EXPECTED_DOMAIN,
    EXPECTED_URI: process.env.NEXT_PUBLIC_EXPECTED_URI,
}

export const envs = match(INITIAL_ENVS)
    .with(
      {
        DYNAMIC_ENV_ID: P.string,
        TARGET_CHAIN_ID: P.string,
        API_URL: P.string,
        EXPECTED_DOMAIN: P.string,
        EXPECTED_URI: P.string,
      },
      (validatedEnvs) => validatedEnvs
    )
    .otherwise(() => {
        throw new Error('Invalid environment variables')
    })
    
