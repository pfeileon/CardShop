import { Renderer } from './Renderer';
import { FetcherService } from './FetcherService';
import { FetcherResource } from './FetcherResource';
import { config } from '../config/config';
import { CardPack } from './CardPack';
import { ShoppingCart } from './ShoppingCart';

'use strict';

export class Shop {

    private item: {};
    private message: string;
    private allSets: any;

    constructor(private greet: string) {

        this.init(greet);

    }

    private init(greet: string): void {
        this.message = greet;

        FetcherService.query(config.url).then(data => {
            this.allSets = data;

            console.log(this.allSets);
        })
    }

    public startUp(): string {
        return Renderer.render(this.message);
    }
}