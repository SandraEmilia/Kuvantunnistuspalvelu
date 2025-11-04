# Sukka vs Hanska kuvantunnistuspalvelu

Tämä on Azure-pohjainen kuvantunnistuspalvelu, joka tunnistaa, onko kuvassa sukka vai hanska. 
Sovellus käyttää **Azure Custom Visionia** kuvan luokitukseen ja **Azure Functions** -ratkaisua API:n toteuttamiseen.

## Teknologiat
**-Frontend:** React (Vite), Julkaistu **Azure Static web apps** -palvelussa.
**-Backend:** Azure Functions - Python API, joka käyttää **Custom Vision** -palvelua.
**-Pilvipalvelut:** Azure Functions, Azure Static Web Apps, Azure Custom Vision.

## Käyttöönotto

### Paikallinen kehitys

1. Voit kloonata repositoryn:
   - Avaa terminaali ja siirry kansioon, johon haluat kloonata koodin
   - Suorita kloonaus: git clone https://github.com/SandraEmilia/Kuvantunnistuspalvelu.git
   - cd SukkavaiHanska
   - npm install
     
2. Käynnistä API:
   - cd api
   - python -m venv .venv
   - .venv\Scripts\activate   #windows
     tai
   - source .venv/bin/activate    #Mac/Linux
     
   - pip install -r requirements.txt
   - func start

  3. Reactin käynnistys:
     - npm run dev

  4. Testaa sovellusta selaimessa osoitteessa: http://localhost:5173

## Käyttöliittymä

- React-sovellus mahdollistaa kuvan valinnan ja lataamisen.
- Tulokset näytetään JSON-formaatissa, mutta käyttöliittymä näyttää luokituksen ja todennäköisyyden.
- Sovellus tukee mobiililaitteita ja on responsiivinen.

## API-avaimet ja käyttäjähallinta

**-API-avaimet:** PREDICTION_URL ja PREDICTION_KEY hallitaan ympäristömuuttujina Azure Functionsissa.
**-Käyttäjähallinta:** Sovellus ei vaadi käyttäjähallintaa tai autentikointia, koska se on anonyymi sovellus.


© 2025 Sandra Nurmela
