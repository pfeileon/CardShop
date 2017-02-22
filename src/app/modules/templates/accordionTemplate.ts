"use strict";

export const accordionTemplate = (content: any) => {
    return `<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    ${accordionPanel("PD", "personalData", "Personal Data", "in", content)}
    ${accordionPanel("CCD", "creditCardData", "Credit Card Data", "", content)}
    
</div>`;
}

const accordionPanel = (abbr: string, id: string, heading: string, shown: string, content = (id: string) => {}) =>  {
    return `<div class="panel panel-default">

      <div class="panel-heading" role="tab" id="title${abbr}">
        <h4 class="panel-title">
          <a id="${id}Heading" role="button" data-toggle="collapse" data-target="collapse${id}" data-parent="accordion">${heading}</a>
        </h4>
      </div>

        <div id="collapse${abbr}" class="panel-collapse collapse ${shown}" role="tabpanel" aria-labelledby="title${abbr}">
            <div class="panel-body">
                ${content(id)}
            </div>
        </div>

    </div>

`;}