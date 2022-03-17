# Datingapp

## Registratie en Login

Binnen het functie kan je als nieuwe gebruiker een account registreren binnen mijn dating app. In het registratie formulier moet de gebruiker een username, emailadres en wachtwoord invoeren. Deze gegevens worden opgeslagen in mijn MongoDB database. Daarna wordt de gebruiker geredirect naar een login pagina. Met het aangemaakte account kan er ingelogd worden.

## Database

Binnen de huidige versie van mn functie gebruik ik MongoDB als mn database. 
In MongoDB Atlas is een cluster gemaakt met daarin de database `mydatingapp`, hierin zit de collectie `mydatingapp.user`.

## Ontwikkelingen

Verdere ontwikkelingen is het veranderen naar Mongoose ipv alleen MongoDB. Hiermee wil ik `Passport` implementeren voor de authenticatie bij de inloggen. De functie dit ik nu heb voor de authenticatie werkt niet, daardoor hoop ik dat `Passport` een betere oplossing is.

## Use

1. Clone de applicatie naar jou eigen code editor met git clone

`git clone https://github.com/SBindels/blok-tech`

2. Navigeer met cd (change directory) naar de project map

`cd blok-tech`

3. Plaats de `.env` file in de project map

4. Om de applicatie goed werkend te krijgen installeer je eerst alle packages via npm.

`npm install`

5. Start de applicatie met `npm run devStart`

### Auteur 

- Sjoerd Bindels

### Licentie 

Dit project is gelicenseerd met een MIT License.