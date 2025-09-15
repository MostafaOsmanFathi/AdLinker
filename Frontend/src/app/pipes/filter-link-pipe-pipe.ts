import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterLinkPipe'
})
export class FilterLinkPipePipe implements PipeTransform {

  transform(links: any[], searchTerm: string): any[] {
    if (!links || !searchTerm) return links;

    const lowerSearch = searchTerm.toLowerCase();
    return links.filter(link =>
      link.original_link.toLowerCase().includes(lowerSearch) ||
      link.shorten_link.toLowerCase().includes(lowerSearch)
    );
  }

}
