Bonus - papildomi balai
==========

- [ ] Projektas įkeltas į public GitHub ( tvarkingai, o ne zip failas ) ir duotas veikiantis GitHub URL
- [ ] Stengiamasi darbus skaidyti į logiškas dalis ir juos įkelti kaip atskirus `commit` į versijų valdymo sistemą
- [ ] Projektas yra live - t.y. patalpintas viešai ir prieinamas, ir duotas veikiantis URL
- [ ] Projekto aprašymas - trumpai pagrįsk, kodėl pasirinkai tokį sprendimą (3 – 5 sakiniai)
- [ ] Kodas rašomas tvarkingai (naudojamas `PSR-2` ar pan. kodo stilius, linkas apačioje)
- [ ] Projektas veikia be parse error ir pan.
- [ ] README failas yra

Minimalus užduoties įgyvendinimas ( `Level 1` )
===============================

**Turi būti 3 puslapiai (HTML failai):**
- [x] Administravimo puslapis, skirtas įvesti naują klientą į eilę
- [x] Švieslentės puslapis, skirtas rodyti greitai sulauksiančius klientus (aukščiausiai pas specialistą – reiškia klientui eiti)
- [x] Specialisto puslapis, kur jis gali pažymėti, kad aptarnavo klientą

**Techniniai kriterijai:**

- [x] Yra `JSON` failas su pavyzdiniu klientu sąrašu
- [x] Yra mygtukas išsaugoti pavyzdinius duomenis į `localStorage` (ar `IndexDB`) (_administravimo puslapis_)
- [x] Pavyzdiniai duomenys įkraunami dinamiškai neperkraunant naršyklės (`AJAX` užklausa)
- [x] Duomenys atvaizduojami surikiuoti pagal specialistą ir tada pagal kliento numerį (_švieslentės puslapis_)
- [x] Yra funkcija įrašymui į `localStorage` (_administravimo puslapis_)
- [x] Yra funkcija kliento ištrynimui iš objekto (mygtukas `Aptarnauta`) (_specialisto puslapis_)
- [x] Duomenų filtravimas: pasirinkimas, kokio specialisto klientus aptarnauti (_specialisto puslapis_)
- [x] Gražesnis dizainas panaudojant `CSS` (_švieslentės puslapis_)

Rekomenduojamas užduoties įgyvendinimas ( `Level 2` )
=======================================

> Vertinama, kai yra padarytos pirmos dalys

**Papildymas puslapyje**
- [x] Švieslentės puslapis, skirtas rodyti greitai sulauksiančius klientus (rodoma tik naujausia dalis eilės)

**Extra puslapis**
- [x] Lankytojo puslapis, kur jis mato laiką iki savo eilės (nebūtina žiūrėti į švieslentę)

**Techniniai kriterijai:**
- [x] Specialistui aptarnavus klientą, vietoj duomenų ištrynimo, pažymima, kad klientas aptarnautas
- [x] Švieslentėje fono spalva išskiriamas dabar aptarnaujamas klientas (pirmas elementas pagal specialistą)
- [x] Švieslentėje žemiau rodomi tik neaptarnauti klientai (tie kuriems nebuvo paspaustas mygtukas `Aptarnauta`)
- [x] Yra funkcija apskaičiavimui, kiek truko apsilankymas (galima senus apsilankymų laikus saugoti atskirame objekte `localStorage`)
- [x] Švieslentėje rodoma, kiek laiko liko klientui laukti (vidurkis pagal laukimo laiką per specialistą)
- [x] Lankytojo puslapyje numatomas laikas patikslinamas kas 5s (JavaScript arba HTML meta)
- [x] Lankytojas, įvedęs savo numerį formoje, mato tik jam skirtą laukti laiką (_lankytojo puslapis_)
- [x] Švieslentės puslapis yra pritaikytas rodyti per visą ekraną (CSS)
- [x] Užregistravus naują klientą rodoma `Užregistruota sėkmingai`
- [x] Neradus pradinių duomenų failo (`AJAX` užklausa) rodoma `Nepavyko nuskaityti lankytojų duomenų`
- [x] Yra pritaikyta greitam naujų lankytojų įvedimui (JavaScript `focus`)
- [x] Naudojamas gražesnis dizainas (Pvz: google Material UI, Bootstrap)

Galimas užduoties praplėtimas ( `Level 3` )
=============================

> Vertinama, kai yra padarytos pirmos dalys

**Papildymas puslapyje**
- [x] Lankytojo puslapis, kur jis mato laiką iki savo eilės ir gali pavėlinti apsilankymą

**Extra puslapis**
- [x] Puslapis su statistika, kada labiausiai verta ateiti pas specialistą (atvaizduoti pavyzdinius duomenis)

**Techniniai kriterijai:**
- [ ] Funkcija lengvam duomenų saugyklos pakeitimui: tarp `localStorage` ir realaus Backend serverio
- [ ] Pavyzdys, kad veiks su realiu `Backend` (`swagger`, `wiremock` ar minimalistiniai `PHP`/`node.js` failai)
- [ ] Laikų filtravimas pagal dienas
- [x] Rodomas mėnesio kalendorius (HTML)
- [x] Galima nueiti į senų ar naujų mėnesių statistiką, nepriklausomai ar tą mėnesį buvo klientų (duomenų)
- [x] Statistikoje galima uždėti filtrą konkretiems specialistams
- [x] Kalendoriaus išdėstymas prisitaiko nuo ekrano (`media` CSS)
- [x] Spalvomis išryškinama mažiausiai užimta diena
- [x] Spalvomis išryškinama (ar tekstu parodoma) mažiausiai užimta valanda konkrečioje dienoje
- [x] Lankytojui sugeneruojamas unikalus kodas (apsauga nuo sekančio skaičiaus įvedant formoje)
- [x] Lankytojas mato mygtuką pavėlinti (sukeičia su už juo esančiu žmogumi)
- [x] Pavėlinimas negalimas, jei lankytojas yra paskutinis eilėje
- [x] Lankytojas gali atšaukti susitikimą pas specialistą (įrašymas į `localStorage`)
- [x] Įvedamo vardo apsauga administravimo puslapyje `Vardenis`
- [x] Netinkamo įvedimo apsauga (ir pranešimai) administravimo puslapyje
