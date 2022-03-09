import signupPage from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'


describe('Signup', () => {

    // beforeEach(function () {
    //     cy.fixture('deliver').then((d) => {// d pode ser trocado por qualquer nome, é utilizado apenas para receber os valores da masssa de teste
    //         this.deliver = d
    //     })
    // })

    
    it('User should be deliver', function () {

        var deliver = signupFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)

        // var pcode = {
        //     naan: 2 + (Math.floor(Math.random() * 100000000)) GERA NUMERO ALEATÓRIO
        // }
    })


    it('Incorrect document', function () {

        var deliver = signupFactory.deliver()

        deliver.cpf = '000000141aa'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        signupPage.alertMessageShouldBe('Oops! CPF inválido')
    })


    it('Incorrect email', function () {

        var deliver = signupFactory.deliver()

        deliver.email = 'gabriel.com.br'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
    })


    context('Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShouldBe(msg.output)
            })
        })

    })

})