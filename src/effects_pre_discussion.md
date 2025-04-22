User Effekt mapped effekt auf User


# Note Disable Enter for virus click button pls
# Find out wacky sacling issue


# Effektideen

## Positiv
- [ ] Turbo Clicker
  - **Name** Turbo Clicker
  - **duration** permanent / 0 
  - **maxLevel** 5
  -  **startEfficency** 2 (erhöht Viren / Click)
  - **startPrice** 100
  - **efficencyIncrease** 1 (+1 Virus / Click / Upgrade) //might be brokey
  - **priceIncrease** 100
  - **pathToIcon** /src/res/images/bild.jpg (random beispiel)
  - **activationRoute** start-async-gen (bsp. Luca async effekt)


- [ ] Auto Clicker
  - **Name** Auto Clicker // schon umgesetzt (autoclicker)
  - **duration** 300s
  - **maxLevel** 5
  - **startEfficency** 2 (generiert so viele Viren / Sekunde automatisch)
  - **startPrice** 100
  - **efficencyIncrease** 100% (+2 Virus / Sekunde / Upgrade)
  - **priceIncrease** 100
  - **pathToIcon** 
  - **activationRoute**

- [ ] Exponentieller Virus Generator
  - **Name** Exponentieller Virus Generator
  - **duration** 20s
  - **maxLevel** 3
  - **startEfficency** 1.2 (Am Ender der Zeit Viren * 1.2)
  - **startPrice** 200
  - **efficencyIncrease** 0.3
  - **priceIncrease** 100
  - **pathToIcon** 
  - **activationRoute**

- [ ] Kritische Viren
  -  **Name** Kritische Viren
  - **duration** 60s
  - **maxLevel** 4
  - **startEfficency** 25 (25% for a crit. Crit == Viren * 3)
  - **startPrice** 300
  - **efficencyIncrease** 2 (25 / 50 / 75 / 100)
  - **priceIncrease** 150
  - **pathToIcon** 
  - **activationRoute**

## Negativ

- [ ] Reverse Engineered Virus
  - **Name** Reverse Engineered Virus
  - **duration** 10s
  - **maxLevel** 1
  - **startEfficency**  (Klicks des gewählten Spielers zählen negativ)
  - **startPrice** 1000
  - **efficencyIncrease** 
  - **priceIncrease**
  - **pathToIcon** 
  - **activationRoute**

- Idee von Luca -> Pendent zum Critical Click. % Chance, dass jemand - Virus kriegt chance
- Prio 2 da ähnlich zu absauger

- [ ] DDoS
  - **Name** DDoS
  - **duration** 20s
  - **maxLevel** 4
  - **startEfficency** 0.25 (0.25 Sekunden delay nach Click)
  - **startPrice** 200
  - **efficencyIncrease** 1 (0.25s / 0.5s / 0.75s / 1s)
  - **priceIncrease** 200
  - **pathToIcon** 
  - **activationRoute**

- [ ] Virus der die Punkte anderer Leute absaugt
  - **Name** Virus der die Punkte anderer Leute absaugt
  - **duration** 30s
  - **maxLevel** 4
  - **startEfficency** 25% (Klaut 25% der generierten Viren einer anderen Person)
  - **startPrice** 300
  - **efficencyIncrease** 100% (25% 50% 75% 100%)
  - **priceIncrease** 150
  - **pathToIcon** 
  - **activationRoute**

- [ ] Pop-Up-Inator3000
  - **Name** Pop-Up-Inator3000
  - **duration** 0s
  - **maxLevel** 1
  - **startEfficency** (Nervt den Spieler mit Layout Shifts / redirects / Pop ups falls möglich)
  - **startPrice** 500
  - **efficencyIncrease** 
  - **priceIncrease**
  - **pathToIcon** 
  - **activationRoute**

- Für erste Version: Alert Windows
- Generiere Alert Windows on Virus-Click
- Könnte auch über eine Dauer at random intervals pop ups erstellen / layoutshit etc...

## Speziell?

- [ ] Glücksspiel Virus
  - **Name** Glücksspiel Virus
  - **duration** 0
  - **maxLevel** 1
  - **startEfficency** 0 
  - **startPrice** 200
  - **efficencyIncrease**
  - **priceIncrease**
  - **pathToIcon** 
  - **activationRoute**

- Erklärung: Setze eine beliebige Anzahl an Viren (vllt. gegen anderen Spieler?), 50 / 50 Chance den Einsatz zu verdoppeln oder alles zu verlieren

- 1. Version als Standard-Funktion ohne andere Spieler

- [ ] Kommunismus Virus
  - **Name** Kommunismus Virus
  - **duration** 0s
  - **maxLevel** 1
  - **startEfficency** 100
  - **startPrice** 750
  - **efficencyIncrease**
  - **priceIncrease**
  - **pathToIcon** 
  - **activationRoute**

- Erklärung: Nehme die Viren aller Spieler und verteile sie Gleichmässig auf alle Spieler. 

- Vllt. Während x Sekunden werden die Punkte aller Spieler gesammelt und dann am ende gleichmässig verteilt


Neuer Tbl: 

FK auf Effects

Probability, effect levels bzw. name und effect lvl.

z.b. critical-hit hat 5 zeilen weil 5 level, async hat 4 zeieln, weil 4 level 

Luca schlägt aber vor, dass wir nicht alle Effekte von anfang an für den User freigeben. Z.b. muss man erst Auto-Click lvl 3 haben, damit man den nächsten Effekt freischalten kann. 
