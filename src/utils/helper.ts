import chalk from 'chalk';
import jwt from 'jsonwebtoken';
import { EnvironmentFile } from '../enums/environment.enum';
import { type CommonEnvKeys } from '@/types/environment.type';

interface JwtPayload {
  userId: string; // Or any other data you want to include in the token
}

export type ChalkColor = typeof chalk.Color;

export const HR = (
  color: ChalkColor = 'white',
  char: string = '-',
  length: number = 60
): string => {
  return chalk[color](char.repeat(length));
};

const envScriptChalk = (fileName: string) => {
  const scriptChalk = chalk.bgBlueBright.bold;
  return `${scriptChalk(` cp .env.example ${fileName} `)}`;
};

export const envFileNotFoundError = (key: CommonEnvKeys): string => {
  const divider = HR('red', '~', 40);
  const envFile = EnvironmentFile[key];
  const defaultEnvFile = EnvironmentFile.DEFAULT;
  const envNotFoundMessage = chalk.red.bold('Environment file not found!!');
  const fileNotFoundMessage = `${chalk.greenBright(
    defaultEnvFile
  )} or ${chalk.greenBright(envFile)} is required`;
  return `
    \r${divider}\n
    \r${envNotFoundMessage}\n
    \r${divider}\n
    \r${fileNotFoundMessage}\n
    \r${chalk.bold('Try one of the following')}:\n
    \r${envScriptChalk(envFile)}\n
    \r${envScriptChalk(defaultEnvFile)}\n
    \r${divider}
  `;
};

export const generateStudentId = (): string => {
  const currentYear = new Date().getFullYear();
  const yearPart = currentYear.toString().slice(-2);

  const randomPart = Math.floor(Math.random() * 10_000_000)
    .toString()
    .padStart(7, '0');
  const studentId = `${yearPart}${randomPart}`;

  return studentId;
};

export const generateDefaultPassword = (): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const passwordLength = 6;
  let password = '';

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

export const generateAccessToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string | undefined = '24h'
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

export default generateAccessToken;
