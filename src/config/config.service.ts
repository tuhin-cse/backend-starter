import { configDotenv } from 'dotenv';

configDotenv();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return <string>value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', false);
  }

  public getJwtSecret() {
    return this.getValue('JWT_SECRET', true);
  }

  public getDatabaseUrl() {
    return this.getValue('DATABASE_URL', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode === 'PRODUCTION';
  }
}

export const configService = new ConfigService(process.env).ensureValues([
  'DATABASE_URL',
  'JWT_SECRET',
]);
