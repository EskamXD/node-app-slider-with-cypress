describe("Testy Galerii Slajdów", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        // Czekamy, aż Swiper się zainicjalizuje
        cy.wait(1000);
    });

    it("Użytkownik może przewijać slajdy za pomocą przycisków nawigacji", () => {
        // Zapamiętujemy tekst aktualnie aktywnego slajdu
        cy.get(".swiper-slide-active")
            .invoke("text")
            .then((initialText) => {
                const initial = initialText.trim();

                // Klikamy przycisk "następny" i czekamy na zmianę
                cy.get(".swiper-button-next").click();
                cy.wait(1000);
                cy.get(".swiper-slide-active")
                    .invoke("text")
                    .then((newText) => {
                        expect(newText.trim()).to.not.eq(initial);
                    });

                // Klikamy przycisk "poprzedni" i czekamy na powrót do poprzedniego slajdu
                cy.get(".swiper-button-prev").click();
                cy.wait(1000);
                cy.get(".swiper-slide-active")
                    .invoke("text")
                    .then((returnedText) => {
                        expect(returnedText.trim()).to.eq(initial);
                    });
            });
    });
    

    it("Zweryfikuj, czy opis każdego slajdu jest wyświetlany poprawnie", () => {
        // Sprawdzamy pierwszy slajd – jego tekst nie powinien być pusty
        cy.get(".swiper-slide-active")
            .should("be.visible")
            .invoke("text")
            .then((text) => {
                expect(text.trim()).to.not.be.empty;
            });

        // Przechodzimy do drugiego slajdu i weryfikujemy, że zawiera "United Kingdom"
        cy.get(".swiper-button-next").click();
        cy.wait(1000);
        cy.get(".swiper-slide-active")
            .invoke("text")
            .then((text) => {
                expect(text.trim()).to.contain("United Kingdom");
            });

        // Przechodzimy do trzeciego slajdu i weryfikujemy, że zawiera "Paris"
        cy.get(".swiper-button-next").click();
        cy.wait(1000);
        cy.get(".swiper-slide-active")
            .invoke("text")
            .then((text) => {
                expect(text.trim()).to.contain("Paris");
            });
    });

    it("Zweryfikuj, czy galeria zachowuje się poprawnie na różnych urządzeniach", () => {
        const devices = [
            { name: "Desktop", width: 1440, height: 900 },
            { name: "Tablet", width: 768, height: 1024 },
            { name: "Mobile", width: 375, height: 667 },
        ];

        devices.forEach((device) => {
            cy.viewport(device.width, device.height);
            cy.visit("http://localhost:3000");
            cy.wait(1000);

            // Sprawdź, czy główny kontener galerii (klasa .swiper) jest widoczny
            cy.get(".swiper").should("be.visible");

            // Sprawdź, czy przyciski nawigacji są widoczne i klikalne
            cy.get(".swiper-button-next").should("be.visible").click();
            cy.wait(500);
            cy.get(".swiper-button-prev").should("be.visible").click();
        });
    });

    it("Sprawdzenie, czy galeria jest poprawnie wyświetlana", () => {
        // Sprawdź, czy główny kontener galerii jest widoczny
        cy.get(".swiper").should("be.visible");

        // Sprawdź, czy przynajmniej trzy slajdy w galerii są widoczne
        cy.get(".swiper-slide").should("have.length.at.least", 3);

        // Sprawdź, czy przyciski nawigacji (następny, poprzedni) są obecne i klikalne
        cy.get(".swiper-button-next")
            .should("be.visible")
            .and("not.be.disabled");
        cy.get(".swiper-button-prev")
            .should("be.visible")
            .and("not.be.disabled");
    });
});

