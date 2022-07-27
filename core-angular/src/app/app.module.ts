import {NgModule} from "@angular/core"
import {BrowserModule} from "@angular/platform-browser"
import { AppComponent } from "./app.component"
import { CardComponent } from "./card.component"


@NgModule({
    // mention the imports from angular core
    imports:[BrowserModule],
    // declare every component that is created
    declarations:[AppComponent,CardComponent],
    // bootstrap is the entry point file of the project
    bootstrap:[AppComponent]
})
export class AppModule {}

