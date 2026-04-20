# **1. Sprint planning-dokumentation**

## Sprint-mål

Huvudmålet med denna sprint var först att säkerställa att arbetsätt var på plats och dokumenterat för att därefter kunna påbörja sprint planning med målet att börja bygga CoEd under andra sprintveckan med maximalt 15 h arbetstid var.

## Valda user stories

Vi valde att skapa userstories för att skapa en grundläggande layout för vår CoEd. Därefter valde vi att skapa user stories för att bygga användarfunktionalitet. User stories som kopplats till sprint 1 är:

- 1: US-101: Skapa grundläggande layout för editor
  - “Som användare,
    vill jag ha en tydlig och uppdelad arbetsyta med en navbar, footer, fil panel och kodeditor,
    så att jag kan få tydlig och logisk fördelning av layouten som blir lätt att navigera i.”
- 2: US-102: Registrering (Krav 2.1.1)
  - “Som ny användare,
    vill jag kunna registerna ett konto,
    så att jag kan logga in.”
- 3: US-103: Logga in och autentisering (Krav: 2.1.1)
  - “Som användare
    vill jag kunna trycka på en knapp för att logga in
    så att jag kan komma åt min arbetsyta”

## Tasks

Nedan tasks är avslutade för US-101:

- T-101-1: Implementera en MainArea-komponent
- T-101-2: Flytta in befintlig CodeEditor komponent i MainArea och säkerställ korrekt rendering
- T-101-3: Implementera en Header komponent
- T-101-4: Implementera en SidBar-komponent
- T-101-5: Implementera en Footer komponent

Nedan tasks är avslutade för US-102:

- T-102-1: Forms-kompontent + Register-komponent + Formulär
- T-102-2: Skapa funktioner som hanterar API anrop
- T-102-3: Hantera formulärstate och koppla auth-flödet till API
- T-102-4: Layout och Stil Login/Register-flödet

## Fördelning & Estimering

**US-101:**

| Uppgift | Sprint | Estimat | Faktisk tid | Namn   |
| ------- | ------ | ------- | ----------- | ------ |
| T-101-1 | 1      | ~2h     | ~2h         | Zeb    |
| T-101-2 | 1      | ~1h     | ~2h         | Zeb    |
| T-101-3 | 1      | ~2h     | ~3h         | Arian  |
| T-101-4 | 1      | ~2h     | ~6h         | Niklas |
| T-101-5 | 1      | ~2h     | ~5h         | Jenny  |
| T-101-6 | 1      | ~2h     | ~4h         | Arian  |

Estimerad tid: 11h
Faktisk tid: 22h

**US-102:**

| Uppgift | Sprint | Estimat | Faktisk tid | Namn   |
| ------- | ------ | ------- | ----------- | ------ |
| T-102-1 | 1      | ~6h     | ~6h         | Zeb    |
| T-102-2 | 1      | ~8h     | ~5h         | Zeb    |
| T-102-3 | 1      | ~6h     | ~7h         | Niklas |
| T-102-4 | 1      | ~4h     | ~4h         | Arian  |

Estimerad tid: 24h
Faktisk tid: 22h

## Acceptanskriterier

**US-101:**

- Givet att applikationen startas,
  När sidan laddas,
  Då ska en layout med filpanel, editor, footer och navbar visas.
  <br>
- Givet att sidan är renderad,
  När jag tittar på arbetsytan,
  - Då ska filpanelen vara placerad till vänster om editor-ytan.
  - Då ska Editor-ytan vara placerad till höger om filpanelen.
  - Då ska navbaren vara placerad högst upp på sidan.
  - Då ska footern vara placerad längst ner på sidan.
    <br>
- Givet att layouten visas,
  När jag ändrar storlek på webbläsarfönstret,
  Då ska fönstren vara responsiva och anpassas utan att bryta layouten.

**US-102:**

- Givet att man inte har ett konto,
  När jag klickar på logga in,
  Då ska det finnas en knapp för att gå till registeringssidan.
  <br>
- Givet att man inte har ett konto,
  När jag klickar på logga in utan ett existerande konto,
  Då ska jag bli omdirigerad automatiskt till registeringssidan.
  <br>
- Givet att skriver in en giltig email och lösenord,
  När jag registrerar mig,
  Då ska kontot skapas.
  <br>
- Givet att jag skriver en ogiltig email eller lösenord,
  När jag försöker registrera mig,
  Då ska felmeddelanden visas.

## Backlog

Startläge för backloggen och Trello tavla:

### GitHub Projects

![GitHub Projects](images/sprint-1-start.png)

### Trello

![Trello](images/trello-sprint-1-v1.png)
![Trello](images/trello-sprint-1-v2.png)

# **2. Leveransdokumentation**

### Färdigställda och påbörjade user stories

#### Under sprinten färdigställdes följande user stories:

US-101: Skapa grundläggande layout för editor
US-102: Registrering (delvis implementerad - UI klart och validering + API koppling påbörjad)

#### Under sprinten påbörjades följande user stories

US-103: Logga in och autentisering (delvis implementerad - UI klart och validering + API koppling påbörjad

Utöver detta lades även tid på så kallade spikes (förberedande arbete), där samtliga i teamet la varierande antal timmar på att tex. sätta sig in i React, SASS och hur man arbetar agilt med Github och Github Flow. Syftet var att minska osäkerheten och försöka bygga en så stabil grund som möjligt.

## Tasks

#### Följande tasks färdigställdes under sprinten:

Task: Uppdatera Labbmiljön med socket.io-client  
Task: Implementera PR Checks  
T-101-1: Implementera av MainArea-komponent  
T-101-2: Flytta in befintlig CodeEditor komponent i MainArea och säkerställ korrekt rendering.  
T-101-3: Implementera en Header komponent  
T-101-4: Implementera en SidBar-komponent  
T-101-5: Implementera en Footer komponent  
T-101-6: Övergripande styling - Footer, Header, Sidebar, Globala färgvariabler och typsnitts variabler  
T-102-1: Forms-kompontent + Register-komponent + Formulär  
T-102-2: Skapa funktioner som hanterar API anrop
T-102-3: Hantera formulärstate och koppla auth-flödet till API
T-102-4: Layout och Stil Login/Register-flödet
T-103-1: Skapa Login-komponent med formulär

### Fördelning av färdigställda tasks

Jenny: T-101-5, T-102-3, T-103-2
Niklas: T-101-4, Task: Uppdatera Labbmiljön med socket.io-client, T-102-3, T-103-2
Arian: T-101-3, Task: Implementera PR Checks, T-101-6, T-102-4
Zebastian: T-101-1, T-101-2, T-102-1, T-102-2, T-103-1

## Tidsutfall

### US-101:

| Uppgift | Sprint | Estimat | Faktisk tid | Namn   |
| ------- | ------ | ------- | ----------- | ------ |
| T-101-1 | 1      | ~2h     | ~2h         | Zeb    |
| T-101-2 | 1      | ~1h     | ~2h         | Zeb    |
| T-101-3 | 1      | ~2h     | ~3h         | Arian  |
| T-101-4 | 1      | ~2h     | ~6h         | Niklas |
| T-101-5 | 1      | ~2h     | ~5h         | Jenny  |
| T-101-6 | 1      | ~2h     | ~4h         | Arian  |

Estimerad tid: 11h
Faktisk tid: 22h

### US-102:

**US-102:**

| Uppgift | Sprint | Estimat | Faktisk tid | Namn   |
| ------- | ------ | ------- | ----------- | ------ |
| T-102-1 | 1      | ~6h     | ~6h         | Zeb    |
| T-102-2 | 1      | ~8h     | ~5h         | Zeb    |
| T-102-3 | 1      | ~6h     | ~7h         | Niklas |
| T-102-4 | 1      | ~4h     | ~4h         | Arian  |

Estimerad tid: 24h
Faktisk tid: 22h

### US-103:

| Uppgift | Sprint | Estimat | Faktisk tid | Namn |
| ------- | ------ | ------- | ----------- | ---- |
| T-103-1 | 1      | ~4h     | ~4h         | Zeb  |
| #86     | 1      | ~2h     | ~N/A        |      |
| #84     | 1      | ~6h     | ~N/A        |      |
| #87     | 1      | ~2h     | ~N/A        |      |

Estimerad tid: ~20h
Faktisk tid: ??h

## Definition of Done

#### En user story anses vara klar när:

- Funktionen **uppfyller** sin user stories **acceptance criteria**
- User story har **rätt namngivning** och task kan **spåras till user story**
- Tidsestimering och **tidsrapport** för task är **dokumenterad**
- Koden **fungerar** lokalt **utan fel**
- **Felhantering** är implementerad **där det är relevant**
- README är uppdaterad när det behövs
- **PR**-beskrivningen **förklarar vad** som gjorts och **kopplar till en user story**
- **Minst en** annan gruppmedlem **har granskat** och godkänt PR:en
- Koden är mergad till main
- Koden följer gruppens kodkonventioner:
  - Commits, kod & filnamn: Engelsk text
  - Brödtext i ex Trello/PR/Code-review: Svensk text
  - React, jsx-filer: PascalCase
  - js-filer, variabler, props: camelCase
  - CSS, SASS: kebab-case
  - mappar: lowercase

## Backlog

Slutläge för backloggen:

### GitHub Projects

![GitHub Projects](images/sprint-1-slut.png)

# **3. Sprint retrospective**

## Vad fungerade bra?

Det som fungerade bra var att alla tog eget ansvar och respekterade varandras olika scheman och tillgänglighet. Det gjorde att arbetet kunde flyta på utan att någon behövde bli pushad hela tiden.

Vi hade också bra kommunikation i gruppen och var snabba på att hjälpa varandra när någon fastnade, vilket gjorde samarbetet smidigare.

## Vad fungerade mindre bra?

En sak som fungerade mindre bra var att alla fyra jobbade på samma user story/krav samtidigt. Det blev ganska rörigt och ibland ineffektivt när alla skulle vara inne i samma delar och göra allt tillsammans.

Jag tror att det hade varit smidigare att dela upp oss, till exempel två och två på olika user stories. Då hade vi kunnat jobba mer fokuserat och parallellt istället för att alla är inne i alla steg hela tiden.

Det är något vi kan förbättra framöver för att få ett bättre flow i arbetet.

## Vad gör vi annorlunda nästa sprint?

Nästa sprint vill vi formulera tasks lite bredare, så att det inte blir för många små steg inom samma user story. Som det varit nu kan flera personer bli involverade i onödigt små delar, vilket gör arbetet mindre effektivt.

Vi vill också få in en bättre rutin för våra daily standups. Tanken är att hålla dem korta, max 15 minuter, där vi snabbt går igenom vad vi har gjort, vad vi ska göra och om det finns några blockerare. Om något behöver diskuteras mer i detalj tar vi det efter mötet, så att standupen inte drar ut på tiden.

## Åtgärder

### Sprintplanning:

Vi kommer att planera våra user stories och tasks så att de passar för pararbete (två och två). Tanken är att minska beroenden och göra det lättare att vara flexibel i teamet. För att få det att funka kommer vi hålla tasks lite mer övergripande istället för att detaljplanera allt från början. Det par som tar en user story ansvarar själva för att bryta ner den i mindre delar. Vi börjar med detta direkt i nästa sprintplanning.

### Daily standup:

Vi sätter av 30 minuter för daily standup. Första 15 minuterna kör vi strukturerat enligt Scrum där alla kort säger vad de gjort, vad de ska göra och om de har några problem. Om något blockerar tar vi det utanför mötet så att standupen inte drar ut på tiden.

Om någon inte kan vara med på voice ska de istället skriva en kort uppdatering i #daily-updates på Discord innan mötet.

Resten av tiden kan användas mer fritt för att snacka igenom saker eller bara hålla lite bättre teamkänsla.
