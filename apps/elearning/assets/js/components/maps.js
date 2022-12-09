if ($('#m').length) {
    let center = SMap.Coords.fromWGS84(14.4200573, 50.1792214);
    let m = new SMap(JAK.gel('m'), center, 14);
    m.addDefaultLayer(SMap.DEF_BASE).enable();
    m.addDefaultControls();
    m.addControl(new SMap.Control.Sync());

    m.setCenter(SMap.Coords.fromWGS84(14.419499, 50.184855));

    let layer = new SMap.Layer.Marker();
    m.addLayer(layer);
    layer.enable();

    let options = {
        url: '/build/img/pointer-colored.svg',
        anchor: { left: 36, bottom: 8 },
    };
    let marker = new SMap.Marker(center, 'myMarker', options);
    layer.addMarker(marker);

    let mouseControl = null;
    let controls = m.getControls();

    for (let i = 0; i < controls.length; i++) {
        if (controls[i] instanceof SMap.Control.Mouse) {
            mouseControl = controls[i];
        }
    }
    mouseControl.configure(SMap.MOUSE_PAN | SMap.MOUSE_ZOOM);
}

let obrazek = '/build/img/pointer-colored.svg';

if ($('#all-maps').length) {
    let center = SMap.Coords.fromWGS84(15.5755372, 50.1081922);
    let m = new SMap(JAK.gel('all-maps'), center, 8);
    m.addDefaultControls();
    m.addControl(new SMap.Control.Sync()); /* Aby mapa reagovala na změnu velikosti průhledu */
    m.addDefaultLayer(SMap.DEF_BASE).enable(); /* Turistický podklad */
    let mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
    m.addControl(mouse);

    let vrstva = new SMap.Layer.Marker(); /* Vrstva se značkami */
    let souradnice = [];

    let clusterer = new SMap.Marker.Clusterer(m);
    vrstva.setClusterer(clusterer);

    // data pro markery
    let markers = [
        {
            name: 'Gynecol s.r.o.',
            id: 1,
            coords: '50.0845567"N, 14.4420222"E',
            link:
                'https://www.google.com/maps/place/Gynecol+s.r.o.+-+MUDr.+Olga+%C5%A0ebestov%C3%A1/@50.0845385,14.4425936,15z/data=!4m2!3m1!1s0x0:0xcb5a0749cbe9f6e?sa=X&ved=2ahUKEwjZka3mgdHyAhXOwQIHHUOTDyIQ_BIwFXoECE4QBQ',
        },
        {
            name: 'MUDr. Michal Jelšík',
            id: 2,
            coords: '50.0631714"N, 14.4253417"E',
            link:
                'https://www.google.com/maps/place/Krokova+778,+128+00+Praha+2-Nusle/@50.0632732,14.4230913,17z/data=!3m1!4b1!4m5!3m4!1s0x470b946421b4f1bf:0xcd74c947efa5bf80!8m2!3d50.0632698!4d14.42528',
        },
        {
            name: 'GENITRIX s.r.o.',
            id: 3,
            coords: '50.0928572"N, 14.4861764"E',
            link:
                'https://www.google.com/maps/place/Genitrix+S.r.o./@50.0775547,14.4637207,17z/data=!3m1!4b1!4m5!3m4!1s0x470b936503e26eb1:0x7ed273230d0753e5!8m2!3d50.0775579!4d14.4660066',
        },
        {
            name: 'EUC Klinika Praha a.s., Poliklinika Šustova',
            id: 4,
            coords: '50.0274619"N, 14.4893417"E',
            link:
                'https://www.google.com/maps/place/EUC+Klinika+Praha+-+%C5%A0ustova/@50.027773,14.4874161,17z/data=!3m1!4b1!4m5!3m4!1s0x470b922d02d76f63:0xee4f617f6e88898b!8m2!3d50.0277696!4d14.4896048',
        },
        {
            name: 'Gynekologie Agapor s.r.o.',
            id: 5,
            coords: '50.0855256"N, 14.4315853"E',
            link:
                'https://www.google.com/maps/place/Gynekologie+Agapor/@50.085397,14.4298435,17z/data=!4m9!1m2!2m1!1sGynekologie+Agapor+s.r.o.!3m5!1s0x0:0x11fdb5c1c3a6c30a!8m2!3d50.0853158!4d14.4319861!15sChlHeW5la29sb2dpZSBBZ2Fwb3Igcy5yLm8uWhgiFmd5bmVrb2xvZ2llIGFnYXBvciBzcm-SAQZkb2N0b3I',
        },
        {
            name: 'Profema – Centrum fetální medicíny s.r.o.',
            id: 6,
            coords: '50.0556372"N, 14.4293136"E',
            link:
                'https://www.google.com/maps/place/Profema+-+Centrum+fet%C3%A1ln%C3%AD+medic%C3%ADny/@50.0557581,14.4268857,17z/data=!3m1!4b1!4m5!3m4!1s0x470b94f42aef8f3b:0x9aa9a0844c53d6e6!8m2!3d50.0557547!4d14.4290737',
        },
        {
            name: 'FEMCARE s.r.o.',
            id: 7,
            coords: '50.2301103"N, 14.4119319"E',
            link:
                'https://www.google.com/maps/place/Femcare,+S.r.o./@50.2301155,14.4097516,17z/data=!3m1!4b1!4m5!3m4!1s0x470bc279c5da41fb:0x58db12c6f0db52a2!8m2!3d50.2301573!4d14.4119459',
        },
        {
            name: 'Medgyn – MUDr. Josef Čepelík',
            id: 8,
            coords: '50.5225372"N, 14.9742461"E',
            link:
                'https://www.google.com/maps/place/%C4%8Cepel%C3%ADk+Josef+MUDr./@50.5225399,14.9720657,17z/data=!3m1!4b1!4m5!3m4!1s0x4709525cccd5ca9b:0x1ac782f806faee21!8m2!3d50.5224911!4d14.9742785',
        },
        {
            name: 'Gynevita s.r.o.',
            id: 9,
            coords: '49.6962031"N, 14.9075369"E',
            link:
                'https://www.google.com/maps/place/Lidick%C3%A1+1696,+258+01+Vla%C5%A1im/@49.696209,14.905353,17z/data=!3m1!4b1!4m5!3m4!1s0x470c89c9ab3c0b6f:0x337a244a3b0f5549!8m2!3d49.6962056!4d14.9075417',
        },
        {
            name: 'JD-GYN, s.r.o.',
            id: 10,
            coords: '50.0255050"N, 15.2057525"E',
            link:
                'https://www.google.com/maps/place/MUDr.+Ji%C5%99%C3%AD+Dvo%C5%99%C3%A1k/@50.0255086,15.2035698,17z/data=!3m1!4b1!4m5!3m4!1s0x470c15248679c553:0xcf835a40c755dedc!8m2!3d50.0255273!4d15.2056666',
        },
        {
            name: 'Gynekologie Roztoky s.r.o.',
            id: 11,
            coords: '50.1618461"N, 14.3824347"E',
            link:
                'https://www.google.com/maps/place/MUDr.+Zuzana+Kabrhelov%C3%A1+Gynekolog/@50.1618659,14.3802293,17z/data=!3m1!4b1!4m5!3m4!1s0x470bea6304aeb569:0x628a1115cd926f13!8m2!3d50.161869!4d14.3824081',
        },
        {
            name: 'MUDr. Zdeněk Podlesný, FEMINA – GYN – PRIVAT',
            id: 12,
            coords: '50.1436425"N, 15.1156350"E',
            link:
                'https://www.google.com/maps/place/Gynekolog+Podlesn%C3%BD+Zden%C4%9Bk+MUDr./@50.1436533,15.1134521,17z/data=!4m9!1m2!2m1!1zTVVEci4gWmRlbsSbayBQb2RsZXNuw70sIEZFTUlOQSDigJMgR1lOIOKAkyBQUklWQVQgcG9kxJticmFkeQ!3m5!1s0x470c11b424711d69:0xd9e397945025578b!8m2!3d50.143668!4d15.1155838!15sCj1NVURyLiBaZGVuxJtrIFBvZGxlc27DvSwgRkVNSU5BIOKAkyBHWU4g4oCTIFBSSVZBVCBwb2TEm2JyYWR5WjUiM211ZHIgemRlbsSbayBwb2RsZXNuw70gZmVtaW5hIGd5biBwcml2YXQgcG9kxJticmFkeZIBBmRvY3Rvcg',
        },
        {
            name: 'FEMIHEALTH s.r.o.',
            id: 13,
            coords: '49.7025908"N, 17.0762767"E',
            link:
                'https://www.google.com/maps/place/FEMIHEALTH+s.r.o.+-+MUDr.+Lada+Peterkov%C3%A1/@49.7025923,17.0740943,17z/data=!3m1!4b1!4m5!3m4!1s0x4712418481dd2b83:0xba3f612a8e2849d8!8m2!3d49.7026227!4d17.0762964',
        },
        {
            name: 'GYNORDIN Uničov s.r.o.',
            id: 14,
            coords: '49.7689172"N, 17.1226731"E',
            link:
                'https://www.google.com/maps/place/GYNORDIN+Uni%C4%8Dov+s.r.o./@49.7689202,17.12049,17z/data=!3m1!4b1!4m5!3m4!1s0x47123f22dbbefeff:0x62671873bc938e12!8m2!3d49.7688394!4d17.1226796',
        },
        {
            name: 'GYNEKOLOGIE Staněk s.r.o.',
            id: 15,
            coords: '49.7312011"N, 17.2973806"E',
            link:
                'https://www.google.com/maps/place/Gynekologie+Stan%C4%9Bk+S.r.o./@49.7283892,17.3052273,17z/data=!3m1!4b1!4m5!3m4!1s0x471237b7d139302b:0x961d213394d3120c!8m2!3d49.7284263!4d17.3074163',
        },
        {
            name: 'AGEL Gynekologické centrum s.r.o.',
            id: 16,
            coords: '49.7670811"N, 17.1218336"E',
            link:
                'https://www.google.com/maps/place/AGEL+Gynekologick%C3%A9+centrum+s.r.o./@49.7670353,17.1197012,17z/data=!3m1!4b1!4m5!3m4!1s0x47123f3d1dd97f53:0x8526522355b55eda!8m2!3d49.7669854!4d17.1218801',
        },
        {
            name: 'Celomed s.r.o.',
            id: 17,
            coords: '49.9113044"N, 16.9254933"E',
            link:
                'https://www.google.com/maps/place/CELOMED+s.r.o./@49.9525664,16.8108034,17z/data=!3m1!4b1!4m5!3m4!1s0x4712058a1754c5b3:0xa4619a242d99ad9d!8m2!3d49.9525526!4d16.8129892',
        },
        {
            name: 'MUDr. Oldřich Dostál s.r.o.',
            id: 18,
            coords: '49.4690667"N, 17.1072611"E',
            link:
                'https://www.google.com/maps/place/MUDr.+Old%C5%99ich+Dost%C3%A1l+s.r.o./@49.4699775,17.1167225,17z/data=!3m1!4b1!4m5!3m4!1s0x4712573927f9a9a7:0x8ebd029350c7b124!8m2!3d49.469974!4d17.1189112',
        },
    ];

    // vytvoreni markeru
    markers.forEach(function (marker) {
        let c = SMap.Coords.fromWGS84(marker.coords); /* Souřadnice značky, z textového formátu souřadnic */

        let options = {
            url: obrazek,
            title: marker.name,
            anchor: { left: 36, bottom: 8 } /* Ukotvení značky za bod uprostřed dole */,
        };

        // duletize je prirazeni id jednotlivemu markeru - vlastni id, jinak se generuje nahodne
        let znacka = new SMap.Marker(c, marker.id, options);
        souradnice.push(c);
        vrstva.addMarker(znacka);
    });

    // zobrazime a povolime vrstvu - pokud by se vrstva povolila pred vkladanim markeru, tak by se s kazdym vlozenym markerem prekreslovala mapa a pocitaly pozice vsech markeru
    m.addLayer(vrstva); /* Přidat ji do mapy */
    vrstva.enable(); /* A povolit */

    let cz = m.computeCenterZoom(souradnice); /* Spočítat pozici mapy tak, aby značky byly vidět */
    m.setCenterZoom(cz[0], cz[1]);
    // m.setCenterZoom(14.40, 50.08);

    // poslouchani na kliknuti u markeru
    m.getSignals().addListener(this, 'marker-click', function (e) {
        // vybrany marker
        let marker = e.target;
        let id = marker.getId();
        // zobrazime jeho jmeno - parovani vybraneho markeru pomoci jeho id a nasich vstupnich dat
        for (let i = 0; i < markers.length; i++) {
            if (markers[i].id == id) {
                window.open(markers[i].link, '_blank');
                break;
            }
        }
    });
}

if ($('#all-maps-maternity').length) {
    let center = SMap.Coords.fromWGS84(15.5755372, 50.1081922);
    let m = new SMap(JAK.gel('all-maps-maternity'), center, 8);
    m.addDefaultControls();
    m.addControl(new SMap.Control.Sync());
    m.addDefaultLayer(SMap.DEF_BASE).enable();
    let mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM);
    m.addControl(mouse);

    let vrstva = new SMap.Layer.Marker();
    let souradnice = [];

    let clusterer = new SMap.Marker.Clusterer(m);
    vrstva.setClusterer(clusterer);

    let markers = [
        {
            name: 'FN Olomouc',
            id: 1,
            coords: '49.5836792"N, 17.2382144"E',
            link: 'https://porodnice.fnol.cz/',
        },
        {
            name: 'FN Bulovka',
            id: 2,
            coords: '50.1153794"N, 14.4640828"E',
            link: 'https://bulovka.cz/kliniky-a-oddeleni/gynekologicko-porodnicka-klinika/porodnice',
        },
        {
            name: 'Fakultní Thomayerova nemocnice',
            id: 3,
            coords: '50.0300714"N, 14.4571781"E',
            link: 'https://www.ftn.cz/porodnice-luzkove-oddeleni-85/',
        },
        {
            name: 'Nemocnice Nymburk',
            id: 4,
            coords: '50.1859017"N, 15.0367211"E',
            link: 'http://www.nemnbk.cz/oddeleni/luzkova-pece/gynekologicko-porodnicke-oddeleni-porodnice/',
        },
        {
            name: 'Nemocnice AGEL Šternberk',
            id: 5,
            coords: '49.7224578"N, 17.2981492"E',
            link:
                'https://nemocnicesternberk.agel.cz/pracoviste/oddeleni/gynekologicko-porodnicke/porodnice/o-porodnici.html',
        },
    ];

    markers.forEach(function (marker) {
        let c = SMap.Coords.fromWGS84(marker.coords); /* Souřadnice značky, z textového formátu souřadnic */

        let options = {
            url: obrazek,
            title: marker.name,
            anchor: { left: 36, bottom: 8 } /* Ukotvení značky za bod uprostřed dole */,
        };

        // duletize je prirazeni id jednotlivemu markeru - vlastni id, jinak se generuje nahodne
        let znacka = new SMap.Marker(c, marker.id, options);
        souradnice.push(c);
        vrstva.addMarker(znacka);
    });

    m.addLayer(vrstva);
    vrstva.enable();

    let cz = m.computeCenterZoom(souradnice);
    m.setCenterZoom(cz[0], cz[1]);

    m.getSignals().addListener(this, 'marker-click', function (e) {
        let marker = e.target;
        let id = marker.getId();
        for (let i = 0; i < markers.length; i++) {
            if (markers[i].id == id) {
                window.open(markers[i].link, '_blank');
                break;
            }
        }
    });
}
