describe("ChecK Puclic Api", () => {
    beforeEach(() => {
      const path = `${Cypress.env(
        "environment"
      )}/CheckPublicApi.json`;
  
      cy.fixture(path).as("testData")
        .then(data => {
        
        });

        //cy.visit('http://localhost:10436/swagger/index.html')
        cy.visit(Cypress.config().baseUrl);
        cy._waitForLoading();
    });
  
    afterEach(() => {

    })
  
    it("Check Registration type", function () {
      
        //點開所有Controller
        cy.get('button.expand-operation').each((expandButton)=>{
            cy.wrap(expandButton).click();
        })

        //找到Public Api 並點開
        cy.get('div.opblock-summary-description').each((apiDesp)=>{
            if(apiDesp.text().includes('Public')){
                cy.wrap(apiDesp).prev().click();
            }
        })

        //cy.get('span[data-path="/Credit/GetCreditRatingResult"]').click();

        let currentApiName=""
        let lastApiName=""
        let finalText="可能受影響API清單如下：\n"

        cy.get('span.hljs-attr').each((item)=>{
            if( item.text().includes(this.testData.propertyName)){
                //currentApiName=item.parents(':eq(13)').prev().children(':eq(1)').text()
                currentApiName=item.closest('div.no-margin').prev().children(':eq(1)').text()
                
                if(currentApiName!=lastApiName){
                    //cy.log(currentApiName)
                    finalText=finalText+currentApiName+'\n'
                    lastApiName=currentApiName
                }
                //cy.log(item.parents(':eq(13)').prev().children(':eq(1)').text())
                //cy.log('找到')
            }
        })
        .then(() => {
        
            cy.writeFile(this.testData.outputFilePath,finalText)
            cy.log(finalText)
        })

        

    });

  });