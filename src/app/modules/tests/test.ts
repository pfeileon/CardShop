export function testFetchAllCards(fResource) {
    fResource.getAllCards()
        .then(cards => {
            console.log(JSON.stringify(cards));
        });
}