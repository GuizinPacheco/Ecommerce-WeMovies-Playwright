import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, 
  retries: 0,   
  workers: 1,
  reporter: 'html',
  timeout: 600000,    
  use: {
    trace: 'on-first-retry',
    video: 'retain-on-failure', 
    launchOptions: {
      slowMo: 900,
    },    
  }, 
  
  projects: [
    {
      name: 'msedge',
      use: { ...devices['Desktop Edge'],
      deviceScaleFactor: undefined,
      headless: false,
      channel: 'msedge',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0',
      locale: 'pt-BR',
      timezoneId: 'America/Sao_Paulo',     
      viewport: null,
      },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], 
      deviceScaleFactor: undefined,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      locale: 'pt-BR',
      timezoneId: 'America/Sao_Paulo', 
      viewport: null,
      headless: false,
      },  
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'],
        headless: false,                  // roda com navegação visível
        locale: 'pt-BR',
        timezoneId: 'America/Sao_Paulo',
      },
    }
  ],
});
