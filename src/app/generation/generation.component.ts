import {Component, OnInit} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import { generate } from "random-words";


@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})
export class GenerationComponent  implements OnInit {

  result: string|any = '';
  myString : any = 'MyString';
  useMyString: boolean = false;
  myStringError: any;
  textIsCopy:boolean = false;
  textCopy:string = 'Скопійовано до буферу';

  constructor(private clipboard: Clipboard) {

  }

  ngOnInit() {
    //this.myString = this.generateMemorablePasswordFromString(5);
    this.myString = generate({ minLength: 5, maxLength: 5 });
    this.result = this.generateMemorablePassword(5);
  }



  generation(number: number) {
    this.validInput()

    if (this.useMyString && !this.myStringError){
      this.result = this.generateMemorablePasswordFromString((this.myString));
    }else{
      this.result = this.generateMemorablePassword(number);
    }


  }

  transliterate(text:string) {
    const cyrillicToLatinMap:any = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'є': 'ye', 'ж': 'zh', 'з': 'z', 'и': 'i',
      'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
      'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
      'ь': "'", 'ю': 'yu', 'я': 'ya', 'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Є': 'Ye',
      'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'І': 'I', 'Ї': 'Yi', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
      'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch',
      'Ш': 'Sh', 'Щ': 'Shch', 'Ь': "'", 'Ю': 'Yu', 'Я': 'Ya'
    };

    return text.split('').map(char => cyrillicToLatinMap[char] || char).join('');
  }

  validInput(){
    if (!this.useMyString){
      return;
    }

    this.myStringError = !!(this.myString && this.myString.length < 5);
  }

  /**
   *
   * @param length
   */
  generateMemorablePassword(length: number): string {

    const dictionary = generate(100)

    let specialChars = '!@#$%^&*';
    specialChars += "abcdefghijklmnopqrstuvwxyz";
    specialChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    specialChars += "0123456789";
    specialChars += "!@#$%^&*()_+~`|}{[?";

    let password = '';

    for (let i = 0; i < length; i++) {
      if (i % 3 === 0) {
        const randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];
        password += randomWord;
      } else {
        const randomChar = specialChars[Math.floor(Math.random() * specialChars.length)];
        password += randomChar;
      }
    }

    return password;
  }


  generateMemorablePasswordFromString(input:any) {


    if (!isNaN(input)) {
      input = input.toString();
    }

    input = this.transliterate(input);


     let specialChars = '!@#$%^&*';
      specialChars += "abcdefghijklmnopqrstuvwxyz";
      specialChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      specialChars += "0123456789";
      specialChars += "!@#$%^&*()_+~`|}{[?";

    if (typeof input === 'string' && input.length > 0) {
      input = input.replaceAll(' ','');
      const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];

      input += randomSpecialChar;
      const shuffledInput = input.split('').sort(() => 0.1 - Math.random()).join('');

      return shuffledInput.slice(0, 8);
    } else {
      return false;
    }
  }


  copyToClipboard():void {

    this.clipboard.copy(this.result);

    this.textIsCopy = true;
    setTimeout(()=>{
      this.textIsCopy = false;
    },3000);
  }
}
