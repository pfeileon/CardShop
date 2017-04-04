export function testFetchAllCards(fResource) {
    fResource.getAllCards()
        .then(cards => {
            console.log(JSON.stringify(cards));
        });
}

export function testSqlApi(fService) {
    const request = {
        url: "http://localhost:56538/api/CardShopAPI",
        headers: {
            "data source": "localhost",
            "user": "sa",
            "password": "123user!"
        },
        method: "GET"
    }
    fService.query(undefined, undefined, request)
        .then(cards => {
            console.log(cards);
        });
}