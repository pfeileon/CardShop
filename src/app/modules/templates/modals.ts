"use strict";

export const checkoutModal = (customer: any) => {
    return `<div class="modal fade" id="checkoutModal" tabindex="-1" role="dialog" aria-labelledby="checkoutModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="checkoutModalLabel">Please confirm before buying:</h4>
        </div>
        <div class="modal-body">
          <table>
              <tr>
                  <td>Name:</td><td>${customer.fName + " " + customer.lName}</td>
              </tr>
              <tr>
                  <td>Address:</td><td>${customer.address + ", " + customer.zipCode + " " + customer.city + ", " + customer.country}</td>
              </tr>
              <tr>
                  <td>Credit card:</td><td>${customer.creditCard.owner + ", " + customer.creditCard.cardNumber + ", " + customer.creditCard.validThru}</td>
              </tr>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button id="buyBtn" type="button" class="btn btn-primary">Buy!</button>
        </div>
      </div>
    </div>
  </div>`
};

export const cardModal = (card: any, i: number) => {
    return `<div class="modal fade" id="cardModal${i}" tabindex="-1" role="dialog" aria-labelledby="${card.name}">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="${card.name}">${card.name}</h4>
        </div>
        <div class="modal-body">
          <div class="col-sm-7">
              <img src="${card.img}" alt="${card.name}" />
          </div>
          <div class="col-sm-5">
          <div class="flavor well">
              <span>${card.flavor}</span>
              </div>
          </div>
          <div class="clearfix"></div>
        
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`;
}