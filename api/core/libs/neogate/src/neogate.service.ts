import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import fetch from 'node-fetch';
import * as xmldoc from 'xmldoc';
import { AppConfigurationService } from '@app/configuration/app.configuration.service';

export const NO_ERROR = 0;
export const UNKNOWN_ERROR = 1;
export const BAD_LOGIN = 2;

// err=-1 duplicitní user_id - stejně označená sms byla odeslaná jiţ v minulosti
// err=1 neznámá chyba
// err=2 neplatný login
// err=3 neplatný hash nebo password (podle varianty zabezpečení přihlášení)
// err=4 neplatný time, větší odchylka času mezi servery neţ maximální akceptovaná
// v nastavení sluţby SMS Connect
// err=5 nepovolená IP, viz nastavení sluţby SMS Connect
// err=6 neplatný název akce
// err=7 tato sul byla jiţ jednou za daný den pouţita
// err=8 nebylo navázáno spojení s databází
// err=9 nedostatečný kredit
// err=10 neplatné číslo příjemce SMS
// err=11 prázdný text zprávy
// err=12 SMS je delší neţ povolených 459 znaků

const ENDPOINT = 'https://api.smsbrana.cz/smsconnect/http.php';

type AuthData = {
  login: string;
  salt: string;
  time: string;
  hash: string;
};

type SMSPayload = {
  number: string;
  action: 'send_sms';
  message: string;
  sender_id: string;
} & AuthData;

export type Result = {
  success: boolean;
  errorCode?: number;
};

const createAuthData = (login: string, password: string): AuthData => {
  const time = new Date().toISOString();
  const salt = crypto.randomBytes(5).toString('hex');

  return {
    login,
    salt,
    time,
    hash: crypto
      .createHash('md5')
      .update(`${password}${time}${salt}`)
      .digest('hex'),
  };
};

@Injectable()
export class NeogateService {
  constructor(
    private readonly appConfigurationService: AppConfigurationService,
  ) {}

  async sendSms(number: string, message: string): Promise<Result> {
    if(this.appConfigurationService.fakeSMSSending()){
      return {
        success: true
      }
    }

    const settings = this.appConfigurationService.neogateSettings();

    const payload: SMSPayload = {
      ...createAuthData(settings.login, settings.password),
      action: 'send_sms',
      number,
      message,
      sender_id: settings.sender,
    };

    const params = new URLSearchParams(payload).toString();

    try {
      const response = await fetch(`${ENDPOINT}?${params}`);
      const responseText = await response.text();
      const xml = new xmldoc.XmlDocument(responseText);

      console.log(responseText);
      const errorCode = parseInt(xml.valueWithPath('err'));

      if (errorCode === NO_ERROR) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          errorCode,
        };
      }
    } catch (e) {
      console.log(e);
    }

    return {
      success: false,
    };
  }
}
