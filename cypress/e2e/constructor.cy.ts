const SELECTOR_BUN = '[data-cy="bun"]'
const SELECTOR_MODAL = '[data-cy="modal"]'
const SELECTOR_MODAL_CLOSE = '[data-cy="modal-close"]'
const SELECTOR_INGREDIENT_NAME = '[data-cy="ingredient-name"]'

describe('Страница «Конструктор»', () => {
  beforeEach(() => {
    cy.visit('/')
    localStorage.setItem('accessToken', 'Bearer <token>')
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user'
    })
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients'
    })
  })

  it('тестирование функционала по оформлению заказа', () => {
    cy.log('перетаскивание ингредиента в конструктор')
    cy.get(SELECTOR_BUN).first().trigger('dragstart')
    cy.get('[data-cy="drop-target"]').trigger('drop')
    cy.get('[data-cy="top"]').should('exist')
    cy.get('[data-cy="bottom"]').should('exist')
    cy.log('создание заказа, открытие модального окна при клике по кнопке «Оформить заказ»')
    cy.intercept('POST', 'api/orders', {
      fixture: 'order'
    }).as('createOrder')
    cy.get('[data-cy="order-button"]').click()
    cy.wait('@createOrder')
    cy.get(SELECTOR_MODAL).should('be.visible')
    cy.log('проверка номера заказа в модальном окне о заказе')
    cy.get('[data-cy="order-number"]').should('not.be.empty')
    cy.log('закрытие модального окна при клике на кнопку закрытия')
    cy.get(SELECTOR_MODAL_CLOSE).click()
    cy.get(SELECTOR_MODAL).should('not.exist')
  })

  it('тестирование модального окна с описанием ингредиента', () => {
    let ingredientName: string
    cy.get(SELECTOR_BUN)
      .first()
      .find(SELECTOR_INGREDIENT_NAME)
      .invoke('text')
      .then((name) => {
        ingredientName = name.trim()
      })
    cy.log('открытие модального окна с описанием ингредиента')
    cy.get(SELECTOR_BUN).first().click()
    cy.wait(2000)
    cy.get(SELECTOR_MODAL).should('be.visible')
    cy.log('отображение в модальном окне данных ингредиента')
    cy.get(SELECTOR_MODAL).within(() => {
      cy.get(SELECTOR_INGREDIENT_NAME).should('contain.text', ingredientName)
    })
    cy.log('закрытие модального окна при клике на кнопку закрытия')
    cy.get(SELECTOR_MODAL_CLOSE).click()
    cy.get(SELECTOR_MODAL).should('not.exist')
  })
})
