describe("template spec", () => {
  it("positionOnlyTheFirstBoat", () => {
    cy.visit("http://localhost:4200/");
    cy.get(".boatImg").first().click();
    cy.get(".cell").first().click();
    cy.get(".cell").first().should("have.class", "occupied");
  });
  it("positionAllBoats", () => {
    cy.visit("http://localhost:4200/");
    cy.get(".boatImg").first().click();
    cy.get(".cell").first().click();
    cy.wait(1000);

    cy.get(".boatImg").eq(1).click();
    cy.get(".cell").eq(34).click();
    cy.wait(1000);

    cy.get(".boatImg").eq(2).click();
    cy.get(".cell").eq(7).click();
    cy.wait(1000);

    cy.get(".boatImg").eq(3).click();
    cy.get(".cell").eq(52).click();
    cy.wait(1000);

    cy.get(".cell").first().should("have.class", "occupied");
    cy.get(".cell").eq(34).should("have.class", "occupied");
    cy.get(".cell").eq(7).should("have.class", "occupied");
    cy.get(".cell").eq(52).should("have.class", "occupied");

    // position the last boat, tha launch the game
    cy.get(".boatImg").eq(4).click();
    cy.get(".cell").eq(83).click();

    // wait for the "let's go" message
    cy.wait(5000);

    cy.get(".playerBoards").should("exist");
    cy.get(".opponentBoard").should("exist");
    cy.get(".myBoard").should("exist");
  });
});
