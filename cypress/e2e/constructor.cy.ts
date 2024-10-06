describe('Страница «Конструктор»', () => {
  beforeEach(() => {
    cy.visit('/')
    localStorage.setItem('accessToken', 'Bearer <token>')
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
      fixture: 'user'
    })
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients'
    })
  })

  it('тестирование функционала по оформлению заказа', () => {
    cy.log('перетаскивание ингредиента в конструктор')
    cy.get('[data-cy="bun"]').first().trigger('dragstart')
    cy.get('[data-cy="drop-target"]').trigger('drop')
    cy.get('[data-cy="top"]').should('exist')
    cy.get('[data-cy="bottom"]').should('exist')
    cy.log('создание заказа, открытие модального окна при клике по кнопке «Оформить заказ»')
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      fixture: 'order'
    }).as('createOrder')
    cy.get('[data-cy="order-button"]').click()
    cy.wait('@createOrder')
    cy.get('[data-cy="modal"]').should('be.visible')
    cy.log('проверка номера заказа в модальном окне о заказе')
    cy.get('[data-cy="order-number"]').should('not.be.empty')
    cy.log('закрытие модального окна при клике на кнопку закрытия')
    cy.get('[data-cy="modal-close"]').click()
    cy.get('[data-cy="modal"]').should('not.exist')
  })

  it('тестирование модального окна с описанием ингредиента', () => {
    let ingredientName: string
    cy.get('[data-cy="bun"]')
      .first()
      .find('[data-cy="ingredient-name"]')
      .invoke('text')
      .then((name) => {
        ingredientName = name.trim()
      })
    cy.log('открытие модального окна с описанием ингредиента')
    cy.get('[data-cy="bun"]').first().click()
    cy.wait(2000)
    cy.get('[data-cy="modal"]').should('be.visible')
    cy.log('отображение в модальном окне данных ингредиента')
    cy.get('[data-cy="modal"]').within(() => {
      cy.get('[data-cy="ingredient-name"]').should('contain.text', ingredientName)
    })
    cy.log('закрытие модального окна при клике на кнопку закрытия')
    cy.get('[data-cy="modal-close"]').click()
    cy.get('[data-cy="modal"]').should('not.exist')
  })
})
