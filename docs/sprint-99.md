# Sprint 99 - Gruppuppgift

## 1. Kort beskrivning av produkten

### Vad som levererats

Applikationen är en webbaserad kod-editor där målet är att ge användaren ett pedagogiskt verktyg för frontend-utveckling där vi har utvecklat den med ett tänk att vara så intuitiv och användarvänlig som möjligt. På landningssidan erbjuds användaren att testa editorn utan krav att skapa ett konto, men för den fulla upplevelsen behöver användaren registrera ett konto eller logga in.
Den onboardade användaren har möjlighet att skapa och dela projektmappar med andra användare där de kan skapa och ta bort filer och tillsammans redigera filer i realtid. Applikationen stödjer de 10 vanligaste filtyperna inklusive syntax highlighting så som HTML, CSS, JavaScript, React (.jsx, .tsx), Python, med mera.

Vår gemensamma bedömning är att applikationen uppfyller MVP, se nästa avsnitt för mer information om detta.

## 2. Vilka MVP-krav som uppfylls

En godkänd implementation innebär att nedan punkter från kravspecifikationen fungerar utan fel. Vi har nedan checkat av de färdigställda MVP-kraven efter hand som de blivit klara.

- [x] En användare registrerar ett konto och loggar in.
- [x] Användaren skapar en ny fil, skriver kod med syntax highlighting och bjuder in en annan användare till filen.
- [x] Den inbjudna användaren loggar in, öppnar samma fil och börjar redigera – båda användarna ser varandras ändringar och cursorpositioner i realtid.
- [x] Koden sparas automatiskt.
- [x] Båda användarna kan se vilka andra som är aktiva i filen.
- [x] Applikationen är deployad och åtkomlig via GitHub Pages.
- [x] Koden är versionshanterad och körbar lokalt enligt README.

Förutom ovan är även samtliga krav med **prioritet Hög** implementerade.
Detta innebär att applikationen kan exekvera kod korrekt, är stabil och uppfyller minst kravspecifikationens alla delar med hög prioritet. Applikationen har en tydlig och fungerande användarupplevelse.

## 3. Hur gruppen arbetat

### Verktyg och teknisk omfattning

Förutom React och Monaco som rekommenderades att använda har vi också valt att arbeta med SCSS och ikonbiblioteket Lucide. Vi installerade även Prettier och Vite samt använde oss av Eslint. Socket var också nödvändigt att installera för att hantera realtidsuppdateringarna. Vi jobbar med en komponentbaserad struktur och har haft som mål att bryta ner komponenterna i så små delar som möjligt. I VS code har vi byggt vår kod och satt upp vår kodstruktur. Vi har jobbat mycket med denna struktur för att göra den enklare att navigera i och har i den satt upp en mappstruktur.

Se nedan för en sammanfattning av verktygen och länkar för att läsa mer om dessa:

#### Webbaserad kodeditor:

- [Monaco-Editor](https://microsoft.github.io/monaco-editor/)

#### Övriga verktyg:

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [SCSS](https://sass-lang.com/install/)
- [socket.io-client](https://socket.io/docs/v4/client-api/)
- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)
- [Lucide](https://lucide.dev)

#### Arkitektur:

- Komponentbaserad arkitektur

### Process och arbetssätt

Vår kommunikation startade snabbt och smidigt tack vare att vi skapade en gemensam discord-kanal. Kanalen har fungerat som en knutpunkt för vår kommunikation och där vi bland annat haft vår gemensamma gruppchatt, samlat länkar till verktyg som använts under projektet och skrivit tagna beslut. Vi har också haft dagliga incheckningar respektive arbetsmöten via discord. Den som inte kunnat delta på den dagliga incheckningen har istället skrivit en uppdatering i en kanal i discord. Detta har vi gjort för att alla ska vara uppdaterade om status och för att vi ska kunna stötta varandra om vi har några blockerare. Whiteboard är ett annat verktyg i discord som vi använde för att skapa layouter av applikationen när vi diskuterade vad som skulle ingå i våra tasks för att färdigställa våra user stories. Det gav oss en tydligare gemensam bild av vad vi ville skapa och ett underlag för diskussion. Dessa skisser sparade vi också i en kanal i discord.

De första två veckorna la vi mycket tid på planering och struktur av projektet. Under denna tid byggde vi också upp en plan i Trello. Den hjälpte oss att hålla reda på spikes, möten och deadlines första sprintarna.

Vi startade också tidigt en planner i Github Projects. Här la vi in kort för att hantera framdriften främst i kodningen. Vi skrev epics, som vi bröt ner i User Stories som vi skrev acceptance criterias till. Varje User Story delades även upp i tasks. Epics, User stories och tasks blev alla planer kort.

Vi kopplade också dessa kort i Github projects till Discord. Det hjälpte oss alla att hålla oss uppdaterade om varandras arbete. När exempelvis en task öppnades eller stängdes fick vi en notis i discord. På samma sätt fick vi en notis i discord när en PR öppnades och stängdes.

Under sprint 1 loggade vi vår tid i Github Projects under den User story som uppgiften tillhörde. När vi fick tidloggningsfilen började vi istället logga tiden i den. Eftersom vi i tidloggningsfilen även hade rader för uppgifter såsom spikes, möten och tid till inlämningar började Trello kännas överflödigt och vi valde att fokusera på Github Projects och Tidloggningsfilen.

Vi har under hela projektet jobbar med GitHub Flow som arbetssätt. Exempelvis har vi alltid startat en bransch för att koppla den till minst en task. Från den branschen skapar vi en Pull Request (PR). Minst en person i gruppen har gjort en code review på den PR:en. I samband med att PR skapas körs också Eslint och Prettier formatering check. När koden är godkänd så mergas den till main. Detta har hjälpt oss att jobba med olika versioner av koden samtidigt.

#### Sammanfattning arbetsflöde och kommunikation

- Kommunikation via Discord: chatt, informationsdelning och möten
- GitHub Projects för task management
- Arbete i branches med PR → merge till main
- Versionshantering via GitHub (GitHub Flow)
- Trello eller tidloggningsfilen för planering i stort

## 4. Vad som fungerade bra respektive mindre bra i ert samarete.

Alla har haft ett stort engagemang och driv för att lösa uppgifterna trots att alla har mycket i privatlivet. Det positiva med att alla har mycket i privatlivet har varit att det varit en stor förståelse från alla att vi behöver vara flexibla i vårt arbetssätt och schema. Det har säkert också gjort att vi har varit effektiva med den tid vi har haft i denna kursen.

Den största utmaningen har ändå blivit att hitta mötestider som passar alla för gemensamma avstämningar. Vi har under projektets gång försökt hitta vägar för att förtydliga våra tillgängliga tider vilket har underlättat en del, men även det har varit svårt att upprätthålla då flera av oss har scheman som snabbt kan ändras.

## 5. Vad ni hade gjort annorlunda

### Om ni startade projektet idag, vad hade ni gjort annorlunda.

Förra sprinten valde vi att delvis reflektera över denna fråga och resultatet av denna reflektionen blir ganska lik förra veckans. Denna gången väljer vi att lista lärdomarna nedan. Punkterna i listan är därmed punkter på lärdomar som vi skulle ha gjort eller tagit med oss redan från början om vi startade ett nytt projekt.

Vi har lärt oss att:

- det underlättar att jobba i mindre tasks för att undvika merge konflikter i så stor utsträckning som möjligt.
- regelbundet visa upp vad vi gjort för varandra för att få snabb feedback och en gemensam bild på målet.
- det är bra att ha avstämningar för att alla ska få en bild av vad som pågår och ha möjlighet att lyfta problem som dyker upp eller andra blockerare
- strukturen och processen är viktig för att arbetet ska bli effektivt
- verktygen Github Projects och Discord är bra grundläggande verktyg för att arbeta tillsammans med kodning, och hade ännu tidigare kopplat dessa verktyg till varandra
- snabbt sätta upp riktlinjer och struktur för när alla projektmedlemmar är tillgängliga för arbete och möten för att tydliggöra förväntningarna på alla deltagarna.

## 6. Länk till issue för kodgranskning

### (se nedan under rubrik “Kodgranskning”)

https://github.com/GabrielGlennJohansson/coed-grupp-10/issues/98
