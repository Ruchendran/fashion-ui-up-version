import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of } from 'rxjs'; // Import 'of' to return an Observable (best practice)
import { SharedataService } from './sharedata.service';

export interface SeoData {
    title: string;
    description: string;
    image: string;
}

export const seoResolver: ResolveFn<any> = (route, state) => {
const staticData = route.data;
    const sharedService=inject(SharedataService);
    sharedService.loader.set(false);
    // 2. Fallback check for critical SEO data.
    if (staticData['title'] && staticData['description']) {
        // Return the static data as an Observable (best practice for resolvers)
        return of({
            title: staticData['title'],
            description: staticData['description'],
            image: staticData['image'] || 'https://fashion-ui.netlify.app/assets/default-img.jpg' // Use a default image
        } as SeoData);
    }

    // 3. Return a default or null if no data is present (e.g., for Login/Register)
    return of(null)
}
