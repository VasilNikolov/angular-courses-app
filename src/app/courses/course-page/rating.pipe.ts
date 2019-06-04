import { Pipe, PipeTransform} from '@angular/core';
import {Rating} from '../../core/courses/course.interface';

@Pipe({
  name: 'rating',
  pure: false
})
export class RatingPipe implements PipeTransform {
  transform(value: Rating[]): number {
    return value.reduce((a, b) => a + b.rating, 0) / value.length || 0;
  }
}
