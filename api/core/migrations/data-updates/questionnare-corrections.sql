-- production state on 1.3.2022
UPDATE `kogito-prod-core`.question
SET question = 'Nyní před sebou máte několik otázek a prosíme Vás, abyste u každé zvolila tu odpověď, která nejlépe vyjadřuje, jak jste se cítila v posledním týdnu. -- Byla jsem veselá a na svět se dívala převážně pozitivně',
    answers  = '[{"answer": "Ano, ve stejné míře jako obvykle", "points": 0}, {"answer": "Ano, ale ne v takové míře jako obvykle", "points": 1}, {"answer": "Rozhodně méně než obvykle", "points": 2}, {"answer": "Vůbec ne", "points": 3}]'
WHERE id = 329;
UPDATE `kogito-prod-core`.question
SET question = 'Hleděla jsem do budoucnosti s radostí a nadějí',
    answers  = '[{"answer": "Ano, ve stejné míře jako obvykle", "points": 0}, {"answer": "Ano, ale ne v takové míře jako obvykle", "points": 1}, {"answer": "Rozhodně méně než obvykle", "points": 2}, {"answer": "Vůbec ne", "points": 3}]'
WHERE id = 330;
UPDATE `kogito-prod-core`.question
SET question = 'Nepřiměřeně jsem se na sebe zlobila a vyčítala si, když se něco nedařilo',
    answers  = '[{"answer": "Ano, většinu času", "points": 3}, {"answer": "Ano, ale jen někdy", "points": 2}, {"answer": "Nepříliš často", "points": 1}, {"answer": "Vůbec ne", "points": 0}]'
WHERE id = 331;
UPDATE `kogito-prod-core`.question
SET question = 'Byla jsem úzkostná a ustaraná, aniž by k tomu byly rozumné důvody',
    answers  = '[{"answer": "Vůbec ne", "points": 0}, {"answer": "Ne, jen výjimečně", "points": 1}, {"answer": "Ano, někdy", "points": 2}, {"answer": "Ano, velmi často", "points": 3}]'
WHERE id = 332;
UPDATE `kogito-prod-core`.question
SET question = 'Cítila jsem se vyděšená, až trochu v panice, a to bez vážných důvodů',
    answers  = '[{"answer": "Ano, velmi často", "points": 3}, {"answer": "Ano, ale jen někdy", "points": 2}, {"answer": "Nepříliš často", "points": 1}, {"answer": "Vůbec ne", "points": 0}]'
WHERE id = 333;
UPDATE `kogito-prod-core`.question
SET question = 'Mnoho věcí se mě nepříjemně dotýkalo',
    answers  = '[{"answer": "Ano, většinou jsem nebyla schopna se s nesnázemi vyrovnat", "points": 3}, {"answer": "Ano, někdy jsem se s nesnázemi vyrovnávala hůře než obvykle", "points": 2}, {"answer": "Ne, většinou jsem se se vším dobře vyrovnávala", "points": 1}, {"answer": "Ne, vyrovnávala jsem se se vším bez potíží", "points": 0}]'
WHERE id = 334;
UPDATE `kogito-prod-core`.question
SET question = 'Byla jsem tak znepokojená, že jsem špatně spala',
    answers  = '[{"answer": "Ano, většinu času", "points": 3}, {"answer": "Ano, ale jen někdy", "points": 2}, {"answer": "Nepříliš často", "points": 1}, {"answer": "Vůbec ne", "points": 0}]'
WHERE id = 335;
UPDATE `kogito-prod-core`.question
SET question = 'Měla jsem špatnou a mizernou náladu',
    answers  = '[{"answer": "Ano, většinu času", "points": 3}, {"answer": "Ano, někdy", "points": 2}, {"answer": "Nepříliš často", "points": 1}, {"answer": "Vůbec ne", "points": 0}]'
WHERE id = 336;
UPDATE `kogito-prod-core`.question
SET question = 'Byla jsem tak nešťastná, že jsem plakala',
    answers  = '[{"answer": "Ano, většinu času", "points": 3}, {"answer": "Ano, častěji než jindy", "points": 2}, {"answer": "Ano, ale jen výjimečně", "points": 1}, {"answer": "Ne, nikdy", "points": 0}]'
WHERE id = 337;
UPDATE `kogito-prod-core`.question
SET question = 'Napadaly mě myšlenky, že si ublížím',
    answers  = '[{"answer": "Ano, velmi často", "points": 3, "overrideLabel": "Vd"}, {"answer": "Ano, ale jen někdy", "points": 2}, {"answer": "Zcela výjimečně", "points": 1}, {"answer": "Ne, nikdy", "points": 0}]'
WHERE id = 338;

UPDATE `kogito-prod-core`.question
SET question = 'Nyní před sebou máte druhou část otázek a prosíme Vás, abyste u každé zvolila tu odpověď, která nejlépe vyjadřuje, jak jste se cítila v posledním měsíci -- Mívám obavy o dítě či o průběh těhotenství.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 339;
UPDATE `kogito-prod-core`.question
SET question = 'Mívám strach, že mé dítě bude ohroženo.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 340;
UPDATE `kogito-prod-core`.question
SET question = 'Mívám pocit, že se stane něco špatného.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 341;
UPDATE `kogito-prod-core`.question
SET question = 'Obávám se mnoha věcí.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 342;
UPDATE `kogito-prod-core`.question
SET question = 'Obávám se budoucnosti.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 343;
UPDATE `kogito-prod-core`.question
SET question = 'Často si připadám přetížená.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 344;
UPDATE `kogito-prod-core`.question
SET question = 'Mívám veliký strach z věcí, jako jsou jehly, krev, porod, bolest apod.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 345;
UPDATE `kogito-prod-core`.question
SET question = 'Mívám náhlé stavy velikého strachu a celkové nepohody.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 346;
UPDATE `kogito-prod-core`.question
SET question = 'Přepadají mě opakující se nepříjemné myšlenky, které je těžké zastavit nebo kontrolovat.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 347;
UPDATE `kogito-prod-core`.question
SET question = 'Mívám problém se spánkem i přesto, že mám možnost jít spát.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 348;
UPDATE `kogito-prod-core`.question
SET question = 'Stává se mi, že musím některé věci udělat přesně podle určitého sledu.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 349;
UPDATE `kogito-prod-core`.question
SET question = 'Chci mít vše udělané perfektně.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 350;
UPDATE `kogito-prod-core`.question
SET question = 'Potřebuji mít věci zcela pod kontrolou.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 351;
UPDATE `kogito-prod-core`.question
SET question = 'Mívám problém přestat kontrolovat vykonané úkoly, případně se mi stává, že některé činnosti opakuji stále a stále dokola.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 352;
UPDATE `kogito-prod-core`.question
SET question = 'Velmi snadno, někdy i z ničeho nic, se v poslední době vylekám.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 353;
UPDATE `kogito-prod-core`.question
SET question = 'Koncentruji se na opakující se nepříjemné myšlenky.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 354;
UPDATE `kogito-prod-core`.question
SET question = 'Zabezpečuji se a vyhýbám se určitým věcem či situacím.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 355;
UPDATE `kogito-prod-core`.question
SET question = 'Opakovaně mě rozhodí vzpomínky, sny nebo noční můry.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 356;
UPDATE `kogito-prod-core`.question
SET question = 'Obávám se, že se před ostatními lidmi ztrapním.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 357;
UPDATE `kogito-prod-core`.question
SET question = 'Obávám se, že mě ostatní lidé budou negativně hodnotit.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 358;
UPDATE `kogito-prod-core`.question
SET question = 'Cítím se velmi nejistě ve větší skupině lidí či v davu.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 359;
UPDATE `kogito-prod-core`.question
SET question = 'Vyhýbám se sociálním situacím, protože by mi přinesly velkou nervozitu.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 360;
UPDATE `kogito-prod-core`.question
SET question = 'Vyhýbám se svým koníčkům a zálibám.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 361;
UPDATE `kogito-prod-core`.question
SET question = 'Mívám pocit odtažení od sebe, jako bych se na sebe dívala v nějakém filmu.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 362;
UPDATE `kogito-prod-core`.question
SET question = 'Ztrácím se v časové posloupnosti a mívám problém zapamatovat si, co se stalo.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 363;
UPDATE `kogito-prod-core`.question
SET question = 'Obtížně si nyní zvykám na změny.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 364;
UPDATE `kogito-prod-core`.question
SET question = 'Úzkostné prožívání mi brání ve schopnosti cokoliv dělat.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 365;
UPDATE `kogito-prod-core`.question
SET question = 'Myšlenky, které mi probíhají hlavou, mi způsobují problémy dostatečně se koncentrovat na jakoukoliv jinou činnost.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 366;
UPDATE `kogito-prod-core`.question
SET question = 'Mám strach, že nad sebou ztratím kontrolu.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 367;
UPDATE `kogito-prod-core`.question
SET question = 'Pociťuji paniku.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 368;
UPDATE `kogito-prod-core`.question
SET question = 'Pociťuji nervozitu.',
    answers  = '[{"answer": "Nikdy", "points": 0}, {"answer": "Zřídka", "points": 1}, {"answer": "Často", "points": 2}, {"answer": "Téměř stále", "points": 3}]'
WHERE id = 369;