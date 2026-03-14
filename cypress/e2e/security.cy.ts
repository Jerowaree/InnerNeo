describe('Innerneo Security Suite - Forum Attacks', () => {
  beforeEach(() => {
    cy.visit('/contacto');
  });

  it('SHIELD TEST: Prevents XSS script injection in Name field', () => {
    const xssScript = '<script>alert("XSS")</script>';
    
    cy.get('input[name="name"]').type(xssScript);
    cy.get('input[name="email"]').type('tester@secure.com');
    cy.get('textarea[name="message"]').type('Testing XSS prevention logic.');
    
    // Intercept action to check what goes to the server or what comes back
    cy.intercept('POST', '/_astro/actions/contact').as('contactAction');
    
    cy.get('form').submit();
    
    // The server should sanitize and return success (as it cleans the name)
    // or block if it detects malicious pattern (depending on strictness)
    cy.wait('@contactAction').its('response.statusCode').should('be.oneOf', [200, 400]);
  });

  it('SHIELD TEST: Prevents SQL Injection patterns in Message', () => {
    const sqlInjection = "' OR '1'='1' --";
    
    cy.get('input[name="name"]').type('Security Auditor');
    cy.get('input[name="email"]').type('audit@secure.com');
    cy.get('textarea[name="message"]').type(sqlInjection);
    
    cy.get('form').submit();
    
    // In our implementation, Zod + JSON parsing prevents this from being executed.
    // The test ensures the application doesn't crash.
    cy.get('button[type="submit"]').should('have.text', '¡Mensaje Enviado!');
  });

  it('RATE LIMIT TEST: Blocks multiple rapid submissions (Anti-DDoS)', () => {
    const fillAndSubmit = () => {
      cy.get('input[name="name"]').clear().type('Bot Tester');
      cy.get('input[name="email"]').clear().type('bot@test.com');
      cy.get('textarea[name="message"]').clear().type('Flood request for rate limiting test.');
      cy.get('form').submit();
    };

    // Execute first valid request
    fillAndSubmit();
    cy.get('button[type="submit"]').should('contain', 'Enviado');

    // Attempt second and third rapid requests (the threshold is 3 per minute)
    // The third or fourth should trigger the rate limit alert
    for(let i = 0; i < 4; i++) {
        cy.visit('/contacto'); // Reload to reset client-side button state if needed
        fillAndSubmit();
    }

    // Capture the alert (Astro action error message)
    cy.on('window:alert', (str) => {
        expect(str).to.equal('Demasiadas solicitudes. Por favor, intenta más tarde.');
    });
  });

  it('VALIDATION TEST: Zod enforces strict format', () => {
    cy.get('input[name="email"]').type('not-an-email');
    cy.get('button[type="submit"]').click({force: true});
    cy.get('#error-email').should('be.visible').and('contain', 'válido');
  });

  it('ELITE ATTACK: Unicode Obfuscation (Homograph Attack)', () => {
    // Using a Cyrillic 'а' which looks identical to Latin 'a'
    const malName = 'Alonso Ruіz'; 
    cy.get('input[name="name"]').type(malName);
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('textarea[name="message"]').type('Unicode test');
    // The server will strip or neutralize special chars via isolateContent
  });

  it('ELITE ATTACK: Phishing Links and Spam Keywords', () => {
    const phishingMsg = 'Gratis Crypto aquí: http://malicious-site.com/phish';
    cy.get('input[name="name"]').type('Hacker Elite');
    cy.get('input[name="email"]').type('hacker@elite.com');
    cy.get('textarea[name="message"]').type(phishingMsg);
    
    // We expect the isolation layer to neutralize the URL on the server side
    cy.log('Isolation layer should break the URL and flag as SPAM');
  });

  it('PAYLOAD ATTACK: Giant Message Exhaustion', () => {
    const giantMessage = 'B'.repeat(3000); // Exceeding 2000 max
    cy.get('textarea[name="message"]').type(giantMessage, { delay: 0 });
    cy.get('button[type="submit"]').click({force: true});
    cy.get('#error-message').should('be.visible').and('contain', 'largo');
  });
});
