'use strict';

export class Renderer {

    static render(string: string): string {
        if (string === 'Ahoi')
            return 'Ein Pirat sagt: ' + string;
        else
            return 'Du sagst: ' + string;
    }
}