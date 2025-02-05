import { Injectable, signal } from '@angular/core';
import { PairNumbers } from '../model/PairNumbers.type';

@Injectable({
 providedIn: 'root'
})
export class PairNumbersService {
 // Updated interface to include description
 readonly pairs = signal<PairNumbers[]>([]);

 // Updated method to accept description
 savePair(pair: PairNumbers): boolean {
   // Check if a pair with the same x and y coordinates already exists
   const exists = this.pairs().some(p => p.x === pair.x && p.y === pair.y);

   if (!exists) {
     // Add the new pair to the existing pairs
     this.pairs.update(current => [...current, pair]);
     return true;
   }
   return false;
 }
}
