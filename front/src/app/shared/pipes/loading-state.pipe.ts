import { Pipe, PipeTransform } from '@angular/core';
import {LoadStateType} from "../../utils/load-state.types";

@Pipe({
  name: 'is$'
})
export class LoadingStatePipe implements PipeTransform {

  transform(value: {type: LoadStateType} | null, type: LoadStateType | 'success' | 'loading' | 'error'): boolean {
    if (!value) return false;
    switch (type) {
      case LoadStateType.LOADING:
      case 'loading':
        return value.type === LoadStateType.LOADING;
      case LoadStateType.SUCCESS:
      case 'success':
        return value.type === LoadStateType.SUCCESS;
      case LoadStateType.ERROR:
      case 'error':
        return value.type === LoadStateType.ERROR;
      default:
        throw Error('Type for LoadingStatePipe should be provided!');
    }
  }


}
