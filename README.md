# Kunskapskontroll3-grupp-8 - Memory
- _Mandus Lindström har haft huvudansvaret för constructor_<br>
- _Nina Jivetorp har haft huvudansvaret för API-anrop_ <br>
- _Samuel Meijer har haft huvudansvaret för spellogik_ <br>


### Beskrivning av webbappen
**_Appen är ett memoryspel där två spelare tävlar mot varandra_** <br>
1. Användarna ges möjligheten att skriva in sina namn högst upp till vänster respektive höger<br>
    - Om inga namn anges döps spelarna automatiskt till 'Player One' respektive 'Player Two'<br>
2. Spelet startar när användarna trycker på "Press here to play!" högst upp i mitten.<br>
    - Användarna ombeds ange antalet kort som de önskar spela med.
      - Antalet kort måste vara ett jämnt tal mellan 8 och 40.
    - Användarna ombeds ange vilket tema bilderna ska ha.
3. Korten visas på spelbrädet, med bilden vänd nedåt.
4. Första gången spelet startas slumpas vilken användare som börjar.
    - Spelaren vars tur det är har sitt namn upplyst.
5. När användaren klickar på ett kort vänds kortet och bilden visas.
    - När användaren har klickat på två kort jämförs bilderna på korten.
      - Om bilderna är samma får användaren ett poäng och får välja två nya kort att jämföra.
      - Om bilderna inte är samma går turen över till den andra användaren.
6. När en användare får tillräckligt med poäng för vinst blir korten låsta och en text som presenterar vinnaren visas över spelbrädet.
    - Texten som visar totala vinster för användaren uppdateras.
7. Om det blir lika blir korten låsta och en text som presenterar resultatet visas över spelbrädet.
8. För att starta ett nytt spel kan användarna trycka på "Play again!".
    - Användarna ombed återigen ange antalet kort och tema på bilderna.
        - Namnen förblir desamma
    - Om en vinnare fanns får den börja nästa speltur.
