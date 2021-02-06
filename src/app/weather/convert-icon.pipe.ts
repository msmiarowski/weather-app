import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertIcon'
})
export class ConvertIconPipe implements PipeTransform {

  thunder = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232, 960, 961]; // icon: yes
  sprinkle = [300, 301, 302, 310, 311, 312, 313, 314, 321, 701]; // icon: yes
  rain = [500, 501, 501, 503, 504, 511]; // icon: yes
  showers = [520, 521, 522, 531]; // icon: yes
  snow = [600, 601, 601, 602]; // icon: yes
  sleet = [611, 612, 906]; // icon: yes
  rainMix = [615, 616, 620, 621, 622]; // icon: yes
  fogHaze = [711, 721, 731, 741, 761, 762]; // icon: yes
  wind = [751, 771, 905, 952, 953, 954, 955, 956, 957, 958, 959]; // icon: yes
  tornado = [781, 900]; // icon: yes
  hurricane = [901, 902, 962]; // icon: yes
  sun = [800, 951]; // icon: yes
  partlyCloudy = [801, 802, 803]; // icon: yes
  cloudy = [804];
  cold = [903]; // icon: yes
  hot = [904]; // icon: yes

  // value = value being piped
  // args = not using, but any extras like when converting a decimal ex: | number:'1.0-0'
  transform(value: any, ...args: any[]): any {
    if(this.thunder.includes(value)) return 'bolt';
    if(this.sprinkle.includes(value) || this.rain.includes(value)) return 'cloud-rain';
    if(this.showers.includes(value) || this.sleet.includes(value) || this.rainMix.includes(value)) return 'cloud-showers-heavy';
    if(this.snow.includes(value)) return 'snowflake';
    if(this.fogHaze.includes(value)) return 'smog';
    if(this.wind.includes(value) || this.tornado.includes(value) || this.hurricane.includes(value)) return 'wind';
    if(this.sun.includes(value)) return 'sun';
    if(this.partlyCloudy.includes(value)) return 'cloud-sun';
    if(this.cloudy.includes(value)) return 'cloud';
    if(this.cold.includes(value)) return 'temperature-low';
    if(this.hot.includes(value)) return 'temperature-high';
  }

}
