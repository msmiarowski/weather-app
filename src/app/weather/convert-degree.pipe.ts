import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDegree'
})
export class ConvertDegreePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    /*
      take the num on a 360 degree wheel
      0 = North, 90 = East, 180 = South, 270 = West for an idea

      - you divide the number by 22.5 because there are 16 quadrants/directions in a circle/compass
      - adding the .5 is for when you truncate the value to break the tie
      - floor the value (round down)

      - return the index of the array modulo (remainder) of 16
    */
    let degree: number = Math.trunc((value / 22.5));

    const direction: string[] = ['N','NNE','NE','ENE','E','ESE', 'SE', 'SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];

    return direction[(degree % 16)];
  }

}
