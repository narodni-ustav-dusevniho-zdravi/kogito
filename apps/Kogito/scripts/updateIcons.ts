import {FontAssetType, generateFonts, OtherAssetType} from 'fantasticon';
import * as fs from 'fs';
import * as path from 'path';

import {isCmd, logger, runTerminal} from './utils';

const fixPaths = false;
const fontName = 'icons';
const resDir = path.join('resources', 'icons');
const inputDir = fixPaths
  ? path.join('resources', 'icons', '__generated__')
  : resDir;
const outputDir = path.join('assets', 'fonts');

const prepareIconFont = async () => {
  logger.log('preparing icons');

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, {recursive: true});
  if (fixPaths) {
    if (!fs.existsSync(inputDir)) fs.mkdirSync(inputDir, {recursive: true});

    runTerminal(
      `npx oslllo-svg-fixer -s ${resDir} -d ${inputDir} --trace-resolution 2000 --show-progress`,
    );
  }

  await generateFonts({
    name: fontName,
    fontTypes: [FontAssetType.TTF],
    assetTypes: [OtherAssetType.JSON],
    formatOptions: {
      json: {indent: 2},
      //svg: {centerHorizontally: true, centerVertically: true},
    },
    templates: {},
    pathOptions: {
      json: path.join('src', 'modules', 'ui', 'config', 'iconSet.json'),
    },
    codepoints: {},
    fontHeight: 300,
    round: undefined,
    descent: undefined,
    normalize: true,
    tag: 'i',
    prefix: 'icon',
    inputDir,
    outputDir,
  });
  logger.log('prepared icons');
};

const run = async () => {
  if (isCmd()) return logger.warn('updateIcons is not supported in cmd');
  await prepareIconFont();
  runTerminal('yarn react-native-asset');
  fixPaths && fs.rmSync(inputDir, {recursive: true});
};

void run();
