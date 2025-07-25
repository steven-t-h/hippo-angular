import { Routes } from '@angular/router';
import {CmsPageComponent} from './components/cms/page/cms-page.component';
import {cmsPageResolver} from './resolvers/cms-page-resolver';



export const routes: Routes = [{
  path: "**",
  component: CmsPageComponent,
  // resolve: {
  //   content: cmsPageResolver
  // }
}];
