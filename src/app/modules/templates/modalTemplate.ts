"use strict";

const modalTemplate = (id?: string, label: string = id + "Label", header?: string, body?: string, footer?: string) => {
  return `<div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="${label}">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          ${header}
        </div>
        <div class="modal-body">
          ${body}
        </div>
        <div class="modal-footer">
          ${footer}
        </div>
      </div>
    </div>
  </div>`
}

export const cardModal = (card: any, i: number) => {
  return modalTemplate("cardModal" + i, card.name, cardModalHeader(card), cardModalBody(card), cardModalFooter(card));
}

const cardModalHeader = (card: any) => {
  return `<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  <h4 class="modal-title" id="${card.name}">${card.name}</h4>`
}

const cardModalBody = (card: any) => {
  return `<div class="col-sm-7">
            <img src="${card.img}" alt="${card.name}" />
          </div>
          <div class="col-sm-5">
            <div class="flavor well">
              ${card.flavor}
            </div>
            <div class="artist well">
              Artist: ${card.artist}
            </div>
          </div>
          <div class="clearfix"></div>`
}

const cardModalFooter = (card: any) => {
  return `<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>`
}

export const checkoutModal = (customer: any) => {
  return modalTemplate("checkoutModal", undefined, checkoutModalHeader("checkoutModalLabel"), checkoutModalBody(customer), checkoutModalFooter())
};

const checkoutModalHeader = (id: string) => {
  return `<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="${id}">Please confirm before buying:</h4>`;
}

const checkoutModalBody = (customer: any) => {
  return `<table>
              <tr>
                  <td>Name:</td><td>${customer.fName + " " + customer.lName}</td>
              </tr>
              <tr>
                  <td>Address:</td><td>${customer.address + ", " + customer.zipCode + " " + customer.city + ", " + customer.country}</td>
              </tr>
              <tr>
                  <td>Credit card:</td><td>${customer.creditCard.owner + ", " + customer.creditCard.cardNumber + ", " + customer.creditCard.validThru}</td>
              </tr>
          </table>`;
}

const checkoutModalFooter = () => {
  return `<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button id="buyBtn" type="button" class="btn btn-primary">Buy!</button>`;
}