window.addEventListener('load', function () {
    // obtain plugin
    var cc = initCookieConsent();

    // run plugin with your configuration
    cc.run({
        current_lang: 'cz',
        autoclear_cookies: true, // default: false
        theme_css: '/build/css/libs/cookieconsent.css', // 🚨 replace with a valid path
        page_scripts: true, // default: false

        // mode: 'opt-in'                          // default: 'opt-in'; value: 'opt-in' or 'opt-out'
        // delay: 0,                               // default: 0
        // auto_language: '',                      // default: null; could also be 'browser' or 'document'
        // autorun: true,                          // default: true
        // force_consent: false,                   // default: false
        // hide_from_bots: false,                  // default: false
        // remove_cookie_tables: false             // default: false
        // cookie_name: 'cc_cookie',               // default: 'cc_cookie'
        // cookie_expiration: 182,                 // default: 182 (days)
        // cookie_necessary_only_expiration: 182   // default: disabled
        // cookie_domain: location.hostname,       // default: current domain
        // cookie_path: '/',                       // default: root
        // cookie_same_site: 'Lax',                // default: 'Lax'
        // use_rfc_cookie: false,                  // default: false
        // revision: 0,                            // default: 0

        onFirstAction: function (user_preferences, cookie) {
            // callback triggered only once on the first accept/reject action
        },

        onAccept: function (cookie) {
            // callback triggered on the first accept/reject action, and after each page load
        },

        onChange: function (cookie, changed_categories) {
            // callback triggered when user changes preferences after consent has already been given
        },

        gui_options: {
            consent_modal: {
                layout: 'cloud', // box/cloud/bar
                position: 'bottom center', // bottom/middle/top + left/right/center
                transition: 'slide', // zoom/slide
                swap_buttons: false, // enable to invert buttons
            },
        },
        languages: {
            cz: {
                consent_modal: {
                    title: 'Používáme cookies.',
                    description:
                        'Náš web používá cookies. Ty mohou být uloženy až po Vašem souhlasu. <button type="button" data-cc="c-settings" class="cc-link">Přečíst více</button>',
                    primary_btn: {
                        text: 'Příjmout vše',
                        role: 'accept_all', // 'accept_selected' or 'accept_all'
                    },
                    secondary_btn: {
                        text: 'Nastavení',
                        role: 'settings', // 'settings' or 'accept_necessary'
                    },
                },
                settings_modal: {
                    title: 'Nastavení cookies',
                    save_settings_btn: 'Uložit',
                    accept_all_btn: 'Příjmout vše a zavřít',
                    cookie_table_headers: [
                        { col1: 'Název' },
                        { col2: 'Doména' },
                        { col3: 'Platnost' },
                        { col4: 'Popis' },
                        { col5: 'Typ' },
                    ],
                    blocks: [
                        {
                            title: 'Použití cookies',
                            description:
                                'Cookies slouží ke správné funkci našeho webu. Můžete si ovšem vybrat, které cookies se mohou uložit a které ne.',
                        },
                        {
                            title: 'Technické cookies',
                            description:
                                'Tyto soubory cookie jsou vyžadovány, aby byla zajištěna základní funkčnost. Bez těchto cookies nebude web fungovat správně. Ve výchozím nastavení jsou povoleny a nelze je zakázat.',
                            toggle: {
                                value: 'necessary',
                                enabled: true,
                                readonly: true, // cookie categories with readonly=true are all treated as "necessary cookies"
                            },
                            cookie_table: [
                                // list of all expected cookies
                                {
                                    col1: 'PHPSESSID',
                                    col2: 'perinatal.cz',
                                    col3: 'Session',
                                    col4: 'Session ID nutné pro chod webu',
                                    col5: '',
                                    is_regex: true,
                                },
                                {
                                    col1: 'criticalCss',
                                    col2: 'perinatal.cz',
                                    col3: '1 rok',
                                    col4: 'Nutné pro načítání stylů na webu',
                                    col5: 'Permanent cookie',
                                    is_regex: true,
                                },
                                {
                                    col1: '^blog-article-evaluation',
                                    col2: 'perinatal.cz',
                                    col3: '1 rok',
                                    col4: 'Nutné pro ukládání hodnocení článků',
                                    col5: 'Permanent cookie',
                                    is_regex: true,
                                },
                                {
                                    col1: 'calculator-hints',
                                    col2: 'perinatal.cz',
                                    col3: '1 rok',
                                    col4: 'Nutné pro zobrazení nápovědy',
                                    col5: 'Permanent cookie',
                                    is_regex: true,
                                },
                                {
                                    col1: '^page-modal',
                                    col2: 'perinatal.cz',
                                    col3: '1 rok',
                                    col4: 'Nutné pro zobrazení modalu',
                                    col5: 'Permanent cookie',
                                    is_regex: true,
                                },
                                {
                                    col1: 'trolley-option',
                                    col2: 'perinatal.cz',
                                    col3: '1 rok',
                                    col4: 'Nutné pro zobrazení vozíku',
                                    col5: 'Permanent cookie',
                                    is_regex: true,
                                },
                            ],
                        },
                        {
                            title: 'Analytické cookies',
                            description:
                                'Pomoci těchto cookies sledujeme statistiky přístupů na náš web. Tato data jsou anonymní.',
                            toggle: {
                                value: 'analytics', // your cookie category
                                enabled: true,
                                readonly: false,
                            },
                            cookie_table: [
                                // list of all expected cookies
                                {
                                    col1: '^_ga', // match all cookies starting with "_ga"
                                    col2: 'google.com',
                                    col3: '2 roky',
                                    col4: 'Statistiky',
                                    col5: 'Permanent cookie',
                                    is_regex: true,
                                },
                                {
                                    col1: '_hjAbsoluteSessionInProgress',
                                    col2: 'https://vars.hotjar.com',
                                    col3: '30 minut',
                                    col4: 'Statistiky',
                                    col5: 'Permanent cookie',
                                    is_regex: true,
                                },
                                {
                                    col1: '_hjFirstSeen',
                                    col2: 'https://vars.hotjar.com',
                                    col3: '30 minut',
                                    col4: 'Statistiky',
                                    col5: 'Permanent cookie',
                                    is_regex: true,
                                },
                                {
                                    col1: '^_hjSessionUser_',
                                    col2: 'https://vars.hotjar.com',
                                    col3: '30 minut',
                                    col4: 'Statistiky',
                                    col5: 'Permanent cookie',
                                    is_regex: true,
                                },
                                {
                                    col1: '^_hjSession_',
                                    col2: 'https://vars.hotjar.com',
                                    col3: '30 minut',
                                    col4: 'Statistiky',
                                    col5: 'Permanent cookie',
                                    is_regex: true,
                                },
                                {
                                    col1: '_hjIncludedInPageviewSample',
                                    col2: 'https://vars.hotjar.com',
                                    col3: '30 minut',
                                    col4: 'Statistiky',
                                    col5: 'Permanent cookie',
                                    is_regex: true,
                                },
                            ],
                        },
                        {
                            title: 'Marketingové cookies',
                            description:
                                'Slouží nám ke sledování výkonnosti reklam, např. na skliku, googlu, facebooku.',
                            toggle: {
                                value: 'targeting',
                                enabled: true,
                                readonly: false,
                            },
                            cookie_table: [
                                // list of all expected cookies
                                {
                                    col1: '_fbp,fr,c_user,datr',
                                    col2: '.facebook.com	',
                                    col3: '2 roky',
                                    col4: 'Marketing',
                                    col5: 'Permanent cookie',
                                    is_regex: true,
                                },
                                {
                                    col1: '*ID*, 1P_JAR, _Secure-*, OGPC, SEARCH_SAMESITE, CONSENT',
                                    col2: 'google.com',
                                    col3: 'podle cookie...',
                                    col4: 'Statistiky a marketing',
                                    col5: 'Permanent cookie',
                                    is_regex: true,
                                },
                                {
                                    col1: '',
                                    col2: 'sklik.cz',
                                    col3: '',
                                    col4: 'Marketing',
                                    col5: 'Permanent cookie',
                                    is_regex: true,
                                },
                            ],
                        },
                        {
                            title: 'Více informací',
                            description:
                                'Více informací o použití cookies naleznete na <a class="cc-link" href="https://www.perinatal.cz/ochrana-osobnich-udaju" target="_blank">této stránce</a>.',
                        },
                    ],
                },
            },
        },
    });
});
