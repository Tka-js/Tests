import { selectors } from '../support/selectors';
import { lkq_url, seznam_url } from '../support/constants';

describe('My tests', () => {
    it('Vyhledej text na seznamu', () => {
        cy.visit(seznam_url)
        cy.vyhledejText('RegioJet')
        cy.get('[type="submit"]').filter(':visible').click();
    })

    it('LKQ díly', () => {
        cy.visit(lkq_url);
        cy.get(selectors.autobtn).click()
        cy.get(selectors.autoikona).click()
        cy.get(selectors.ctlogcar).find('[data-ng-href*="skoda"]').click()
        cy.get(selectors.ctlogmodel).find('[data-ng-bind="modelItem.Text"]').contains('FABIA').click()
        cy.get(selectors.ctlogmotor).find('.table-cell.BuyButton').contains('RS').click()
        cy.get(selectors.ctlogcategory).find('.productTitle.ng-binding').contains('Přeplňování').click()
        cy.get(selectors.ctlogsimple).find('[data-ng-show]').contains('Turbodmychadla').click()
        cy.contains(selectors.turboname).parents('.table-row.ng-scope').find('input').type('2')
        cy.contains(selectors.turboname).parents('.table-row.ng-scope').find('[data-original-title="Vložit"]').click()
        cy.get(selectors.unkown).should('be.visible').and('contain.text', 'Do košíku byl přidán produkt: TD S2037T')
        cy.get(selectors.kosik).click()
        cy.get(selectors.titulek).trigger('mouseover').should('contain.text', 'Turbodmychadlo STARLINE').parent().find('[data-ng-bind="cartItem.Code"]').should('have.text', 'TD S2037T');
        cy.get(selectors.produktkolona).find('input[data-ng-disabled]').should('have.value', '2');
    })

    it('Bazoš Seat Leon', () => {   
        //TODO: upravit selektory
        cy.visit('www.bazos.cz')
        cy.get('img[alt="Auto"]').click()
        cy.get('#hledat').type('seat leon 1.9 tdi')
        cy.get('[name="cenaod"]').type('30000')
        cy.get('[value="Hledat"]').click()
        cy.get('h2.nadpis').eq(3).click()
        cy.contains('leon').invoke('text').then((text) => {
            expect(text.toLowerCase()).to.contain('leon');
        });
        cy.get('.popisdetail').invoke('text').then((text) => {
            expect(text.toLowerCase()).to.contain('leon');
        });
        for (let i = 0; i < 5; i++) {
            cy.get('.flickity-button.flickity-prev-next-button.next').click()
        }
    })
})
