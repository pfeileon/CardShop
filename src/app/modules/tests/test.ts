export function testFetchAllCards(fResource) {
    fResource.getAllCards()
        .then(cards => {
            console.log(JSON.stringify(cards));
        });
}

export function testSqlApi(fService) {
    let init = {
        headers: {
            "sa": "123user!"
        },
        method: "GET"
    }
    fService.query("http://localhost:56538/api/CardShopAPI", init)
        .then(cards => {
            console.log(cards);
        });
}