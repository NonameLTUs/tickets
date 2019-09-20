Įžanga 'frontend'
==========

Užduotį galima atlikti pagal skirtingus sudėtingumo lygius (`level 1`, `level 2`, `level 3` ir `Bonus`). Kiekviename lygmenyje gaunami taškai už atliktus reikalavimus. Taškai sumuojami į bendrą balą pagal kurį sprendžiamas tavo stojimas į NFQ Akademiją.

Geriausiai atlikusiems užduotį dar bus 30 min pokalbis susipažinimui ( telefonu ).


Užduotį atlikti ir atsiųsti iki rugsėjo 23-tos vidurnakčio.
Siųsti čia - https://forms.gle/cUpGNWfi991iicidA

**Norint įgyvendinti level 2 ar level 3 reikės įgyvendinti level 1**

 

Frontend užduoties kontekstas
==========

Ligoninėse, bankuose, pašte, pasų išdavimo skyriuose ir pan. galima matyti ekranus su skaičiukais.
Ateini, gauni lapuką pas pasirinktą specialistą/darbuotoją/langelį ir lauki savo eilės.

Ar kada pagalvojote, kaip būtų faina,
jei žinotumėte kiek maždaug dar reikia laukti eilėje ir atitinkamai susiplanuoti savo darbus.

 

Bonus - papildomi balai
==========

- [ ] Projektas įkeltas į public GitHub ( tvarkingai, o ne zip failas ) ir duotas veikiantis GitHub URL
- [ ] Stengiamasi darbus skaidyti į logiškas dalis ir juos įkelti kaip atskirus `commit` į versijų valdymo sistemą
- [ ] Projektas yra live - t.y. patalpintas viešai ir prieinamas, ir duotas veikiantis URL
- [ ] Projekto aprašymas - trumpai pagrįsk, kodėl pasirinkai tokį sprendimą (3 – 5 sakiniai)
- [ ] Kodas rašomas tvarkingai (naudojamas `PSR-2` ar pan. kodo stilius, linkas apačioje)
- [ ] Projektas veikia be parse error ir pan.
- [ ] README failas yra

Siūloma (papildoma) literatūra:

**GitHub instrukcijos**
* https://www.codecademy.com/courses/learn-git/lessons/git-workflow
* https://help.github.com/en/articles/adding-a-file-to-a-repository-using-the-command-line
* https://help.github.com/en/articles/adding-an-existing-project-to-github-using-the-command-line

**Svetainės talpinimas į serverį**
* https://pages.github.com/

**README file**
* https://medium.com/@latoyazamill/how-to-create-a-readme-md-file-37cffa2d7ab4

**Kita**
* https://www.php-fig.org/psr/psr-2/
* https://en.wikipedia.org/wiki/Atomic_commit
* https://cssguidelin.es/#bem-like-naming

 

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

Siūloma literatūra:
* https://blog.logrocket.com/the-complete-guide-to-using-localstorage-in-javascript-apps-ba44edb53a36/
* https://www.w3schools.com/js/
* https://www.w3schools.com/html/
* https://www.w3schools.com/w3css/

 

Rekomenduojamas užduoties įgyvendinimas ( `Level 2` )
=======================================

> Vertinama, kai yra padarytos pirmos dalys

**Papildymas puslapyje**
- [ ] Švieslentės puslapis, skirtas rodyti greitai sulauksiančius klientus (rodoma tik naujausia dalis eilės)

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

Siūloma (papildoma) literatūra:
* https://getbootstrap.com/
* https://material.io/design/material-theming/overview.html#using-material-theming

Galimas užduoties praplėtimas ( `Level 3` )
=============================

> Vertinama, kai yra padarytos pirmos dalys

**Papildymas puslapyje**
- [ ] Lankytojo puslapis, kur jis mato laiką iki savo eilės ir gali pavėlinti apsilankymą

**Extra puslapis**
- [ ] Puslapis su statistika, kada labiausiai verta ateiti pas specialistą (atvaizduoti pavyzdinius duomenis)

**Techniniai kriterijai:**
- [ ] Funkcija lengvam duomenų saugyklos pakeitimui: tarp `localStorage` ir realaus Backend serverio
- [ ] Pavyzdys, kad veiks su realiu `Backend` (`swagger`, `wiremock` ar minimalistiniai `PHP`/`node.js` failai)
- [ ] Laikų filtravimas pagal dienas
- [ ] Rodomas mėnesio kalendorius (HTML)
- [ ] Galima nueiti į senų ar naujų mėnesių statistiką, nepriklausomai ar tą mėnesį buvo klientų (duomenų)
- [ ] Statistikoje galima uždėti filtrą konkretiems specialistams
- [ ] Kalendoriaus išdėstymas prisitaiko nuo ekrano (`media` CSS)
- [ ] Spalvomis išryškinama mažiausiai užimta diena
- [ ] Spalvomis išryškinama (ar tekstu parodoma) mažiausiai užimta valanda konkrečioje dienoje
- [ ] Lankytojui sugeneruojamas unikalus kodas (apsauga nuo sekančio skaičiaus įvedant formoje)
- [ ] Lankytojas mato mygtuką pavėlinti (sukeičia su už juo esančiu žmogumi)
- [ ] Pavėlinimas negalimas, jei lankytojas yra paskutinis eilėje
- [ ] Lankytojas gali atšaukti susitikimą pas specialistą (įrašymas į `localStorage`)
- [ ] Įvedamo vardo apsauga administravimo puslapyje `Vardenis`
- [ ] Netinkamo įvedimo apsauga (ir pranešimai) administravimo puslapyje

 

**Siūloma (papildoma) literatūra:**
* https://restfulapi.net/
* http://wiremock.org/
* https://swagger.io/
* https://www.php.net/manual/en/index.php
* https://jestjs.io/
* https://en.wikipedia.org/wiki/Atomic_commit
* https://pages.github.com/

 

=============================

Atmink tavo geriausias pagalbininkas yra Google.

Sėkmės :)
