describe('Home Page', () => {
  beforeEach(() => {
    cy.fixture('articles').as('articlesData');
    cy.intercept('GET', '**/mostpopular/v2/mostviewed/all-sections/*', {
      statusCode: 200,
      body: {
        results: [
          { id: 1, title: 'Article 1', abstract: 'Summary of article 1' },
          { id: 2, title: 'Article 2', abstract: 'Summary of article 2' },
        ],
      },
    }).as('fetchArticles');

    cy.visit('/');
  });

  it('should display the header', () => {
    cy.contains('NY Times Most Popular Articles').should('be.visible');
  });

  it('should display a list of articles', () => {
    cy.wait('@fetchArticles');

    cy.get('[data-testid="article-list"]').within(() => {
      cy.contains('Article 1').should('be.visible');
      cy.contains('Article 2').should('be.visible');
    });
  });

  it('should allow filtering articles by days', () => {
    cy.get('select').select('7');
    cy.wait('@fetchArticles').its('request.url').should('include', '7');

    cy.get('[data-testid="article-list"]').within(() => {
      cy.contains('Article 1').should('be.visible');
      cy.contains('Article 2').should('be.visible');
    });
  });

  it('should display a loading state while fetching articles', () => {
    cy.intercept('GET', '**/mostpopular/v2/mostviewed/all-sections/*', (req) => {
      req.reply((res) => {
        res.delay = 2000;
        res.send({
          statusCode: 200,
          body: {
            results: [
              { id: 1, title: 'Article 1', abstract: 'Summary of article 1' },
              { id: 2, title: 'Article 2', abstract: 'Summary of article 2' },
            ],
          },
        });
      });
    }).as('slowFetchArticles');

    cy.reload();
    cy.contains('Loading articles...').should('be.visible');
  });

  it('should handle API errors', () => {
    cy.intercept('GET', '**/mostpopular/v2/mostviewed/all-sections/*', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('fetchArticlesError');

    cy.reload()
    cy.contains(/Failed to load articles/).should('be.visible');

    cy.get('button').contains('Refetch').click();
    cy.wait('@fetchArticlesError');
    cy.contains('Failed to load articles.').should('be.visible');
  });

  it('should show article details when an article is clicked', function () {
    cy.intercept('GET', '**/mostpopular/v2/mostviewed/all-sections/*', {
      statusCode: 200,
      body: {
        results: this.articlesData,
      },
    }).as('fetchArticlesData');

    cy.get('[data-testid="article-list"]')
      .contains(this.articlesData[0].title)
      .click();

    cy.get('[data-testid="article-detail-modal"]').within(() => {
      cy.contains(this.articlesData[0].title).should('be.visible');
      cy.contains(this.articlesData[0].byline).should('be.visible');
    });

    cy.get('[data-testid="article-detail-modal-close"]').click();
    cy.get('[data-testid="article-detail-modal"]').should('not.exist');
  });
});
